import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BookStoreService } from 'src/app/shared/services/book-store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  books;

  constructor(public bookStoreService: BookStoreService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.bookStoreService.books$.subscribe(response => {
      this.books = response;
    })
  }

  getCoverImage(cover :string) {
    if(cover){
      return this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/covers/' + cover);
    }
  }
}
