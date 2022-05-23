import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme: BehaviorSubject<string>
  constructor(
  ) {
    this.theme = new BehaviorSubject<string>(window.localStorage.getItem('THEME') || 'night')
   }

   setNightTheme():void{
     window.localStorage.setItem('THEME','night')
     this.theme.next("night")
   }

   setLigthTheme():void{
     window.localStorage.setItem('THEME','light')
     this.theme.next("light")
   }

   getTheme():Observable<string>{
    return this.theme.asObservable()
   }

}
