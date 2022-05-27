import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() currentTheme:string = 'night'

  constructor(private theme:ThemeService,) { 
    
  }

  ngOnInit(): void {
  }

}
