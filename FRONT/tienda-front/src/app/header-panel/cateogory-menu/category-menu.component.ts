import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/Category';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  categories: Category[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(environment.api + "/categories")
    .subscribe((res: Category[])=>{
      this.categories = res;
    })
  }

}
