import { Injectable } from '@angular/core'

@Injectable({providedIn: 'root'})
export class ScriptService {
  loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = url
      script.onload = () => resolve()
      script.onerror = () => reject()
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }
}
