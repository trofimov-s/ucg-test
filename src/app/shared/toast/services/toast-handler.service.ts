import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Inject,
  Injectable,
  createComponent,
} from '@angular/core';
import { ToastHostComponent } from '../components';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models';

@Injectable()
export class ToastHanlderService {
  private componentRef: ComponentRef<ToastHostComponent>;
  private notificationData$ = new BehaviorSubject<Toast[]>(null);

  private timer: ReturnType<typeof setTimeout>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private injector: EnvironmentInjector,
    private appRef: ApplicationRef
  ) {}

  addToast(data: Toast): void {
    const currentValue = this.notificationData$.getValue();
    this.notificationData$.next(currentValue ? [data, ...currentValue] : [data]);

    if (!this.componentRef) {
      this.initComponentRef();
    }

    this.handleTimer();
  }

  private handleTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => this.destroy(), 5000);
  }

  private destroy(): void {
    this.componentRef.destroy();
    this.notificationData$.next(null);
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef = null;
  }

  private initComponentRef(): void {
    this.componentRef = createComponent(ToastHostComponent, {
      environmentInjector: this.injector,
    });

    this.componentRef.instance['notificationData$'] = this.notificationData$;
    this.document.body.appendChild(this.componentRef.location.nativeElement);
    this.appRef.attachView(this.componentRef.hostView);
  }
}
