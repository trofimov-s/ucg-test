import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from '@core';
import { ButtonModule } from './shared/button/button.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CoreModule, ButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
