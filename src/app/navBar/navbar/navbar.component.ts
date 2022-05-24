import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { style,trigger,animate,state, transition } from '@angular/animations';
import { faBars, faCircleHalfStroke, faUser } from '@fortawesome/free-solid-svg-icons';
import { inOutAnimation } from 'src/app/models/animations';
//Services
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { Theme } from 'src/app/models/theme';

import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from 'src/app/service/theme.service';
import { ScrollService } from 'src/app/service/scroll.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations:[
    inOutAnimation,
  trigger("inOutPaneAnimationLeft", [
    transition(":enter", [
        style({ opacity: 0, transform: "translateX(-100%)" }), //apply default styles before animation starts
        animate(
            "550ms ease-in-out",
            style({ opacity: 1, transform: "translateX(0)" })
        )
    ]),
    transition(":leave", [
        style({ opacity: 1, transform: "translateX(0)" }), //apply default styles before animation starts
        animate(
            "400ms ease-in-out",
            style({ opacity: 0, transform: "translateX(-100%)" })
        )
    ])
])
  ]
})
export class NavbarComponent implements OnInit {

  faUser = faUser
  faBars = faBars
  faCircleHalfStroke = faCircleHalfStroke

  selected:number = 0

  //Components 
  showLogin = false
  showRegister = false
  showMobileMenu = false

  currentTheme:string = 'night'
  currentView:number = 0

  //Auth
  errorLogin = false
  errorRegistro = false
  isLogged = false
  isAdmin = false

  loginUsuario :LoginUsuario | undefined
  nuevoUsuario :NuevoUsuario | undefined
  username:string = ''
  email:string = ''
  password:string = ''
  errorMsj:string = ''
  errorRegistroMsj:string = ''

  user:string | null = ''
  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private spinner:NgxSpinnerService,
    public theme:ThemeService,
    private renderer:Renderer2,
    private scrollService:ScrollService
  ) { }

  ngOnInit(): void { 
    this.isLogged = this.tokenService.isLogged()
    this.isAdmin = this.tokenService.isAdmin()
    if(this.isLogged){
      this.user = this.tokenService.getUserName()
    }
    this.theme.getTheme().subscribe(theme=>{
      this.currentTheme = theme
      this.renderer.removeClass(document.body,'night')
      this.renderer.removeClass(document.body,'light')
      this.renderer.addClass(document.body, this.currentTheme);
    })
    this.scrollService.getCurrentView().subscribe(
      {next:data=>{
        this.currentView = data
      }}
    )
  }

  toogleMobileMenu():void{
    this.showMobileMenu = ! this.showMobileMenu
  }
  
  onRegister():void{
    this.spinner.show('register-spinner')
    this.nuevoUsuario = new NuevoUsuario(this.username,this.username,this.email,this.password)
    this.authService.new(this.nuevoUsuario).subscribe(
      {next:data=>{
        this.errorRegistro = false
        this.onLogin()
      },
      error:err=>{
        this.errorRegistroMsj = err.error.mensaje
        this.errorRegistro = true
        this.spinner.hide('register-spinner')
      }
    }
    )
  }

  onLogin():void{
    this.spinner.show('login-spinner')
    this.loginUsuario = new LoginUsuario(this.username,this.password)
    this.authService.login(this.loginUsuario).subscribe(
      {
        next:data=>{
          this.tokenService.setToken(data.token)
          this.showLogin = false
          window.location.reload()
          this.spinner.hide('login-spinner')
        },
        error:err=>{
          this.errorMsj = 'Error iniciando sesion, verifique los datos'
          this.errorLogin = true
          this.spinner.hide('login-spinner')
        }
      }
    )
  }

  onLogout():void{
    this.tokenService.logOut()
  }

  onSelect(selection:number):void{
    this.scrollService.setCurrentView(selection)
  }

  onShowLogin():void{
    this.showLogin = !this.showLogin
  }
  onClickLogin():void{
    this.showRegister = false
  }
  onClickRegister():void{
    this.showRegister = true
  }

}
