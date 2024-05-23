import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  studentId: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      roll: ['', Validators.required],
      section: ['', Validators.required],
      studentClass: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      subjects: this.fb.array([])
    });
    this.studentId = 0; // Initialize with a default value
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.studentId = +id;
        this.studentService.getStudentById(this.studentId).subscribe(student => {
          this.studentForm.patchValue(student);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.isEditMode) {
        this.studentService.updateStudent(this.studentId, this.studentForm.value).subscribe(() => {
          this.router.navigate(['/students']);
        });
      } else {
        this.studentService.addStudent(this.studentForm.value).subscribe(() => {
          this.router.navigate(['/students']);
        });
      }
    }
  }
}
