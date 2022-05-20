import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../models/data';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../models/skill';
import { Project } from '../models/project';
import { Education } from '../models/education';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataURL = 'https://shielded-temple-99138.herokuapp.com'

  constructor(private httpClient: HttpClient) { }

  public data():Observable<Data>{
    return this.httpClient.get<Data>(`${this.dataURL}/data`)
  }

  public editData(data:Data):Observable<any>{
    return this.httpClient.put(this.dataURL+'/edit',data)
  }

  public getSkills():Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(`${this.dataURL}/skills/all`)
  }

  public addSkill(skill:Skill):Observable<any>{
    return this.httpClient.post(this.dataURL+'/skills/add',skill)
  }

  public editSkill(skill:Skill):Observable<any>{
    return this.httpClient.put(this.dataURL+'/skills/edit',skill)
  }

  public deleteSkill(id:number):Observable<any>{
    return this.httpClient.delete(`${this.dataURL}/skills/delete?id=${id}`)
  }

  public addProject(project:Project):Observable<any>{
    return this.httpClient.post(`${this.dataURL}/projects/add`,project)
  }
  public editProject(project:Project):Observable<any>{
    return this.httpClient.put(`${this.dataURL}/projects/edit`,project)
  }
  public deleteProject(id:number):Observable<any>{
    return this.httpClient.delete(`${this.dataURL}/projects/delete?id=${id}`)
  }

  public addEducation(education:Education){
    return this.httpClient.post(`${this.dataURL}/education/add`,education)
  }
  public editEducation(education:Education):Observable<any>{
    return this.httpClient.put(`${this.dataURL}/education/edit`,education)
  }
  public deleteEducation(id:number):Observable<any>{
    return this.httpClient.delete(`${this.dataURL}/education/delete?id=${id}`)
  }

}
