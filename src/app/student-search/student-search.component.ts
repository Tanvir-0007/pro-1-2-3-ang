import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements OnInit {
  searchControl = new FormControl();
  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(name => {
        if (name.length >= 3) {
          return this.studentService.searchStudents(name);
        } else {
          return [];
        }
      })
    ).subscribe(data => {
      this.students = data;
    });
  }
}
