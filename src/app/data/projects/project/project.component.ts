import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/service/data.service';
import { TokenService } from 'src/app/service/token.service';

import { GalleryItem,ImageItem } from 'ng-gallery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit,OnChanges {

  faPen = faPen
  faTrash = faTrash
  faPlus = faPlus
  faGlobe = faGlobe
  faGithub = faGithub

  @Input() project:Project = <Project>{}
  @Input() index:number = 0
  @Input() currentTheme:string = 'night'
  @Output() reloadData = new EventEmitter<boolean>()
  @Output() editProject = new EventEmitter<Project>()

  galleryImages:GalleryItem[] = []

  isAddingProject = false
  isIndexEven = false
  spinnerName:string = 'project-spinner'

  isAdmin = false

  constructor(
    private tokenService:TokenService,
    private dataService:DataService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin()
    this.isIndexEven = isEven(this.index)
    this.spinnerName = `project-spinner${this.index}`
    this.spinner.hide(this.spinnerName)
  }

  ngOnChanges():void{
    if(this.project.id){
      this.project.images.forEach(
        image=>{
          this.galleryImages.push(new ImageItem({src:image.url,thumb:image.url}))
        }
      )
    }
  }

  onEditProject(){
    this.editProject.emit(this.project)
  }

  onDeleteProject(){
    if(window.confirm('Eliminar este elemento?')){
      this.spinner.show(this.spinnerName)
      if(this.project.id){
        this.dataService.deleteProject(this.project.id).subscribe(
          {
            next: data=>{
              this.reloadData.emit(true)
            },
            error:err=>{
              window.alert('Error eliminando proyecto')
              this.spinner.hide(this.spinnerName)
            }
          }
        )
      }
    }
    
  }

  AddProject(){
    this.isAddingProject = true
  }

}

function isEven(number:number):boolean{
  return (number % 2 === 0)
}