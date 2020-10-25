import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {SpendingService} from './service/spending.service';
import {Spending} from './model/spending.interface';
import {Category} from './model/category.interface';
import {Account} from './model/account.interface';

@Component({
  selector: 'app-spending-table',
  templateUrl: './spending-table.component.html',
  styleUrls: ['./spending-table.component.scss']
})
export class SpendingTableComponent implements OnInit {

  selectedSpendingList: Spending[];

  spendingList: Spending[];
  categoryList: Category[];
  accountList: Account[];
  columns: any[];

  paginator = true;
  rows = 10;
  showCurrentPageReport = true;
  rowsPerPageOption = [10,25,50];

  globalFilterFields = ['id', 'amount', 'category', 'account', 'note']
  loading = true;

  @ViewChild('dt') table: Table;

  constructor(private spendingService: SpendingService) { }

  ngOnInit(): void {
    this.spendingService.getAllSpendings().then(spendingList => {
      this.spendingList = spendingList
      this.loading = false;
    });

    this.spendingService.getAllCategories().then(categoryList => this.categoryList = categoryList);
    this.spendingService.getAllAccounts().then(accountList => this.accountList = accountList);

    this.columns = [
      { field: 'id', header: '#'},
      { field: 'spendingDate', header: 'Date'},
      { field: 'amount', header: 'Amount'},
      { field: 'categoryId', header: 'Category'},
      { field: 'accountId', header: 'Source'},
      { field: 'note', header: 'Comment'},
    ];
  }

  onDateSelect(value: Date): void {
    this.table.filter(this.formatDate(value), 'spendingDate', 'contains')
  }

  formatDate(date) {
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    console.log(date.getFullYear() + '-' + month + '-' + day);
    return date.getFullYear() + '-' + month + '-' + day;
  }

  onCategoryChange(event): void {
    this.table.filter(event.value.map(category => category.id), 'categoryId', 'in');
  }

  onAccountChange(event): void {
    this.table.filter(event.value.map(account => account.id), 'accountId', 'in');
  }

  onNoteChange(event): void {
    this.table.filter(event.target.value, 'note', 'contains');
  }
}
