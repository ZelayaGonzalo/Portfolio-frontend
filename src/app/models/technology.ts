export class Technology{
    id?:number
    name:string
    type:string
    icon:string
    constructor (name:string,type:string,icon:string){
        this.name = name
        this.type = type
        this.icon = icon
    }
}