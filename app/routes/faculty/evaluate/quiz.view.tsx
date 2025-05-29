import { useParams } from "react-router";
import useSWRImmutable from "swr/immutable";
import { api } from "~/conf/url";
import type { DepartmentModel, Student, SubjectModel } from "~/models/db";
import { fetcher } from "~/utils/fetcher";
import style from "./task.module.css";
export interface Submission {
    student_id: string;
    student_name: string;
    roll_no: string
    evaluation_id: string;
    submitted_at: string;
    obtained: number;
    feedback: string;
}

interface TaskResponse {
    _id: string;
    type: string;
    title: string;
    description: string;
    total: number;
    department: DepartmentModel;
    subject: SubjectModel;
    submissions: Submission[];
}


function fetchStudents<T>(taskId: string) {
    const { data, error, isLoading } = useSWRImmutable<T>(`${api}/task/${taskId}/submission`, fetcher);

    return {
        result: data,
        error,
        isLoading
    }
}


export default function QuizeList() {
    const { taskId } = useParams();
    const { result, error, isLoading } = fetchStudents<TaskResponse>(taskId!!);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading students</div>;

    return (
        <div className={style.studentList}>
            <h4 className={style.sectionTitle}>Students</h4>
            <ul>
                {result?.submissions?.map((student) => (
                    <li key={student.student_id} className={style.studentCard}>
                        <div className={style.studentHeader}>
                            <span>
                                {student.student_name} ({student.student_id})
                            </span>
                            <span>Roll No: {student.roll_no}</span>
                            <span>Marks: {student.obtained}/{result.total}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

}