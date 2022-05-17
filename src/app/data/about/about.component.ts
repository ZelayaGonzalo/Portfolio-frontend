import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { faPen,faFloppyDisk, faImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Data } from 'src/app/models/data';
import { DataService } from 'src/app/service/data.service';
import { TokenService } from 'src/app/service/token.service';
import { Images } from 'src/app/models/project-image';
import { zoomInAnimation } from 'src/app/models/animations';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations:[
    zoomInAnimation
  ]
})
export class AboutComponent implements OnInit {

  faPen=faPen
  faFloppyDisk=faFloppyDisk
  faImage = faImage
  faXmark = faXmark

  isEditing = false
  isAddingImage = false

  isAdmin = false

  @Input() name:string = 'name'
  @Input() lastName:string = 'lastName'
  @Input() role:string = 'role'
  @Input() description:string = 'description'
  @Input() photo:string =''

  backupName:string =''
  backupLastname:string =''
  backupRole:string =''
  backupDescription:string =''
  backupPhoto:string =''

  @Output() updated = new EventEmitter<boolean>()

  constructor(
   private dataService:DataService,
   private tokenService:TokenService,
   private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin()
    this.backupLastname = this.name
    this.backupLastname = this.lastName
    this.backupRole = this.role
    this.backupPhoto = this.photo
    this.backupDescription = this.description
  }

  onStartEdition():void{
    this.isEditing = true
  }

  addImage():void{
    this.isAddingImage = true
  }
  closeImageWindow(close:boolean){
    if(close){
      this.isAddingImage = false
    }
  }

  receivePhoto(photo:Images):void{
    this.photo = photo.url
    this.isAddingImage = false
  }

  onSave():void{
    this.spinner.show('about-spinner')
    this.dataService.data().subscribe(
      {
        next:data=>{
          let newData = new Data(this.name,this.lastName,this.photo,this.description,this.role,data.banner,[],[])
           this.dataService.editData(newData).subscribe({
             next: data=>{
             this.updated.emit(true)
             this.isEditing=false
             this.spinner.hide('about-spinner')
           },
           error:err=>{console.log('error with data',err)}
         })
      },
      error:err=>{
        console.log('error getting data',err)
      }
    })
  }
  onCancel():void{
    this.name = this.backupName
    this.lastName = this.backupLastname
    this.role = this.backupRole
    this.photo = this.backupPhoto
    this.description = this.backupDescription
    this.isEditing = false
  }

}
