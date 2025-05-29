import type { DepartmentModel, SemesterData } from "./db";

export interface Student {
  id: string;
  user_id: string;
  email: string;
  name: string;
  department: DepartmentModel;
  current_semester: number;
  semesters?: SemesterData[];
}