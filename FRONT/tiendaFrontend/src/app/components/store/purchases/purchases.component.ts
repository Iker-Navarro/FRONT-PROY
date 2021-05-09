import { Component, OnInit } from '@angular/core';
import { BookStoreService } from 'src/app/shared/services/book-store.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  purchases;

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit(): void {
    this.bookStoreService.getPurchases().subscribe(console.log)
    this.bookStoreService.getPurchases().subscribe(res => this.purchases = res)
  }

}
