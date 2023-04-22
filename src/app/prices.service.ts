import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  // declares that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class PricesService {
  err: any;
  root: string = 'https://carburant-backend-wbx6z537ha-ew.a.run.app';
  //root: string = 'http://localhost:8080';

  private dieselPriceSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private http: HttpClient) {}

  set setDieselPrice(value: number) {
    this.dieselPriceSubject.next(value);
  }
  getDieselPrice(): Observable<number> {
    return this.dieselPriceSubject.asObservable();
  }

  private extractData(res: {date:string,price:number}): any {
    let date = res.date;
    let price = res.price;
    return price;
  }

  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  getDollarExchange(date: Date) {
    var myHeaders = new Headers();
    myHeaders.append('apikey', 'nh2YsXz06ahO983UGvM22XWJh2WUxHQM');

    var requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    let dateString = date.toISOString().split('T')[0];
    let endpoint = this.root + '/api/v1/rate?date=' + dateString;

    return fetch(endpoint, requestOptions)
      .then((response) => response.json())
      .then((result) => this.extractData(result))
      .catch((error) => 0);
  }

  getDieselPriceByDate(date: Date) {
    let dateString = date.toISOString().split('T')[0];

    let endpoint = this.root + '/api/v1/diesel?date=' + dateString;

    var requestOptions: RequestInit = {
      method: 'GET',
    };
    return fetch(endpoint, requestOptions)
      .then((response) => response.json())
      .then((result) => this.extractData(result))
      .catch((error) => 0);
  }
}
