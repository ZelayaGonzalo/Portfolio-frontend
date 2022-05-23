import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faRotateRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Images } from 'src/app/models/project-image';
import { inOutAnimation } from 'src/app/models/animations';
import { ThemeService } from 'src/app/service/theme.service';
@Component({
  selector: 'app-image-prompt',
  templateUrl: './image-prompt.component.html',
  styleUrls: ['./image-prompt.component.scss'],
  animations:[
    inOutAnimation,
  ]
  
})
export class ImagePromptComponent implements OnInit {

  faCheck = faCheck
  faXMark = faXmark
  faRotateRight = faRotateRight

  @Input() isBanner:boolean = false

  @Output() selectedImage = new EventEmitter<Images>()
  @Output() closeWindow = new EventEmitter<boolean>()

  url:string = ''
  format:string = 'mobile'

  previewImage:string = ''
  currentTheme:string ='night'

  constructor(
    private theme:ThemeService
  ) { }

  ngOnInit(): void {
    if(this.isBanner){
      this.format = 'banner'
    }
    this.theme.getTheme().subscribe(
      theme=>{this.currentTheme=theme}
    )
  }

  onPreview(){
    this.previewImage = this.url
  }

  onCancel(){
    this.closeWindow.emit(true)
  }

  onSave(){
      let image = new Images(this.url,this.format)
      this.selectedImage.emit(image)
  }

}
