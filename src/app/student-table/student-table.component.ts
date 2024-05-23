import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  students: Student[] = [];
  page = 0;
  size = 10;
  totalPages: number = 0; // Initialize with a default value

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudentsPagi(this.page, this.size)
      .subscribe((response: any) => {
        console.log(response); // Log the response to inspect its structure
        this.students = response.content;
        this.totalPages = response.totalPages;
      });
}

  changePageSize(size: number): void {
    this.size = size;
    this.loadStudents();
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadStudents();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadStudents();
    }
  }
}
