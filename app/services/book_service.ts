import path from "path";
import Book from "#models/book";
import fs from "fs-extra"
import UtilisateursService from "./utilisateur_service.js";
import Utilisateur from "#models/utilisateur";

export default class BookService {
    filePath: any;
    private userService= new UtilisateursService();

    constructor(){
        this.filePath = path.resolve('./database/data.json');
    }

    // save Book
    async create(newBook:Book) {
        const BooksData = await fs.readJson(this.filePath);
      
        const books = BooksData.books;
        newBook.id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
        books.push(newBook);
        // mis a jours 
        await fs.writeJson(this.filePath, {users: BooksData.users, books });
       
      }

      async liste() {
        const BooksData = await fs.readJson(this.filePath);
        let books= BooksData.books;
        
        await Promise.all(books.map(async (item: Book) => {
            let user = await this.userService.listeDetail(item.user_id!);
            item.user = user;
        }));

        console.log(books)
        return books;      
       
      }

      async listeDetail(id:number) {
        const BooksData = await fs.readJson(this.filePath);
        const books= BooksData.books;

        await Promise.all(books.map(async (item: Book) => {
            let user = await this.userService.listeDetail(item.user_id!);
            item.user = user;
        }));
        
        const book = books.find((b:any)=> b.id ==id);

        console.log(book);
        return book;      
       
      }
      // update books

      async update(id: number,book:Book){
        const BooksData = await fs.readJson(this.filePath);
        
        const books= BooksData.books;

        // trouver le livre avec l'id

        books.forEach((item: Book) => {
          if (item.id==id) {
            item.nom=book.nom;
            item.file=book.file!=""?book.file:item.file;
            
            console.log(item);
          }

        });

        // mis a jour
        await fs.writeJson(this.filePath, {users: BooksData.users, books });
        return book;

      }

      
      async delete(id: number){
        const BooksData = await fs.readJson(this.filePath);
        
        let books= BooksData.books;

        // filter pour degager le book avec l'id

        books = books.filter((book:Book) => book.id != id);

        // mis a jour
        await fs.writeJson(this.filePath, {users: BooksData.users, books });
        

      }




}