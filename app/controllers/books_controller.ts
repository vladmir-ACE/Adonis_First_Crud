import Book from '#models/book';
import BookService from '#services/book_service';
import { Application } from '@adonisjs/core/app';
import { cuid } from '@adonisjs/core/helpers';
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app';

export default class BooksController {
    private bookService = new BookService()

 async index({response}: HttpContext) {
    // return list of book
     try {
      const data= await this.bookService.liste();
    response.send({statut:"succes",
               message:"Liste des livres ",
              data: data
  });
     } catch (error) {
      response.send({statut:"error",
               message:"error when return list ",
  });
     }

  } 

  async store({request,response}: HttpContext) {[]
    // save book
    
      // get pdf
       const file= request.file('doc', {
        size: '50mb',
        extnames: ['pdf']
      });
      // validate 

      if(!file!.isValid) {
        return response.badRequest({
          message:"mauvais format; choisir un pdf",
          errors: file!.errors
        })
      }
      
       const filename=cuid()+'.'+file!.extname;
       console.log(filename)
      // move pdf
      await file!.move(app.makePath('uploads'),{
        name:filename
      })
       
        let data:any=request.body();
        console.log(data);

        let book:Book=new Book(data.nom,data.user_id,filename)

        try {
         this.bookService.create(book)  
          response.send({
            statut:"succes",
            message:data.nom+" succes add"
          })
          
        } catch (error) {
          response.send({
            statut:"error",
            message:"error when add book "
          })
          
        }


          

  }

  // book add by a user 

  async addByUser({request,response,params}: HttpContext) {[]
    // save book
    const user_id=params.id;    
      // get pdf
       const file= request.file('doc', {
        size: '50mb',
        extnames: ['pdf']
      });
      // validate 

      if(!file!.isValid) {
        return response.badRequest({
          message:"mauvais format; choisir un pdf",
          errors: file!.errors
        })
      }
      
       const filename=cuid()+'.'+file!.extname;
       console.log(filename)
      // move pdf
      await file!.move(app.makePath('uploads'),{
        name:filename
      })
       
        let data:any=request.body();
        console.log(data);

        let book:Book=new Book(data.nom,user_id,filename)

        try {
         this.bookService.create(book)  
          response.send({
            statut:"succes",
            message:data.nom+"succes add"
          })
          
        } catch (error) {
          response.send({
            statut:"error",
            message:"error when add book "
          })
          
        }
  }


  async show({params,response}: HttpContext) {
    // return book by id
    
    const idbook:number= params.id;
    console.log(idbook);

    


    try {
      const data=this.bookService.listeDetail(idbook);
      response.send({
        statut:"succes",
        message:"detail of book",
              data: data
      })

    } catch (error) {
      
    }

    
 }

 async update({params,request,response}: HttpContext) {

    let filename:string="";

    // update book by id
     
    // get pdf
    const file= request.file('doc', {
      size: '50mb',
      extnames: ['pdf']
    });
    // validate 

    if(file!=null){
      if(!file!.isValid) {
        return response.badRequest({
          message:"mauvais format; choisir un pdf",
          errors: file!.errors
        })
      }   
         filename=cuid()+'.'+file!.extname;
        console.log(filename)
     // move pdf
       await file!.move(app.makePath('uploads'),{
       name:filename
     })
        
    }


    const idbook:number= params.id;

    let data:any=request.body();
     
    let book:Book=new Book(data.nom,data.user_id,filename);

    


    try{
      this.bookService.update(idbook,book);
      response.send({
        statut:"succes",
        message: data.nom+" succes update",
        
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
    // delete book by id
    
    const idbook:number= params.id;

   try{
    this.bookService.delete(idbook)
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


