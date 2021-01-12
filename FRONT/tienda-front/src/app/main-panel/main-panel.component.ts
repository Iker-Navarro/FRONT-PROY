import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../shared/models/Book';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  books: Book[];

  constructor(private http: HttpClient, public dataService: DataService) { }

  ngOnInit(): void {
    this.http.get<any>(environment.api + "/books")
    .subscribe((res)=>{
      this.dataService.books = res;
      this.books = this.dataService.getAvailableBooks(); 
      
      this.dataService.$filter.subscribe((cat_id) => {
        this.books = this.dataService.getAvailableBooks()
          .filter(book => book.CATEGORY_ID == cat_id);
      })
    });

   
  }


  

}
