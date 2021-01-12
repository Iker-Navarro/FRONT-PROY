import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Author } from 'src/app/shared/models/Author';
import { Book } from 'src/app/shared/models/Book';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  author: any = { ID: -1, NAME: 'loading', DESCRIPTION: 'loading' };
  url: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService
      .getAuthor(this.book.AUTHOR_ID)
      .pipe(tap((auth) => (this.author = auth)))
      .subscribe((auth) => (this.author = auth));
    this.url = this.getCoverImage();
  }

  getCoverImage() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'http://localhost:5000/covers/' + this.book.COVER
    );
  }
}
