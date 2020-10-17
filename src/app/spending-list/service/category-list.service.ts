import { Injectable } from '@angular/core';
import {RemoteService} from '../../services/remote.service';
import {Observable} from 'rxjs';
import {Category} from '../model/category.interface';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryListService {
  categories$ = new Observable<Array<Category>>();

  constructor(private remoteService: RemoteService) {
    this.categories$ = this.remoteService.getAllCategories().pipe(share());
  }
}
