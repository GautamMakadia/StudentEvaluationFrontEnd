import { createContext, useContext, useEffect, useState } from "react";
import { api } from "~/conf/url";
import { useAuth } from "./authContext";


interface StudentContext {
    student: Student | null
}

const StudentContext = createContext<StudentContext | undefined>(undefined)

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth()
    const [student, setStudent] = useState<Student | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        (async () => {
            if (!student) {
                setLoading(true)
                try {
                    const res = await fetch(`${api}/student/user/${user?._id}`)

                    if (res.ok) {
                        const data = await res.json();
                        setStudent(data);
                        console.log({ student: data })
                    }
                } finally {
                    setLoading(false)
                }
            }
        })()

    }, [student])

    return <StudentContext.Provider value={{ student: student }}>
        {(!loading && student) && children}
    </StudentContext.Provider>
}

export const useStudent = () => {
    const context = useContext(StudentContext);

    if (!context) throw new Error("useStudent must be used within an StudentProvider")

    return context;
}