import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { CardComponent } from './components/card/card.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { GridComponent } from './components/grid/grid.component';
import { RatingComponent } from './components/rating/rating.component';
import { Ng5SliderModule } from 'ng5-slider';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    CardComponent,
    AppBarComponent,
    DashboardComponent,
    PreviewComponent,
    GridComponent,
    RatingComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng5SliderModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
