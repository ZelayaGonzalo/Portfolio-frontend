import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, Observable, throwError } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

//TODO test refresh token

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(
    private tokenService:TokenService,
    private authService:AuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.tokenService.isLogged()){
      return next.handle(req)
    }

    let intReq = req
    const token = this.tokenService.getToken()
    if(token){
      intReq = this.addToken(req,token) 
    }
    return next.handle(intReq).pipe(catchError((err:HttpErrorResponse) =>{
      if(err.status === 401){
        if(token){
          const dto: JwtDTO = new JwtDTO(token)
          return this.authService.refresh(dto).pipe(concatMap((data:any)=>{
            console.log('refreshing')
            this.tokenService.setToken(data.token)
            intReq = this.addToken(req,data.token)
            return next.handle(intReq)
          }))
        }
        else{
          console.log('login out, interceptor')
          this.tokenService.logOut()
          return throwError(err)
        }
      }
      else{
        console.log('login out, interceptor 2')
        this.tokenService.logOut()
        return throwError(err)
      }
    } 
    ))
  }

  private addToken(req: HttpRequest<any>, token:string): HttpRequest<any>{
    return req.clone(({headers:req.headers.set('Authorization','Bearer ' + token)}))
  }
}

export const interceptorProvider = [{provide:HTTP_INTERCEPTORS, useClass:InterceptorService,multi:true}]
