import  express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from './book.controller';
import { createBookZodSchema } from './book.validation';
import validateRequest from '../../middlewares/validateRequest';




export const BookRoutes = express.Router();


BookRoutes.post('/',validateRequest(createBookZodSchema), createBook);
BookRoutes.get('/',getBooks);
BookRoutes.get('/:bookId', getBookById);
BookRoutes.put('/:bookId',updateBook);
BookRoutes.delete('/:bookId', deleteBook);


