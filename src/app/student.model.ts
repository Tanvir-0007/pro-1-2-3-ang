export interface Student {
  id?: number;
  name: string;
  roll: string;
  section: string;
  studentClass: string;
  email: string;
  dateOfBirth: string;
  subjects: Subject[];
}

export interface Subject {
  id?: number;
  name: string;
}

export interface PaginatedStudents {
  content: Student[];
  totalPages: number;
}
