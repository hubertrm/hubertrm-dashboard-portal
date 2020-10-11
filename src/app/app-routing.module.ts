import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpendingListComponent} from "./spending-list/spending-list.component";


const routes: Routes = [
  {
    path: 'spending-list', component: SpendingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
