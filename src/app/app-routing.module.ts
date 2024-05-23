import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { StudentSearchComponent } from './student-search/student-search.component';

const routes: Routes = [
  { path: 'students', component: StudentTableComponent },
  { path: 'students/new', component: StudentComponent },
  { path: 'students/edit/:id', component: StudentComponent },
  { path: 'students/search', component: StudentSearchComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
