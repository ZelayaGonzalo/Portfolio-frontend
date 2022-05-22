import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { faCirclePlus, faCubes, faFloppyDisk, faImage, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project';
import { Images } from 'src/app/models/project-image';
import { Skill } from 'src/app/models/skill';
import { DataService } from 'src/app/service/data.service';
import { TokenService } from 'src/app/service/token.service';
import { inOutAnimation,zoomInAnimation } from 'src/app/models/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations:[
    inOutAnimation,
    zoomInAnimation
  ]
})
export class ProjectsComponent implements OnInit {

  faPlus = faPlus
  faCirclePlus = faCirclePlus
  faCubes = faCubes
  faImage = faImage
  faFloppyDisk = faFloppyDisk
  faXmark = faXmark

  isAddingProject = false
  isAddingImages = false
  isAddingSkill = false

  @Output() reloadData = new EventEmitter<boolean>()
  @Input() projects:Project[] = []

  isAdmin = false
  currentTheme:string = 'night'

  //Add Project
  projectID: number | undefined
  title:string = ''
  description:string = ''
  demo:string = ''
  repo:string = ''
  skills:Skill[] = []
  images:Images[] = []

  constructor(
    private tokenService:TokenService,
    private dataService:DataService,
    private spinner:NgxSpinnerService,
    private theme:ThemeService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin()
    this.theme.getTheme().subscribe(theme=>{
      this.currentTheme = theme})
  }

  openAddProject():void{
    this.emptyFields()
    this.isAddingProject = true
  }
  closeAddProject():void{
    if(window.confirm("Seguro que quiere cerrar? Se perderan todos los datos")){
      this.emptyFields()
      this.isAddingProject = false
    }
  }
  openSelectSkills():void{
    this.isAddingSkill = true
  }
  closeSelectSkills(goingBack:boolean):void{
    if (goingBack) this.isAddingSkill = false
  }
  openImagesEditor():void{
    this.isAddingImages = true
  }
  closeImagesEditor(goingBack:boolean):void{
    if (goingBack) this.isAddingImages = false
  }

  receiveSkills(skills:Skill[]):void{
    this.skills = skills
  }
  receiveImages(images:Images[]):void{
    this.images = images
    console.log(this.images)
  }

  onReloadData(reload:boolean):void{
    if(reload) this.reloadData.emit(true)
  }


  onEditProject(project:Project):void{
    this.isAddingProject = true
    this.projectID = project.id
    this.title =project.title
    this.description = project.description
    this.demo = project.demoLink
    this.repo = project.repoLink
    this.skills = project.technologies
    this.images = project.images
  }
  onSaveProject():void{
    if(window.confirm('Desea guardar con los datos actuales?')){
      this.spinner.show('projects-spinner')
      let project = new Project(this.title,this.description,this.skills,this.demo,this.repo,this.images)
      if(this.projectID){
        project.id = this.projectID
      }
      this.dataService.addProject(project).subscribe(
        {
          next:data=>{
            this.spinner.hide('projects-spinner')
            this.isAddingProject = false
            this.reloadData.emit(true)
            
          },
          error:err=>{
           window.alert('Error guardando proyecto')
           this.spinner.hide('projects-spinner')
          }
        }
      )
    }
  }

  emptyFields():void{
    this.projectID = undefined
    this.title =''
    this.description = ''
    this.demo =''
    this.repo = ''
    this.skills = []
    this.images = []
  }

}
