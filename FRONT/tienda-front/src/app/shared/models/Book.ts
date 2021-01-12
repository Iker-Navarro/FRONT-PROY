import { Product_book } from "./Product_book";

export interface Book{
    ID: number;
    ISBN: number;
    TITLE: String;
    SUMMARY: String;
    COVER: String;
    AUTHOR_ID: number;
    CATEGORY_ID: number;
    PRODUCTS: Product_book[];
}