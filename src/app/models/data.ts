import { Education } from "./education"
import { Project } from "./project"
import { Skill } from "./skill"

export class Data{
    id?:number
    name:string
    lastName:string
    photo:string
    role:string
    description:string
    banner:string
    education:Education[]
    skills:Skill[]
    projects:Project[]
    constructor(name:string, lastname:string, photo:string,description:string,role:string,banner:string,skills:Skill[],projects:Project[],education:Education[]){
        this.name = name
        this.lastName = lastname
        this.photo = photo
        this.description = description
        this.role = role
        this.banner = banner
        this.education = education
        this.skills = skills
        this.projects = projects
    }
    
}