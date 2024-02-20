/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import BooksController from '#controllers/books_controller'
import UtilisateursController from '#controllers/utilisateurs_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
//user
router.get( '/listUser', [UtilisateursController,'index'])
router.get( '/listUser/:id', [UtilisateursController,'show'])
router.post( '/addUser', [UtilisateursController,'store'])
router.put( '/updateUser/:id', [UtilisateursController,'update'])
router.delete( '/deleteUser/:id', [UtilisateursController,'delete'])

//book
router.post( '/addBook', [BooksController,'store'])
router.get( '/listBook/', [BooksController,'index'])
router.get( '/listBook/:id', [BooksController,'show'])
router.put('updateBook/:id',[BooksController,'update'])
router.delete("/deleteBook/:id",[BooksController,"delete"])
