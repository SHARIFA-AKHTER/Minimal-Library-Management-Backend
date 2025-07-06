import { NextFunction, Request, Response } from "express";

import { sendResponse } from "../../utils/sendResponse";
import { Book } from "./book.model";


export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, isbn, description, copies } = req.body;

    const available = copies > 0;

    const book = await Book.create({
      title,
      author,
      genre,
      isbn,
      description,
      copies,
      available,
    });

    console.log("Book created:", book);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: err,
    });
  }
};



export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const book = await Book.findById(req.params.bookId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books retrieved successfully",
    data: book,
  });
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
    new: true,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books Update successfully",
    data: book,
  });
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Book.findByIdAndDelete(req.params.bookId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books Deleted successfully",
    data: null,
  });
};
