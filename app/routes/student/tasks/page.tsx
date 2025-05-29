import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { api } from "~/conf/url";
import { useStudent } from "~/context/studentContext";
import { fetcher } from "~/utils/fetcher";

interface Task {
    _id: string
    type: string
    title: string
    description: string
    term: number
    semester: string
    tag: string
    department: any
    subject: any
    support_file: any
}

function fetchTaskOfStudent<T>() {
    const { student } = useStudent()

    if (!student) {
        return {
            task: undefined,
            error: "no student data present",
            isLoading: false
        }
    }

    const {
        data,
        error,
        isLoading
    } = useSWRImmutable<T>(`${api}/task/dept/${student.department._id}/sem/${student.current_semester}`, fetcher)

    return {
        tasks: data,
        error,
        isLoading
    }
}

export default function StudentTasks() {

    const { tasks, error, isLoading } = fetchTaskOfStudent<Task[]>()

    const navigate = useNavigate();

    const handleTaskClick = (task: Task) => {
        navigate(`./${task.type}/${task._id}`);
    };

    if (isLoading) return <span>Loading...</span>
    if (error) return <span>Error fetching task</span>
    if (!tasks) return <span>No Task Found</span>

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
            <div className="space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task._id}
                        className="p-4 rounded-lg shadow bg-container drop-shadow-lg hover:drop-shadow-2xl transition-all ease-in-out cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                    >
                        <h1 className="text-2xl font-medium">{task.title}</h1>
                        <section>
                            <p><span className="font-medium">Subject:</span> <span className="text-md">{task.subject.name}</span></p>
                            <p className="text-sm">{task.description}</p>
                            <span className="">{task.type}</span>
                        </section>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
