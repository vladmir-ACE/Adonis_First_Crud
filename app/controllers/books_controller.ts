import Book from '#models/book';
import BookService from '#services/book_service';
import { Application } from '@adonisjs/core/app';
import { cuid } from '@adonisjs/core/helpers';
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app';

export default class BooksController {
    private bookService = new BookService()


 async index({}: HttpContext) {
    // return list of book

    return this.bookService.liste();

  } 

  async store({request}: HttpContext) {[]
    // save book
    
      // get pdf
       let file= request.file('doc', {
        size: '50mb',
        extnames: ['pdf']
      });
      
       const filename=cuid()+'.'+file!.extname;
       console.log(filename)
      // move pdf
      await file!.move(app.makePath('uploads'),{
        name:filename
      })
       
        let data:any=request.body();
        console.log(data);

        let book:Book=new Book(data.nom,data.user_id,filename)
          this.bookService.create(book)  

  }

  async show({params}: HttpContext) {
    // return book by id
    
    const idbook:number= params.id;
    console.log(idbook);

   return this.bookService.listeDetail(idbook)

    
 }

 async update({params,request}: HttpContext) {
    // update book by id
    
    const idbook:number= params.id;

    let data:any=request.body();
     
    let book:Book=new Book(data.nom,data.user_id)

   return this.bookService.update(idbook,book);

    
 }

 async delete({params}: HttpContext) {
    // delete book by id
    
    const idbook:number= params.id;

   return this.bookService.delete(idbook)

    
 }


}