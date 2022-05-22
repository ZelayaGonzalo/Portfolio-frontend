import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentTheme:string = 'night'

  constructor(private theme:ThemeService,) { 
    
  }

  ngOnInit(): void {
    this.theme.getTheme().subscribe(theme=>{
      this.currentTheme = theme})
  }

}
