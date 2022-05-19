
export class Education{
    id?:number
    institution:string
    degree:string
    startYear:number
    endYear:number
    constructor(institution:string,degree:string,startYear:number,endYear:number){
        this.institution = institution
        this.degree = degree
        this.startYear = startYear
        this.endYear = endYear
    }
}