import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Author } from '../models/Author';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService{

  books$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(null);
  authors$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>(null);

  constructor(private http: HttpClient) { 
    this.http.get<any>(environment.api + "/books")
    .subscribe(books => {
      this.books$.next(books);
    });
  }
  
  getBook(id){
    return this.http.get(environment.api + "/books/" + id)
  }

  getAuthor(id: number){
    return this.http.get(environment.api + "/authors/" + id);
  }

  getPurchases(){
    return this.http.get(environment.api + "/purchase/all");
  }
}
