// FacultyTaskSelectorPage.tsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { demoTasks } from "./demoTasks";
import type { Task } from "./type";
import { useFaculty } from "~/context/facultyContext";
import { api } from "~/conf/url";
import type { TaskModel } from "~/models/db";

export default function FacultyTaskSelectorPage() {
    const navigate = useNavigate();
    const { faculty } = useFaculty()
    const [isLoading, setIsLoading] = useState(false);
    const [department, setDepartment] = useState("");
    const [subject, setSubject] = useState<string>("");
    const [filteredTasks, setFilteredTasks] = useState<TaskModel[]>([]);


    const handleFilter = async () => {
        if (!department || !subject) return;

        try {
            const res = await fetch(`${api}/task/dept/${department}/sub/${subject}`)
            if (res.ok) {
                const data = await res.json()
                setFilteredTasks(data)
            } 
        } catch {
            setFilteredTasks([])
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Select Department & Semester</h1>

            <div className="flex gap-4">
                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">Select Department</option>
                    {
                        faculty?.departments.map((dept) => {
                            return <option value={dept._id}>{dept.name}</option>
                        })
                    }
                </select>

                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">Select Subject</option>
                    {faculty?.subjects.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                            {sub.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleFilter}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Fetch Tasks
                </button>
            </div>

            {filteredTasks.length > 0 && (
                <div className="border-t pt-4">
                    <h2 className="text-xl font-semibold mb-2">Tasks</h2>
                    <ul className="space-y-2">
                        {filteredTasks.map((task) => (
                            <li
                                key={task._id}
                                className=" flex flex-row  gap-3 p-4 border rounded-md cursor-pointer hover:bg-gray-100"
                                onClick={() => navigate(`/faculty/eval/${task.type}/${task._id}`)}
                            >
                                <div className="font-medium">{task.title}</div>
                                <div className="text-sm text-gray-600">{task.type}</div>
                                <div className="text-sm text-gray-600">{task.term}</div>
                                <div className="text-sm text-gray-600">{task.subject.name}</div>
                                <div className="text-sm text-gray-600">{task.department.name}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
