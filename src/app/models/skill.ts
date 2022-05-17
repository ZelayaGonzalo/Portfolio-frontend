export class Skill {
    id?:number
    name:string
    icon:string
    level:number
    type:string
    constructor(name:string,icon:string,level:number,type:string,id?:number){
        this.id=id
        this.name = name
        this.icon = icon
        this.level = level
        this.type = type
    }
}