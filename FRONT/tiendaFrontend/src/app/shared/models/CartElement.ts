import { Product_book } from "./Product_book";

export interface CartElement {
    BOOK_ID: number;
    TITLE: string;
    ISBN: string;
    PRODUCT: Product_book;
    AMOUNT: number;
}