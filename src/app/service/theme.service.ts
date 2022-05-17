import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Theme } from '../models/theme';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private primaryColor: BehaviorSubject<string>
  private theme: BehaviorSubject<Theme>

  private darkTheme = new Theme("#1C1B1F","white")
  private lightTheme = new Theme("#white","#333")

  constructor(
    
  ) {
    this.primaryColor = new BehaviorSubject<string>("#EE6C4D")
    this.theme = new BehaviorSubject<Theme>(this.darkTheme)
   }

   setPrimaryColor(color:string):void{
     this.primaryColor.next(color)
   }

   setDarkTheme():void{
     this.theme.next(this.darkTheme)
   }

   setLigthTheme():void{
     this.theme.next(this.lightTheme)
   }

   getPrimaryColor():Observable<string>{
     return this.primaryColor.asObservable()
   }

   getTheme():Observable<Theme>{
     return this.theme.asObservable()
   }



}
