import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormClass } from '../../form-class';
import { PricesService } from '../../prices.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DecimalPipe],
})
export class FormComponent implements OnInit {
  form!: FormClass;

  @Output() formEvent = new EventEmitter<number>();

  constructor(
    private priceService: PricesService,
    private decimalPipe: DecimalPipe
  ) {}

  async ngOnInit() {
    this.form = new FormClass();

    const [dollarExchangeResult, dieselPriceResult] = await Promise.all([
      this.priceService.getDollarExchange(this.getDate()),
      this.priceService.getDieselPriceByDate(this.getDate()),
    ]);

    this.form.taux = +(
      this.decimalPipe.transform(dollarExchangeResult, '1.2-2') || 0
    );
    this.form.cotation = dieselPriceResult;

    this.calculePrice();
  }

  calculePrice() {
    this.priceService.setDieselPrice = this.form.calcule();
  }

  getDate(): Date {
    const dayInThePast = 15;
    const currentDate = new Date(); // get the current date
    const beforeXDays = new Date(
      currentDate.getTime() - dayInThePast * 24 * 60 * 60 * 1000
    ); // subtract 15 days (in milliseconds)
    console.log(beforeXDays);
    return beforeXDays;
  }
}
