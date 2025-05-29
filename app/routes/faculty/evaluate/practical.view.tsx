import { useState } from "react";
import { useParams } from "react-router";
import useSWRImmutable from "swr/immutable";
import { api } from "~/conf/url";
import type { SubPractical, TaskModel } from "~/models/db";
import { fetcher } from "~/utils/fetcher";
import styles from "./task.module.css";

function fetchSubmissions<T>(taskId: string) {
    const { data, error, isLoading } = useSWRImmutable<T>(
        `${api}/task/${taskId}/submission`,
        fetcher
    );
    return {
        task: data,
        error,
        isLoading,
    };
}

export default function PracticalEval() {
    const { taskId } = useParams();
    const { task, error, isLoading } = fetchSubmissions<TaskModel>(taskId!!);
    const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
    const [marks, setMarks] = useState<Record<string, Record<string, number>>>({});
    const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

    const handleMarkChange = (studentId: string, criteriaId: number, value: number) => {
        setMarks((prev) => ({
            ...prev,
            [studentId]: { ...prev[studentId], [criteriaId]: value },
        }));
    };

    const handleFeedbackChange = (studentId: string, value: string) => {
        setFeedbacks((prev) => ({ ...prev, [studentId]: value }));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error loading task</div>;
    if (!task || task.type !== "practical") return <div className="text-red-500">Invalid task type</div>;

    return (
        <div className={styles.container}>
            <h4 className="text-lg font-semibold text-gray-800">Students</h4>
            <ul className={styles.studentList}>
                {task.submissions.map((sub) => (
                    <li key={sub.student_id} className={styles.studentCard}>
                        <div
                            className={styles.headerRow}
                            onClick={() =>
                                setExpandedStudentId((prev) =>
                                    prev === sub.student_id ? null : sub.student_id
                                )
                            }
                        >
                            <div className={styles.studentName}>
                                {sub.student_name} ({sub.roll_no})
                            </div>
                            <div className={styles.studentMarks}>
                                Marks: {sub.obtained}/{task.total}
                            </div>
                            <div className={styles.submittedAt}>
                                Submitted: {new Date(sub.submitted_at).toLocaleString()}
                            </div>
                            <div
                                className={sub.is_pass ? styles.statusPass : styles.statusFail}
                            >
                                {sub.is_pass ? "Passed" : "Failed"}
                            </div>
                            <div className={styles.toggleArrow}>
                                {expandedStudentId === sub.student_id ? "▲" : "▼"}
                            </div>
                        </div>

                        {expandedStudentId === sub.student_id && (
                            <>
                                <hr className="my-3" />
                                <div className="space-y-4">
                                    <div className={styles.feedbackRow}>
                                        <strong>Student Feedback:</strong>
                                        <span>{sub.feedback || "No feedback provided"}</span>
                                    </div>
                                    <span className={styles.evalHeader}>Add Faculty Evaluation</span>
                                    {(sub.content as SubPractical).student.map((c) => {
                                        const currentMark = marks[sub.student_id]?.[c.id] ?? "";
                                        return (
                                            <div key={c.id} className={styles.criteriaBox}>
                                                <label className={styles.criteriaLabel}>
                                                    {c.desc} <span className="text-gray-500">(Max: {c.maximum}, Min: {c.minimum})</span>
                                                </label>
                                                <span className={styles.criteriaStudentScore}>
                                                    Student Score: {c.given}
                                                </span>
                                                <input
                                                    type="number"
                                                    className={styles.inputNumber}
                                                    min={0}
                                                    max={c.maximum}
                                                    value={currentMark}
                                                    onChange={(e) =>
                                                        handleMarkChange(sub.student_id, c.id, Number(e.target.value))
                                                    }
                                                />
                                            </div>
                                        );
                                    })}

                                    <textarea
                                        placeholder="Remarks (optional)"
                                        className={styles.textArea}
                                        rows={3}
                                        value={feedbacks[sub.student_id] || ""}
                                        onChange={(e) => handleFeedbackChange(sub.student_id, e.target.value)}
                                    />

                                    <div className={styles.buttonRow}>
                                        <button
                                            onClick={() => setExpandedStudentId(null)}
                                            className={styles.cancelBtn}
                                        >
                                            Cancel
                                        </button>
                                        <button className={styles.submitBtn}>
                                            Submit Evaluation
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
