import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Task1Component } from './task1/task1.component';
import { Task2Component } from './task2/task2.component';

const routes: Routes = [
  { path: 'task1', pathMatch: 'full', component: Task1Component },
  { path: 'task2', pathMatch: 'full', component: Task2Component },
  { path: '**', pathMatch: 'full', redirectTo: 'task1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
