import { Product_book } from "./Product_book";

export interface Book{
    ID: number;
    ISBN: string;
    TITLE: string;
    SUMMARY: string;
    COVER: string;
    AUTHOR_ID: number;
    CATEGORY_ID: number;
    PRODUCTS: Product_book[];
}