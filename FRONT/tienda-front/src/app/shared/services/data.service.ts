import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Author } from '../models/Author';
import { Book } from '../models/Book';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _books: Book[];
  authors: Author[];

  $filter: Subject<any> = new Subject<any>();

  get books(): Book[]{
    return this._books;
  }
  set books(books: Book[]){
    this._books = books;
  }

  constructor(private http: HttpClient) { 
    this.authors = [];
  }

  getAuthor(authorID: number): Observable<Author>{
    let found = this.authors.find(author => author.ID === authorID);
    if(found){
      return from([found]);
    }else{
      return this.http.get<Author>(`${environment.api}/authors/${authorID}`).pipe(tap(aut => {
        //console.log(aut);
        this.authors.push(aut)
      }));
    }
  } 

  getAvailableBooks(){
    return this._books.filter(book => book.PRODUCTS.length > 0);
  }

}
