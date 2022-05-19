import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Data } from 'src/app/models/data';
import { faPen,faFloppyDisk, faImage, faXmark } from '@fortawesome/free-solid-svg-icons';

import { TokenService } from 'src/app/service/token.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { Images } from 'src/app/models/project-image';
import { zoomInAnimation } from 'src/app/models/animations';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations:[
    zoomInAnimation
  ]
})
export class BannerComponent implements OnInit {

  faPen=faPen
  faFloppyDisk=faFloppyDisk
  faImage = faImage
  faXmark = faXmark

  isEditing = false
  isAddingImage = false
  

  isAdmin = false

  @Input() banner:string='some banner'
  @Input() name:string ='asdasd'
  @Input() role:string = 'add role'

  backupBanner:string =''
  backupName:string =''
  backupRole:string =''


  constructor(
    private dataService:DataService,
    private tokenService:TokenService,
    private spinner:NgxSpinnerService
  ) { }



  @Output() updated = new EventEmitter<boolean>()

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin()
    this.backupBanner = this.banner
    this.backupName = this.name
    this.backupRole = this.role
  }

  onStartEdition():void{
    this.isEditing = true
  }
  onAddBanner():void{
    this.isAddingImage = true
  }

  closeBannerWindow(closeWindow:boolean){
    if(closeWindow) this.isAddingImage = false
  }

  receiveBanner(banner:Images){
    this.banner = banner.url
    this.isAddingImage = false
  }

  onSave():void{
    this.spinner.show('banner-spinner')
    this.dataService.data().subscribe(
      {
        next:data=>{
          let newData = new Data(this.name,data.lastName,data.photo,data.description,data.role,this.banner,[],[],[])
           this.dataService.editData(newData).subscribe({
             next: data=>{
             this.update()
             this.isEditing=false
             this.spinner.hide('banner-spinner')
           },
           error:err=>{
             this.spinner.hide('banner-spinner')
            }
         })
      },
      error:err=>{
        this.spinner.hide('banner-spinner')
      }
    })
  }
  onCancel():void{
    this.banner = this.backupBanner
    this.name = this.backupName
    this.role = this.backupRole
    this.isEditing = false
  }
  update(){
    this.updated.emit(true)
  }
}
