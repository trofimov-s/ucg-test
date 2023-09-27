import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast } from '../../models';

@Component({
  selector: 'app-toast-host',
  templateUrl: './toast-host.component.html',
  styleUrls: ['./toast-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastHostComponent {
  @Input()
  notificationData$: Observable<Toast[]>;
}
