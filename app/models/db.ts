// --- File Metadata Model ---
export interface FileModel {
  id: string;
  sha256: string;
  file_size: number;
  name: string;
  path: string;
}

// --- Department and Subject Models ---
export interface DepartmentModel {
  _id: string;
  code: string;
  name: string;
}

export interface SubjectModel {
  _id: string;
  code: string;
  name: string;
  semester: number;
  department_id: string;
}

// --- Criteria and Content Types ---
export interface Criteria {
  id: number;
  desc: string;
  minimum?: number;
  maximum: number;
  given?: number;
  strict: boolean;
}

export interface QuizQuestion {
  Question: string;
  Option: Record<string, string>;
  Ans: string;
}

export interface Quiz {
  question_file?: FileModel;
  questions: QuizQuestion[];
  minimum: number;
}

export interface Presentation {
  criteria: Criteria[];
}

export interface Practical {
  criteria: Criteria[];
}

export interface Assignment {
  maximum: number;
  minimum: number;
}

export interface SubQuiz {
  ans: string[];
}

export interface SubPractical {
  student: Criteria[];
  faculty: Criteria[];
}

export type TaskContent = Quiz | Presentation | Practical | Assignment;
export type SubmissionContent = SubQuiz | SubPractical;
// --- Submission Model ---
export interface Submission {
  student_id: string;
  student_name: string;
  roll_no: string;
  evaluation_id: string; // Unique ID for the evaluation
  submitted_at: string; // ISO string format
  is_pass: boolean;
  obtained: number;
  content: SubmissionContent; // Content of the submission
  feedback?: string;
}

// --- Task Model ---
export interface TaskModel {
  _id?: string;
  faculty_id: string;
  faculty_name: string;
  department: DepartmentModel;
  subject: SubjectModel;
  semester: number;
  tag: string;
  type: string;
  term: number;
  title: string;
  description: string;
  created_at: string; // ISO string
  support_file_id?: string;
  support_file?: FileModel;
  content: TaskContent;
  is_pass: boolean;
  total: number;
  obtained?: number;
  feedback?: string;
  submissions: Submission[];
}

// --- User Model ---
export interface User {
  _id?: string;
  email: string;
  name: string;
  password: string;
  role: "student" | "faculty";
}

// --- Faculty Model ---
export interface Faculty {
  id: string;
  user_id: string;
  email: string;
  name: string;
  departments: DepartmentModel[];
  subjects: SubjectModel[];
}

// --- Student Model with Semester History ---
export interface SemesterTask {
  _id: string;
  task_title: string;
  subject_code: string;
  type: string;
  submitted: boolean;
  evaluated: boolean;
  marks?: number;
  feedback?: string;
}

export interface SemesterData {
  semester: number;
  subjects: SubjectModel[];
  tasks: SemesterTask[];
}

export interface Student {
  _id?: string;
  user_id: string;
  email: string;
  name: string;
  department: DepartmentModel;
  current_semester: number;
  semesters: SemesterData[];
}
