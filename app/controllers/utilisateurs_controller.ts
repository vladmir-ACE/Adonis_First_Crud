 import Utilisateur from '#models/utilisateur';
import UtilisateursService from '#services/utilisateur_service';
import type { HttpContext } from '@adonisjs/core/http'

export default class UtilisateursController {

private userService = new UtilisateursService()


 async index({response}: HttpContext) {
    // return list of user
      
  try {
    const data=await this.userService.liste()
    response.send({statut:"succes",
               message:"Liste des users ",
              data: data
  });
  } catch (error) {
    response.send({statut:"error",
               message:"error when list user "
  });
     
  }

  } 

  async store({request,response}: HttpContext) {
    // save user
        
        let data:any=request.body();
        console.log(data);

        let user:Utilisateur=new Utilisateur(data.nom,data.prenom,data.sexe,data.age)

        try{
          this.userService.create(user);
          response.send({
            statut:"succes",
            message: user.nom+" succes add",
            data: data
          })
        }catch(error)
        {
          response.send({
            statut:"error",
            message: "Error verify data",
            
          })
        }
    
  }

  async show({response,params}: HttpContext) {
    // return user by id
    
    const idUser:number= params.id;
    console.log(idUser);


    try {
      const data= await this.userService.listeDetail(idUser);
      response.send({
        statut:"succes",
              message:"detail of user"+data.nom,
              data: data
    
       })
      
    } catch (error) {

      response.send({
        statut:"error",
              message:"user not find",
              
    
       })
      
      
    }
    
  }
  

  async update({params,request,response}: HttpContext) {
    // update user by id

    let data:any=request.body();
    const idUser:number= params.id;
        
    let user:Utilisateur=new Utilisateur(data.nom,data.prenom,data.sexe,data.age);

    try{
      this.userService.update(idUser,user);
      response.send({
        statut:"succes",
        message: user.nom+" succes update",
        data: data
      })
    }catch(error)
    {
      response.send({
        statut:"error",
        message: "Error verify data",
        
      })
    }


    
  }

  async delete({params,response}: HttpContext) {
    // delete user by id
    
    const idUser:number= params.id;
    console.log(idUser);

   
   try{
    this.userService.delete(idUser)
    response.send({
      statut:"succes",
      message:" succes delete",
      
    })
  }catch(error)
  {
    response.send({
      statut:"error",
      message: "Error when delete user",
      
    })
  }
  }

}