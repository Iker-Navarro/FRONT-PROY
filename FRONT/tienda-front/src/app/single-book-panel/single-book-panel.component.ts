import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../shared/models/Book';

@Component({
  selector: 'app-single-book-panel',
  templateUrl: './single-book-panel.component.html',
  styleUrls: ['./single-book-panel.component.scss']
})
export class SingleBookPanelComponent implements OnInit {

  @Input() loadedBook: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
