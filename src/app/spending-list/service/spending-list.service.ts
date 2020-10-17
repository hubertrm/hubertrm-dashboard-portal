import { Injectable } from '@angular/core';
import {RemoteService} from '../../services/remote.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Spending} from '../model/spending.interface';
import {SortColumn, SortDirection} from '../sortable-header.directive';
import {debounceTime, delay, map, share, switchMap, tap} from 'rxjs/operators';

interface SearchResult {
  spendingList: Array<Spending>;
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (value1: string | number, value2: string | number) => value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

function sort(spendingList: Array<Spending>, column: SortColumn, direction: SortDirection): Spending[] {
  if (direction === '' || column === '') {
    return spendingList;
  } else {
    return [...spendingList].sort((spending1, spending2) => {
        const res = compare(spending1[column], spending2[column]);
        return direction === 'asc' ? res : -res;
      })
  }
}

@Injectable({
  providedIn: 'root'
})
export class SpendingListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _spendingList$ = new BehaviorSubject<Array<Spending>>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private remoteService: RemoteService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false)),
    ).subscribe(result => {
      this._spendingList$.next(result.spendingList);
      this._total$.next(result.total);
    })

    this._search$.next();
  }

  get spendingList$() { return this._spendingList$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }

  get page() { return this._state.page; }
  set page(page: number) { this._set({page}); }

  get pageSize() { return this._state.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }

  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page } = this._state;
    let total = 0;
    return this.remoteService.getAllSpendings().pipe(
      share(),
      tap(spendings => total = spendings.length),
      map(spendings => sort(spendings, sortColumn, sortDirection)),
      map(spendings => spendings.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)),
      map(spendings => ({ spendingList: spendings, total })),
    );
  }
}
