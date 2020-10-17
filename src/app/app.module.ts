import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpendingListComponent } from './spending-list/spending-list.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {SortableHeaderDirective} from './spending-list/sortable-header.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CategoryPipe} from './spending-list/pipe/category.pipe';
import { AccountPipe } from './spending-list/pipe/account.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SpendingListComponent,
    SortableHeaderDirective,
    CategoryPipe,
    AccountPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
