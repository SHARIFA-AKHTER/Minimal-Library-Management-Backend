
import { Request, Response, NextFunction, RequestHandler } from 'express';

import { sendResponse } from '../../utils/sendResponse';
import { Book } from '../book/book.model';
import { Borrow } from './borrow.model';


export const borrowBook:RequestHandler = async (req, res) => {
   console.log('Incoming request body:', req.body);
    const {book, quantity, dueDate } = req.body;
    const existingBook = await Book.findById(book);

    if(!existingBook){
       res.status(404).json({
            success: false,
            message: 'Book not found',
        });
        return;
    }

    if (existingBook.copies < quantity){
        res.status(400).json({
            success: false,
            message: 'Not enough copies available'
        })
        return
    }

    existingBook.copies -= quantity;
    if(existingBook.copies === 0){
        existingBook.available = false;
    }
    await existingBook.save()
    const borrow = await Borrow.create({
      book, 
      quantity,
       dueDate
    
    });
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Books borrowed successfully",
        data: borrow,
      });
    
};

export const  getBorrowedSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantityBorrowed: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book',
        },
      },
      {
        $unwind: '$book',
      },
      {
        $project: {
          bookTitle: '$book.title',
          isbn: '$book.isbn',
          totalQuantityBorrowed: 1,
        },
      },
    ]);

    res.json(summary);
  } catch (err) {
    next(err);
  }
};
