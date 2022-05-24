import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { faFloppyDisk, faPen, faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Education } from 'src/app/models/education';
import { DataService } from 'src/app/service/data.service';
import { TokenService } from 'src/app/service/token.service';
import { zoomInAnimation } from 'src/app/models/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from 'src/app/service/theme.service';
import { ScrollService } from 'src/app/service/scroll.service';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss'],
  animations:[
    zoomInAnimation
  ]
})
export class StudiesComponent implements OnInit,OnChanges {

  faPen = faPen
  faPlus = faPlus
  faXmark = faXmark
  faTrash = faTrash
  faFloppyDisk = faFloppyDisk

  @Input() history:Education[] =[]
  @Output() updated = new EventEmitter<boolean>()
  arranged: Education[] =[]

  isAdmin = false
  isEditing = false
  currentTheme:string = 'night'

  currentID:number | undefined = undefined
  institution:string = ''
  degree:string = ''
  startYear:number = 2020
  endYear:number = 2021
  finished = false

  currentYear:number = 0

  constructor(
    private tokenService:TokenService,
    private dataService:DataService,
    private spinner:NgxSpinnerService,
    private theme:ThemeService,
    private scroll:ScrollService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin()
    this.currentYear = new Date().getFullYear()
    this.history.sort(
      (a,b)=>a.startYear - b.startYear
    )
    this.theme.getTheme().subscribe(theme=>{
      this.currentTheme = theme})
  }
  ngOnChanges():void{
    this.history.sort(
      (a,b)=>a.startYear - b.startYear
    )
  }


  openEditWindow():void{
    this.isEditing = true
  }
  closeEditWindow():void{
    this.emptyFields()
    this.isEditing = false
  }

  onStartEditing(education:Education){
    this.currentID = education.id
    this.institution = education.institution
    this.degree = education.degree
    this.startYear = education.startYear
    this.endYear = education.endYear 
    this.finished = (this.endYear > this.currentYear)
    this.isEditing = true
  }

  onAdd():void{
    this.spinner.show('education-spinner')
    let education = new Education(this.institution,this.degree,this.startYear,!this.finished ? this.endYear:2050)
    if(this.currentID){
      education.id = this.currentID
      this.dataService.editEducation(education).subscribe(
        {next:data=>{
          console.log('Edited',data)
          this.closeEditWindow()
          this.updated.emit(true)
          this.spinner.hide('education-spinner')
          
        },
        error:err=>{
          console.log('Error submitting',err)
          this.spinner.hide('education-spinner')
          this.closeEditWindow()        
        }
      }
      )
    }
    else{
      this.dataService.addEducation(education).subscribe(
        {next:data=>{
          console.log('submitted',data)
          this.closeEditWindow()
          this.updated.emit(true)
          this.spinner.hide('education-spinner')
        },
        error:err=>{
          console.log('Error submitting',err)
          this.spinner.hide('education-spinner')
        }
      }
      )
    }
    
  }
  onDelete():void{
    this.spinner.show('education-spinner')
    if(this.currentID){
      if(window.confirm("¿Eliminar este elemento?")){
        this.dataService.deleteEducation(this.currentID).subscribe(
          {
            next:data=>{
            console.log('Deleted')
            this.updated.emit(true)
            this.closeEditWindow()
            this.spinner.hide('education-spinner')
          },
        error:err=>{
          console.log('error',err)
          this.spinner.hide('education-spinner')
            }
          }
        )
      }
    }
  }

  emptyFields():void{
    this.currentID = undefined
    this.institution = ''
    this.degree = ''
    this.startYear = 2000
    this.endYear = 2050
    this.finished = false
  }

  inView(isInView:boolean):void{
    if(isInView) this.scroll.setCurrentView(1)
  }

}
