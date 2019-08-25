import { Injectable } from '@angular/core'

@Injectable({providedIn: 'root'})
export class StorageService {

  getItem(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
