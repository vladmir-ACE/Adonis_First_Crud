

export default class Book {
  
    id?: number;
    nom:string;
    user_id?:number;
    file?:string
    user?:any;
    
   
    constructor(nom:string,user_id?:number,file?:string,user?:any,id?:number){
     this.id=id;
     this.nom=nom;
     this.user_id=user_id;
     this.user=user;
     this.file=file;
    }
 
 }