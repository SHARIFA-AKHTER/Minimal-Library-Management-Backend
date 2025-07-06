import express, { Application, Request, Response } from "express";
import cors from 'cors';

import { BorrowRoutes } from "./app/models/borrow/borrow.route";
import { BookRoutes } from "./app/models/book/book.route";

const app : Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", BookRoutes);
app.use("/api/borrows", BorrowRoutes);


app.get('/', (req: Request, res: Response) =>{
    res.send('Library Management API is running')
})


export default app;