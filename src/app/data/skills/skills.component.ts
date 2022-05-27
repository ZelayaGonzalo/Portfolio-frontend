import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { TokenService } from 'src/app/service/token.service';
import { faPen,faTrash,faFloppyDisk, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/service/data.service';
import { zoomInAnimation } from 'src/app/models/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrollService } from 'src/app/service/scroll.service';


//TODO add validation

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations:[
    zoomInAnimation
  ]
})
export class SkillsComponent implements OnInit {

  //FontAwesome
  faPen = faPen
  faTrash = faTrash
  faFloppyDisk = faFloppyDisk
  faPlus = faPlus
  faXmark = faXmark

  //form
  name:string =''
  icon:string = ''
  level:number = 0
  type:string = 'framework'

  editableSkill:Skill = <Skill>{}

  @Input() currentTheme = 'night'
  @Input() skills:Skill[]=[]
  @Output() updated = new EventEmitter<boolean>()


  languages:Skill[] = []
  frameworks:Skill[] = []
  misc:Skill[] = []

  isAddingSkill = false
  isEditingSkill = false
  isAdmin = false

  constructor(
    private tokenService:TokenService,
    private dataService:DataService,
    private spinner:NgxSpinnerService,
    private scroll:ScrollService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin()
  }

  ngOnChanges():void{
    if( this.skills && this.skills.length > 0){
      this.languages = []
      this.frameworks = []
      this.misc = []
      this.skills.forEach(skill=>{
        if(skill.type === 'framework'){
          this.frameworks.push(skill)
        }
        else if(skill.type === 'language'){
          this.languages.push(skill)
        }
        else{
          this.misc.push(skill)
        }
      })
    }
  }

  openSkillWindow(){
    this.name = ''
    this.icon = ''
    this.level = 0
    this.type = 'framework'
    this.isAddingSkill = true

  }
  closeSkillWindow(){
    this.isAddingSkill = false
  }
  openEditWindow(skill:Skill){
    this.isEditingSkill = true
    this.editableSkill = skill
    this.name = skill.name
    this.icon = skill.icon
    this.level = skill.level
    this.type = skill.type
  }

  closeEditWindow(){
    this.isEditingSkill = false
    this.editableSkill = <Skill>{}
  }

  onAddSkill(){
    this.spinner.show('skill-spinner')
    this.dataService.addSkill(new Skill(this.name,this.icon,this.level,this.type))
    .subscribe(
      {next:data=>{
        this.updated.emit(true)
        this.isAddingSkill = false
        this.spinner.hide('skill-spinner')
      },
      error:err=>{
        window.alert('Ocurrió un error al agregar el elemento')
      }
    }
    )
  }
  onEditSkill(){
    if(this.editableSkill.id){
      this.spinner.show('skill-spinner')
      let newSkill = this.editableSkill
      newSkill.name = this.name
      newSkill.icon = this.icon
      newSkill.level = this.level
      newSkill.type = this.type
      this.dataService.editSkill(newSkill).subscribe(
        {next:data=>{
          this.editableSkill = <Skill>{}
          this.updated.emit(true)
          this.closeEditWindow()
          this.spinner.hide('skill-spinner')
        },
        error:err=>{
          window.alert('Ocurrió un error al editar')
          this.closeEditWindow()
          this.spinner.hide('skill-spinner')
        }
      }
      )
    }
  }
  onDeleteSkill(){
    if(this.editableSkill.id){
      this.spinner.show('skill-spinner')
      this.dataService.deleteSkill(this.editableSkill.id).subscribe(
        {next:data=>{
          this.updated.emit(true)
          this.spinner.hide('skill-spinner')
          this.closeEditWindow()
        },
        error:err=>{
          window.alert('Ocurrio un error al eliminar el elemento')
          this.spinner.hide('skill-spinner')
          this.closeEditWindow()
        } 
      }
      )
    }
  }

  inView(isInView:boolean):void{
    if(isInView) this.scroll.setCurrentView(2)
  }

}
