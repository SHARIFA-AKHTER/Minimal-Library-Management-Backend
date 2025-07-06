import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { createBorrowZodSchema } from './borrow.validation';
import { borrowBook,getBorrowedSummary } from './borrow.controller';

export const BorrowRoutes = express.Router();

BorrowRoutes.post("/",validateRequest(createBorrowZodSchema), borrowBook);

BorrowRoutes.get("/summary", getBorrowedSummary);


