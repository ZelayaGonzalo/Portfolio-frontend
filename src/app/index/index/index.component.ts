import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/models/data';
import { DataService } from 'src/app/service/data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  data=<Data>{}
  showError = false
  errotMsg:string = ''

  constructor(
    private dataService: DataService,
    private spinner : NgxSpinnerService
  ) { }


  ngOnInit(): void {
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
