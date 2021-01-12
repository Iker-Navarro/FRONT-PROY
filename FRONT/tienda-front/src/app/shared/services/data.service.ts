import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Author } from '../models/Author';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _books: Book[];
  authors: Author[];

  get books(): Book[]{
    return this._books;
  }
  set books(books: Book[]){
    this._books = books;
    // let uniqueAuthors = [...new Set(this._books.map(book => book.AUTHOR_ID))];
    
    // uniqueAuthors.forEach(author => this.addAuthor(author))
    // this.http.get<Author[]>(`${environment.api}/authors`).subscribe(data => {
    //   console.log(data)
    //   this.authors = data
    // });
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

}
