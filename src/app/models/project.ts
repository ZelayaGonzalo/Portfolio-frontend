import { Images } from "./project-image"
import { Skill } from "./skill"

export class Project {
    id?:number
    title:string
    description:string
    demoLink:string
    repoLink:string
    technologies : Skill[]
    images: Images[]
    constructor(title:string,description:string,technologies:Skill[],demoLink:string,repoLink:string,images:Images[]){
        this.title = title
        this.description = description
        this.technologies = technologies
        this.demoLink = demoLink
        this.repoLink = repoLink
        this.images = images
    }
}