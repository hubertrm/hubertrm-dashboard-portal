import {Pipe, PipeTransform} from '@angular/core';
import {CategoryListService} from '../service/category-list.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Pipe({name: 'category'})
export class CategoryPipe implements PipeTransform {

  constructor(private categoryListService: CategoryListService) {
  }

  transform(id: number, ...args): Observable<string> {
    return this.categoryListService.categories$.pipe(
      map(categoryList => categoryList.find(category => category.id === id).name)
    )
  }
}
