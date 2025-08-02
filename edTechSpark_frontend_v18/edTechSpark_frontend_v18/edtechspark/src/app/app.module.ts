import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { serverInterceptor } from './interceptors/server.interceptor';
import { ExceptionHandler } from './shared/exceptionhandler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withInterceptors([serverInterceptor]))
    ,{provide: ErrorHandler, useClass: ExceptionHandler}
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
