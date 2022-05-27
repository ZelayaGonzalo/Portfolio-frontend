import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Data } from 'src/app/models/data';
import { DataService } from 'src/app/service/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  data=<Data>{}
  showError = false
  errotMsg:string = ''
  currentTheme:string = 'night'
  constructor(
    private dataService: DataService,
    private spinner : NgxSpinnerService,
    private renderer:Renderer2,
    private theme:ThemeService
  ) { }


  ngOnInit(): void {
    this.theme.getTheme().subscribe(theme=>{
      this.currentTheme = theme
      this.renderer.removeClass(document.body,'night')
      this.renderer.removeClass(document.body,'light')
      this.renderer.addClass(document.body, this.currentTheme);
    })
    this.spinner.show('main-spinner')
    this.dataService.data().subscribe(
      {next: data=>{
        this.data = data
        this.spinner.hide('main-spinner')
      },
      error:err=>{
        this.showError = true
        this.errotMsg = err.message
        this.spinner.hide('main-spinner')
      }
    }

    )
  }

  onUpdated = (updated:boolean):void=>{
    if(updated){
      this.dataService.data().subscribe(
      data=>{
        this.data = data
      }
    )
    }
    
  }

}
