import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/'

  constructor(private httpClient : HttpClient) { }

  public new(nuevoUsuario: NuevoUsuario):Observable<any>{
    return this.httpClient.post<any>(this.authURL+'new',nuevoUsuario)
  }

  public login(loginUsuario: LoginUsuario) : Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authURL+'login',loginUsuario)
  }

  public refresh(dto:JwtDTO) : Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authURL+'refresh',dto)
  }
}