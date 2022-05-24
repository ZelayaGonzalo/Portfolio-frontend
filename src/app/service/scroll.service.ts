import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private currentView : BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() { }

  getCurrentView():Observable<number>{
    return this.currentView.asObservable()
  }
  setCurrentView(newValue:number):void{
    this.currentView.next(newValue)
  }
}
