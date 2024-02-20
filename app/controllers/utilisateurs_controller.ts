 import Utilisateur from '#models/utilisateur';
import UtilisateursService from '#services/utilisateur_service';
import type { HttpContext } from '@adonisjs/core/http'

export default class UtilisateursController {

private userService = new UtilisateursService()


 async index({}: HttpContext) {
    // return list of user

    return this.userService.liste();

  } 

  async store({request}: HttpContext) {
    // save user
        
        let data:any=request.body();
        console.log(data);

        let user:Utilisateur=new Utilisateur(data.nom,data.prenom,data.sexe,data.age)
          this.userService.create(user)  

  }

  async show({params}: HttpContext) {
    // return user by id
    
    const idUser:number= params.id;
    console.log(idUser);

   return this.userService.listeDetail(idUser)

    
  }
  

  async update({params,request}: HttpContext) {
    // update user by id

    let data:any=request.body();
    const idUser:number= params.id;
        
    let user:Utilisateur=new Utilisateur(data.nom,data.prenom,data.sexe,data.age);


    
   return this.userService.update(idUser,user)

    
  }

  async delete({params}: HttpContext) {
    // delete user by id
    
    const idUser:number= params.id;
    console.log(idUser)
   return this.userService.delete(idUser)

    
  }

}