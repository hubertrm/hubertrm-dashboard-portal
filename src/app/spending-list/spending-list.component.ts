import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {Spending} from './model/spending.interface';
import {SpendingListService} from './service/spending-list.service';
import {SortableHeaderDirective, SortEvent} from './sortable-header.directive';

@Component({
  selector: 'app-spending-list',
  templateUrl: './spending-list.component.html',
  styleUrls: ['./spending-list.component.scss']
})
export class SpendingListComponent implements OnInit {

  spendingList$: Observable<Array<Spending>>;
  total$: Observable<number>;
  header = ['spendingDate', 'amount', 'categoryId', 'accountId', 'note'];

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor(public spendingListService: SpendingListService) {
    this.spendingList$ = spendingListService.spendingList$;
    this.total$ = spendingListService.total$;
  }

  ngOnInit() {
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.spendingListService.sortColumn = column;
    this.spendingListService.sortDirection = direction;
  }
}
