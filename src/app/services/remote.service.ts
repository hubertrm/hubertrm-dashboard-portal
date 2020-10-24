import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spending } from '../components/spending-table/model/spending.interface';
import { Category } from '../components/spending-table/model/category.interface';
import { Account } from '../components/spending-table/model/account.interface';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  readonly SPENDING_URL = 'http://localhost:8080/api/v1/spendings'
  readonly CATEGORY_URL = 'http://localhost:8080/api/v1/categories'
  readonly ACCOUNT_URL = 'http://localhost:8080/api/v1/accounts'

  constructor(private httpClient: HttpClient) {
  }

  getAllSpendings(): Observable<Array<Spending>> {
    return this.httpClient.get<Array<Spending>>(this.SPENDING_URL);
  }

  getAllCategories(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(this.CATEGORY_URL);
  }

  getAllAccounts(): Observable<Array<Account>> {
    return this.httpClient.get<Array<Account>>(this.ACCOUNT_URL);
  }
}
