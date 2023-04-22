import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { PricesService } from '../../prices.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css'],
})
export class PricesComponent implements OnInit {
  dieselPrice: number = 30;

  constructor(
    private priceService: PricesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.priceService.getDieselPrice().subscribe((v) => {
      this.dieselPrice = v;
      this.cdr.detectChanges();
    });
  }
}
