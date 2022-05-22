import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft, faCheck, faRotateLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Skill } from 'src/app/models/skill';
import { DataService } from 'src/app/service/data.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-skills-selector',
  templateUrl: './skills-selector.component.html',
  styleUrls: ['./skills-selector.component.scss']
})
export class SkillsSelectorComponent implements OnInit {

  faFloppyDisk = faCheck
  faXmark = faRotateLeft
  faArrowLeft = faArrowLeft

  @Input() alreadySelected:Skill[] =[]
  @Input() currentTheme:string = 'night'
  @Output() goBack = new EventEmitter<boolean>()
  @Output() sendSelected = new EventEmitter<Skill[]>()

  skills:Skill[] = []

  errorSkills = false

  skillsSelected:Skill[] =[]
  
  constructor(
    private dataService:DataService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show('skill-selection-spinner')
    this.dataService.getSkills().subscribe(
      {
        next:data=>{
          this.skills = data
          this.spinner.hide('skill-selection-spinner')
        },
        error:err=>{
          this.errorSkills = true
          this.spinner.hide('skill-selection-spinner')
        }
      }
    )
    this.skillsSelected = this.alreadySelected
  }

  onSelectSkill(skill:Skill){
    if(this.skillsSelected.findIndex(selectedSkill=>selectedSkill.id === skill.id) >= 0){
      this.skillsSelected.splice(this.skillsSelected.findIndex(selectedSkill=>selectedSkill.id === skill.id),1)
    }
    else{
      this.skillsSelected.push(skill)
    }
  }

  isSelected(skill:Skill):boolean{
    if(this.skillsSelected.find(selectedSkill=>selectedSkill.id === skill.id)){
      return true
    }
    return false
  }

  onCancel():void{
    this.skillsSelected = []
    this.goBack.emit(true)
  }

  onResetSelection():void{
    this.skillsSelected = []
  }

  onSaveSelection():void{
    this.sendSelected.emit(this.skillsSelected)
    this.goBack.emit(true)
  }

}
