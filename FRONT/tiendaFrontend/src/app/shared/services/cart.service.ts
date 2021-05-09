import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { CartElement } from '../models/CartElement';
import { Product_book } from '../models/Product_book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(book: Book, product: Product_book, amount: number){

    let carro: CartElement[] = [];
    let existente;

    if(localStorage.getItem("cart")){
      carro = JSON.parse(localStorage.getItem("cart"));
      
      existente = carro.find((cartEl: CartElement) => cartEl.PRODUCT.ID == product.ID);
    }
    
    if(existente){
      existente.AMOUNT = +existente.AMOUNT + +amount;

      console.log(typeof existente.AMOUNT)
      console.log(typeof amount)
    }
    else{
      let newCartElement: CartElement = {
        BOOK_ID: book.ID,
        ISBN: book.ISBN,
        TITLE: book.TITLE,
        PRODUCT: product,
        AMOUNT: amount
      }
     
      carro.push(newCartElement);
    }
    

    localStorage.setItem("cart", JSON.stringify(carro));
  }

  updateCart(carro: CartElement[]){
    localStorage.setItem("cart", JSON.stringify(carro));
  }

  vaciar(){
    localStorage.removeItem("cart");
  }

  comprar(){
    let carro: CartElement[] = JSON.parse(localStorage.getItem("cart")); 
    
  }
}