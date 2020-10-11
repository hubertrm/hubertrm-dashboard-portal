import { Injectable } from '@angular/core';
import {RemoteService} from "../../services/remote.service";
import {Observable} from "rxjs";
import {Spending} from "../model/spending.interface";

@Injectable({
  providedIn: 'root'
})
export class SpendingListService {

  constructor(private remoteService: RemoteService) { }

  getAllSpendings(): Observable<Array<Spending>> {
    return this.remoteService.getAllSpendings();
  }
}
