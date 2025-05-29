import { createContext, useContext, useEffect, useState } from "react";
import { api } from "~/conf/url";
import type { FacultyData } from "~/routes/faculty/create_task/type";
import { useAuth } from "./authContext";

interface FacultyContext {
    faculty: FacultyData | null
}

const FacutltyContext = createContext<FacultyContext>({ faculty: null })

export const FacultyProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth()
    const [facult, setFaculty] = useState<FacultyData | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await fetch(`${api}/faculty/user/${user?._id}`)

                if (res.ok) {
                    const data = await res.json();
                    setFaculty(data);
                } else {
                    setFaculty(null);
                }
            } finally {
                setLoading(false)
            }
        })()
    }, [user])

    return <FacutltyContext.Provider value={{ faculty: facult }}>
        {!loading && facult && children}
    </FacutltyContext.Provider>
}

export const useFaculty = () => {
    const context = useContext(FacutltyContext);

    if (!context) throw new Error("useFaculty must be used within an FacultyProvider")

    return context;
}