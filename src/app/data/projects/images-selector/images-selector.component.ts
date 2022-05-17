import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft, faCheck, faCirclePlus, faImage, faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Images } from 'src/app/models/project-image';
import { zoomInAnimation } from 'src/app/models/animations';

@Component({
  selector: 'app-images-selector',
  templateUrl: './images-selector.component.html',
  styleUrls: ['./images-selector.component.scss'],
  animations:[
    zoomInAnimation
  ]
})
export class ImagesSelectorComponent implements OnInit {

  faFloppyDisk = faCheck
  faXmark = faXmark
  faArrowLeft = faArrowLeft
  faPlus = faPlus
  faImage = faImage
  faCirclePlus = faCirclePlus
  faTrash = faTrash


  @Input() alreadySelected:Images[] =[]
  @Output() goBack = new EventEmitter<boolean>()
  @Output() sendSelected = new EventEmitter<Images[]>()

  isAddingImage = false


  images:Images[] = []



  constructor() { }

  ngOnInit(): void {
    this.images = this.alreadySelected
  }

  onAddImage(image:Images){
    this.images.push(image)
    this.isAddingImage = false
  }

  onRemoveImage(index:number){
    console.log(index)
    this.images.splice(index,1)
  }

  onCancel(){
    this.goBack.emit(true)
  }

  onSaveSelection():void{
    this.sendSelected.emit(this.images)
    this.goBack.emit(true)
  }

}
