
export default class Utilisateur {
  
   id?: number;
   nom:string;
   prenom:string;
   sexe:string;
   age:number;

  

   constructor(nom:string,prenom:string,sexe:string,age:number,id?:number){
    this.id=id,
    this.nom=nom,
    this.prenom=prenom;
    this.sexe=sexe;
    this.age=age
   }

}