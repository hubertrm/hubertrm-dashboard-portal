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

  onDateSelect(value: Date) {
    console.log(value.toISOString());
    console.log(value.toLocaleDateString());
    console.log(value.toLocaleTimeString());
    console.log(value.toLocaleString());
    this.table.filter(value.toLocaleDateString(), 'spendingDate', 'equals')
  }

  onCategoryChange(event) {
    this.table.filter(event.value.map(category => category.id), 'categoryId', 'in');
  }

  onAccountChange(event) {
    this.table.filter(event.value.map(account => account.id), 'accountId', 'in');
  }

  onNoteChange(event) {
    this.table.filter(event.target.value, 'note', 'contains');
  }
}
