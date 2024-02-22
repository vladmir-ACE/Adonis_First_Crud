import Utilisateur from "#models/utilisateur";
import fs from "fs-extra"
import path from "path";

export default class UtilisateursService {
    filePath: any;

    constructor(){
        this.filePath = path.resolve('./database/data.json');
    }

    // save User
     async create(newUser:Utilisateur) {
        const usersData = await fs.readJson(this.filePath);
      
        const users = usersData.users;
        newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        users.push(newUser);
        await fs.writeJson(this.filePath, { users , books:usersData.books });
        
      }

      // Liste User
      async liste() {
        const usersData = await fs.readJson(this.filePath);
        console.log(usersData);
        const users = usersData.users;
      
        return users;
      }


      // detail User

      async listeDetail(id: number){

        const usersData = await fs.readJson(this.filePath);
        
        const users = usersData.users;
        // trouver l'utilisateur avec l'id
        const user = users.find((u:any) => u.id == id);
        console.log(user)
      
        return user;


      }

      //update user
      async update(id: number,user:Utilisateur){

        const usersData = await fs.readJson(this.filePath);
        
        const users = usersData.users;
        // trouver l'utilisateur avec l'id

        users.forEach((item: Utilisateur) => {
          if (item.id==id) {
            item.nom=user.nom;
            item.prenom=user.prenom;
            item.age=user.age;
            item.sexe=user.sexe
            console.log(item);
          }

        });

        // mis a jour
        await fs.writeJson(this.filePath, { users ,books:usersData.books});
        
        

      }
      //delete user 
      async delete(id: number){

        const usersData = await fs.readJson(this.filePath);
        
        let users = usersData.users;

        // filtrer pour enlever le user avec l'id paseé

        users = users.filter((user:Utilisateur) => user.id != id);

        //mise a jour 
        console.log(users)
        await fs.writeJson(this.filePath, { users ,books:usersData.books});
        
      }

}