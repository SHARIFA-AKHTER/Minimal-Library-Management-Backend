import { Document,  model, Schema } from "mongoose";


export interface IBook extends Document{
     title: string;
  author: string;
  genre?: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

const bookSchema = new Schema<IBook>(
    {
        title: {type:String, required:true},
        author: {type:String, required:true},
        genre:String,
        isbn:{type:String, required:true,unique:true},
        description: String,
        copies: {type:Number, required:true, min: 0},
        available: {type: Boolean, default:true},
    },
    {timestamps:true}
);

export const Book = model <IBook>('Book', bookSchema);