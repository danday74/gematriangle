import { Injectable } from '@angular/core'
import { appDefaults } from '../../app-defaults'

@Injectable({providedIn: 'root'})
export class AppConfigService {
  public defaults: any

  constructor() {
    this.defaults = appDefaults
  }
}
