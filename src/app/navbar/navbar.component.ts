import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Output() navBarEvent = new EventEmitter<String>();
  item!: String;

  diplay(aview: String) {
    this.item = aview;
    this.navBarEvent.emit(this.item);
  }
}
