import Utilisateur from "./utilisateur.js";

export default class Book {
  
    id?: number;
    nom:string;
    user_id?:number;
    user?:any;
   
    constructor(nom:string,user_id?:number,user?:any,id?:number){
     this.id=id,
     this.nom=nom,
     this.user_id=user_id;
     this.user=user
    }
 
 }