import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() allowedFilterItems;
  @Output() filterAppliedEmitter = new EventEmitter();
  value = 100;
  highValue = 200;
  options = null;
  filterGroupObject = {
  };

  min = 0;
  max = 0;

  ready = false;
  expand = {};
  appliedFilter = {};
  enabledFilter = [];
  filterGroups = [];
  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.data) {
      this.data.forEach(item => {
        Object.keys(this.allowedFilterItems).forEach((filterItem) => {
          if (!this.filterGroupObject[filterItem]) {
            this.filterGroupObject[filterItem] = [];
          }
          if (filterItem === 'price') {
            console.log(item[filterItem]);
            this.min = Math.min(this.min, item[filterItem].amount);
            this.max = Math.max(this.max, item[filterItem].amount);
          } else {

            if (typeof item[filterItem] === 'string') {
              this.filterGroupObject[filterItem].push(item[filterItem]);
            } else {
              this.filterGroupObject[filterItem].push(...item[filterItem]);
            }
          }
        });
      });
      this.filterGroups = [];
      Object.keys(this.filterGroupObject).forEach((key) => {
        this.filterGroupObject[key] = Array.from(new Set(this.filterGroupObject[key]));
        this.expand[key] = false;
        this.filterGroups.push({
          groupName: key,
          items: this.filterGroupObject[key].map((item) => {
            return {
              selected: key === 'price' ? true : false,
              name: item
            };
          })
        });
      });

      setTimeout(() => {
        this.options = {
          floor: this.min,
          ceil: this.max,
          step: Math.round(this.max / 100)
        };
        this.value = this.min;
        this.highValue = this.max;
        this.ready = true;
      }, 10);

      console.log(this.filterGroups, this.min, this.max);
    }
  }

  changesMade(event) {
    this.filterApplied('price', { min: event.value, max: event.highValue });
  }

  filterApplied(category, value) {
    this.filterGroups.forEach((group) => {
      if (group.groupName === 'price') {
        group.items = [
          {
            min: this.value,
            max: this.highValue,
            selected: true
          }
        ];
      }
    });
    const tempGroups = JSON.parse(JSON.stringify(this.filterGroups));

    const selectedFilters = tempGroups.filter((groups) => {
      const items = groups.items.filter((item) => item.selected);
      groups.items = items;
      if (items.length) {
        return true;
      }
    });
    console.log(selectedFilters);


    this.filterAppliedEmitter.emit(selectedFilters);
  }
}
