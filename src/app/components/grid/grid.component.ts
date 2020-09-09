import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
  @Input() data;
  @Output() eventTriggered = new EventEmitter();
  @Input() perPageItem;
  totalPage;
  currentData;
  currentPage = 0;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.data) {
      this.currentPage = 0;
      this.totalPage = Math.floor(this.data.length / this.perPageItem);
      this.pageChanges(this.currentPage);
    }
  }

  pageChanges(page) {
    console.log(page);
    this.currentPage = page;
    console.log(this.currentPage * this.perPageItem, this.perPageItem);
    const startIndex = this.currentPage * this.perPageItem;
    this.currentData = this.data.slice(startIndex, startIndex + this.perPageItem);
  }

  onClick(item) {
    this.eventTriggered.emit({ action: 'preview', id: item.id });
  }
}
