import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartElement } from 'src/app/shared/models/CartElement';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carro: CartElement[];

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem("cart")){
      this.carro = JSON.parse(localStorage.getItem("cart"));
    }else{
      this.carro = [];
    }
  }

  eliminar(linea: CartElement){
    this.carro = this.carro.filter(line => line.PRODUCT.ID != linea.PRODUCT.ID);
    this.cartService.updateCart(this.carro);
  }

  finalizarCompra(){
    const body = {
      cart : []
    }
    this.carro.forEach(line => {
      body.cart.push({
        PRICE: line.PRODUCT.PRICE,
        AMOUNT: line.AMOUNT,
        PRODUCT_ID: line.PRODUCT.ID
      })
    })

    this.http.post(environment.api + '/purchase', body)
    .subscribe()
    

    this.vaciar();
  }

  vaciar(){
    this.carro = [];
    this.cartService.vaciar();
  }

  total(){
    return this.carro.map(el => el.PRODUCT.PRICE * el.AMOUNT).reduce((acc, next) => acc + next);
  }
}
