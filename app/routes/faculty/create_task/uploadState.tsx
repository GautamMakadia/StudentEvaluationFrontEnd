import { useState } from "react"
import { api } from "~/conf/url"
import type { TaskData } from "./type"

interface TaskUploadState<T> {
    action: (task: any) => Promise<void>
    error: Error | undefined
    isUpLoading: boolean
    data: T | undefined
}

export function useUploadState<T>(): TaskUploadState<T> {
    const [error, setError] = useState<Error>()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T>()

    const action = async (task: TaskData) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${api}/tasks/create`, {
                method: "post",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(task)
            }) 

            if (res.ok) {
                const data = await res.json()
                setData(data)
                setError(undefined)
            } else {
                throw new Error()
            }
        } catch {
            setError(new Error("Error uploading task"))
        } finally {
            setIsLoading(false)
        }
    }


    return { action: action, data: data, error: error, isUpLoading: isLoading }
}