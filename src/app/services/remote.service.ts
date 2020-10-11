import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Spending } from "../spending-list/model/spending.interface";

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  readonly SPENDING_URL = 'http://localhost:8080/api/v1/spendings'

  constructor(private httpClient: HttpClient) {
  }

  getAllSpendings(): Observable<Array<Spending>> {
    return this.httpClient.get<Array<Spending>>(this.SPENDING_URL);
  }
}
