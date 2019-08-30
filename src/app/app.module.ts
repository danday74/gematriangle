import { BrowserModule } from '@angular/platform-browser'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BaseModule } from './base/base.module'
import { DestroyerComponent } from './utils/destroyer.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { dataInitialiser } from './initialisers/data-initialiser'

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
      timeOut: 3000,
      extendedTimeOut: 3000,
      enableHtml: true,
      progressAnimation: 'increasing'
    }),
    BaseModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: dataInitialiser,
      deps: [],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
