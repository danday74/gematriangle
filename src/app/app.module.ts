import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BaseModule } from './base/base.module'
import { DestroyerComponent } from './utils/destroyer.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'

@NgModule({
  declarations: [
    AppComponent,
    DestroyerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
      tapToDismiss: true,
      extendedTimeOut: 5000,
      enableHtml: true,
      progressAnimation: 'increasing'
    }),
    BaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
