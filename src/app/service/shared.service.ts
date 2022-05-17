import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVarService {

  private isEditable: BehaviorSubject<boolean>;

  constructor() {
    this.isEditable = new BehaviorSubject<boolean>(false);
  }

  getValue(): Observable<boolean> {
    return this.isEditable.asObservable();
  }
  setValue(newValue:boolean): void {
    this.isEditable.next(newValue);
  }
  
}