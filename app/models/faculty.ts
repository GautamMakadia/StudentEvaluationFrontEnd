import type { DepartmentModel, SubjectModel } from "./db";

export interface Faculty {
  id: string;
  user_id: string;
  email: string;
  name: string;
  departments: DepartmentModel[];
  subjects: SubjectModel[];
}