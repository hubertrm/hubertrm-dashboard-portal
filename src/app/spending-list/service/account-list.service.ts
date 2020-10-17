import { Injectable } from '@angular/core';
import {RemoteService} from '../../services/remote.service';
import {Observable} from 'rxjs';
import {Account} from '../model/account.interface';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountListService {
  accounts$ = new Observable<Array<Account>>();

  constructor(private remoteService: RemoteService) {
    this.accounts$ = this.remoteService.getAllAccounts().pipe(share());
  }
}
