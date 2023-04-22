import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  view: String = 'price';

  constructor() {}
  ngOnInit(): void {}

  onDisplay(item: String) {
    this.view = item;
  }
}
