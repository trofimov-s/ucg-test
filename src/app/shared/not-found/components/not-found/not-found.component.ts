import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { APP_ROUTES } from '@core/enums';

@Component({
  selector: 'app-not-found',
  template: `
    <p>Not Found Page</p>
    <app-button type="button" text="Home Page" (click)="navigateToHome()" />
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        height: 80%;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate([APP_ROUTES.INDEX]);
  }
}
