 import Book from '#models/book';
import BookService from '#services/book_service';
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
    private bookService = new BookService()


 async index({}: HttpContext) {
    // return list of book

    return this.bookService.liste();

  } 

  async store({request}: HttpContext) {
    // save book
        
        let data:any=request.body();
        console.log(data);

        let book:Book=new Book(data.nom,data.user_id)
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