import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedVariableService {

  isEditable = false

  stopEditing():void{
    this.isEditable = false
  }
  makeEditable():void{
    this.isEditable = true
  }
}
