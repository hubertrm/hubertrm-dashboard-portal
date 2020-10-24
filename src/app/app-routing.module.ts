import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpendingTableComponent} from './components/spending-table/spending-table.component';


const routes: Routes = [
  {
    path: '', component: SpendingTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
