import { useParams } from "react-router";
import { useState } from "react";
import PracticalEval from "./practical.view";
import QuizeList from "./quiz.view";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "~/utils/fetcher";
import { api } from "~/conf/url";
import type { TaskModel } from "~/models/db";
import style from "./task.module.css";

function RenderTask() {
    const { type } = useParams()

    if (type == "quiz") {
        return <QuizeList />
    } else if (type == "practical") {
        return <PracticalEval />
    }
}

function fetchTask<T>(id: string) {
    const { data, error, isLoading } = useSWRImmutable<T>(`${api}/task/${id}`, fetcher)

    return {
        task: data,
        error, isLoading
    }
}


export default function FacultyTaskDetails() {
    const { type, taskId } = useParams();
    const { task, error, isLoading } = fetchTask<TaskModel>(taskId!!)
    const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
    const [marks, setMarks] = useState<Record<string, Record<string, number>>>({});
    const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

    if (!task) return <p className="text-red-500">Task not found</p>;


    const handleMarkChange = (studentId: string, criteriaId: string, value: number) => {
        setMarks((prev) => ({
            ...prev,
            [studentId]: { ...prev[studentId], [criteriaId]: value }
        }));
    };

    const handleFeedbackChange = (studentId: string, value: string) => {
        setFeedbacks((prev) => ({ ...prev, [studentId]: value }));
    };

    return (
        <div className={style.taskContainer}>
            <div className={style.taskDetails}>
                <h3 className={style.taskTitle}>{task.title}</h3>
                <p>Type: {task.type}</p>
                <p>Department: {task.department.name}</p>
                <p>Semester: {task.semester}</p>
            </div>
            <RenderTask />
        </div>
    );

}
