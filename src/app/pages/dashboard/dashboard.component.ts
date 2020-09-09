import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isFilterOpened = false;
  allowedFilterItems = {
    category: 'category',
    colors: 'colors',
    price: 'price'
  };
  data = null;
  filteredData = null;
  perPageItem = 6;
  constructor(private helperService: HelperService, private router: Router) { }

  ngOnInit() {
    this.fetchData();
  }

  public fetchData() {
    this.helperService.fetchData().subscribe((res) => {
      this.data = res;
      this.initializeFilteredData();
    });
  }

  filterData(filterGroups) {
    if (!filterGroups || !filterGroups.length) {
      this.initializeFilteredData();
    } else {

      this.filteredData = this.data.filter((item) => {
        let flagCount = 0;
        for (const filterItem of filterGroups) {
          if (filterItem.groupName === this.allowedFilterItems.price) {
            if (item[this.allowedFilterItems.price].amount <= filterItem.items[0].max &&
              item[this.allowedFilterItems.price].amount >= filterItem.items[0].min) {
              flagCount++;
            }
          } else if (filterItem.groupName === this.allowedFilterItems.colors) {
            for (const value of filterItem.items) {
              if (item[this.allowedFilterItems.colors].includes(value.name)) {
                flagCount++;
                break;
              }
            }
          } else {
            console.log(filterItem.items)
            for (const value of filterItem.items) {
              if (item[filterItem.groupName] === value.name) {
                flagCount++;
                break;
              }
            }
          }
        }
        console.log(flagCount, filterGroups.length);
        if (flagCount === filterGroups.length) {
          return item;
        }
      });
    }
  }
  initializeFilteredData() {
    this.filteredData = JSON.parse(JSON.stringify(this.data));
  }

  gridEvent(event) {
    if (event.action === 'preview') {
      this.preview(event.id);
    }
  }

  preview(id) {
    this.router.navigate(['/preview/' + id]);

  }

  navigate(link) {
    console.log(link)
    this.router.navigate(['/']);
  }
}
