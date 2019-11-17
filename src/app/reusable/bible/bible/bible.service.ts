import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'

@Injectable({providedIn: 'root'})
export class BibleService {

  private endpoints = {
    'bible-api': 'https://bible-api.com/'
  }

  constructor(private http: HttpClient) {}

  getVerse(ref, api = 'bible-api') {
    const endpoint = this.endpoints[api]
    return ref == null ? of(null) : this.http.get(endpoint + encodeURIComponent(ref))
  }
}
