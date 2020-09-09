import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  @Output() filterOpened = new EventEmitter();
  @Output() linkClickedEvent = new EventEmitter();

  links = [{
    name: 'home'
  },
  {
    name: 'shop'
  }, {
    name: 'magazine'
  }];
  constructor() { }

  ngOnInit() {
  }

  filterToggle() {
    this.filterOpened.emit();
  }

  linkClicked(link) {
    console.log(link)
    this.linkClickedEvent.emit(link);
  }
}
