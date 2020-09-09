import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalPage;
  @Input() currentPage;
  @Output() pageChange = new EventEmitter();
  pages;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.totalPage) {
      this.pages = new Array(this.totalPage);
      for (let index = 0; index < this.totalPage; index++) {
        this.pages[index] = index + 1;
      }
    }
  }

  pageEvent(page) {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

}
