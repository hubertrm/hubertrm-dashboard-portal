import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Spending} from "./model/spending.interface";
import {SpendingListService} from "./service/spending-list.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-spending-list',
  templateUrl: './spending-list.component.html',
  styleUrls: ['./spending-list.component.scss']
})
export class SpendingListComponent implements OnInit {

  spendingList: Observable<Array<Spending>>;
  header = ['Date', 'Montant', 'Categorie', 'Compte', 'Commentaire'];

  page = 1;
  pageSize = 4;

  constructor(private spendingListService: SpendingListService) { }

  ngOnInit() {
    this.spendingList = this.spendingListService.getAllSpendings();
  }

  refreshCountries(): Observable<Array<any>> {
    return this.spendingList.pipe(
      map((spending, i) => ({id: i + 1, ...spending})),
      map((spending) => spending.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize))
    );
  }
}
