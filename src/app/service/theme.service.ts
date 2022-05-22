import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme: BehaviorSubject<string>
  constructor(
  ) {
    this.theme = new BehaviorSubject<string>("night")
   }

   setPrimaryColor(color:string):void{
     this.theme.next(color)
   }

   setNightTheme():void{
     this.theme.next("night")
   }

   setLigthTheme():void{
     this.theme.next("light")
   }

   getTheme():Observable<string>{
     return this.theme.asObservable()
   }

}
