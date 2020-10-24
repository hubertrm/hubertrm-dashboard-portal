import { Injectable } from '@angular/core';
import {RemoteService} from '../../../services/remote.service';
import {Spending} from '../model/spending.interface';
import {Category} from '../model/category.interface';
import {Account} from '../model/account.interface';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  constructor(private remoteService: RemoteService) { }

  getAllSpendings(): Promise<Spending[]> {
    return this.remoteService.getAllSpendings().toPromise();
  }

  getAllCategories(): Promise<Category[]> {
    return this.remoteService.getAllCategories().toPromise();
  }

  getAllAccounts(): Promise<Account[]> {
    return this.remoteService.getAllAccounts().toPromise();
  }
}
