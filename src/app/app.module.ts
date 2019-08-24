import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BaseModule } from './base/base.module'
import { DestroyerComponent } from '../utils/destroyer.component'

@NgModule({
  declarations: [
    AppComponent,
    DestroyerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
