
export interface Subject {
    _id: string
    name: string
    code: string
    semester: number
    department_id: string
}

export interface Department {
    _id: string
    name: string
    code: string
}

export interface FacultyData {
    _id: string;
    user_id: string
    name: string;
    departments: Department[];
    subjects: Subject[];
}

export interface TaskData {
    type: string;
    department_id: string;
    semester: number;
    subject_id: string;
    tag: string;
    support_file_id?: string;
    title: string;
    description: string;
    content: any;
}