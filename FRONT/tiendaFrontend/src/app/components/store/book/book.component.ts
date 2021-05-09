import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Author } from 'src/app/shared/models/Author';
import { Book } from 'src/app/shared/models/Book';
import { User } from 'src/app/shared/models/User';
import { BookStoreService } from 'src/app/shared/services/book-store.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { LoginDialogComponent } from '../../navbar/dialogs/login-dialog/login-dialog.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ])
  ]
})
export class BookComponent implements OnInit {

  maxAmount = 10;
  amountArray;
  default = 1;

  book: Book;
  author: Author;
  logedUser: User;

  message: string;


  constructor(
    private route: ActivatedRoute,
    private bookStoreService: BookStoreService, 
    private sanitizer: DomSanitizer,
    public auth: AuthService,
    private dialog: MatDialog,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.bookStoreService.getBook(this.route.snapshot.paramMap.get("id"))
    .subscribe((res: Book) => {
      this.book = res;
      this.bookStoreService.getAuthor(this.book.AUTHOR_ID)
      .subscribe((aut: Author) => {
        this.author = aut;
      })
    });

    this.auth.user$.subscribe(user => this.logedUser = user)

  }

  getCoverImage() {
    if(this.book.COVER)
      return this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/covers/' + this.book.COVER);
  }

  openLogin(){
    this.dialog.open(LoginDialogComponent);
  }

  addToCart(product, f: NgForm){
    this.cartService.addToCart(this.book, product, f.value.cantidad);
    this.message = "Producto añadido al carro correctamente!";
    setTimeout(()=>{
      this.message = null;
    }, 3000)
  }
}
