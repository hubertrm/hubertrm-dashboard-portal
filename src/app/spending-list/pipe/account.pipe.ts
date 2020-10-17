import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountListService} from '../service/account-list.service';

@Pipe({name: 'account'})
export class AccountPipe implements PipeTransform {

  constructor(private accountListService: AccountListService) {
  }

  transform(id: number, ...args): Observable<string> {
    return this.accountListService.accounts$.pipe(
      map(accountList => accountList.find(account => account.id === id).name)
    )
  }
}
