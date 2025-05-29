import { useState, type ChangeEvent } from "react"
import Input from "~/components/input/input"
import { api } from "~/conf/url"
import style from "./page.module.css"

interface UploadFileProp {
    name: string,
    label: string,
    id?: string,
    required?: boolean,
    onSuccess: (id: string) => void
}

export function UploadFile({
    name,
    label,
    id,
    required,
    onSuccess
}: UploadFileProp) {
    type UploadFileRes = {
        id: string
        status: string
    }
    const [error, setError] = useState('')
    const [res, setRes] = useState<UploadFileRes>({ id: '', status: '' })

    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file == null) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(`${api}/tasks/files`, {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data: UploadFileRes = await res.json();
                onSuccess(data.id)
                setRes(data)
            } else {
                throw new Error()
            }

        } catch (error) {
            setError('error uploading')
        }
    }
    
    return (
        <div className={style.input_group}>
            <label htmlFor={id} className={style.input_label}>{label} {error ? (error) : (res.status)}</label>
            <input type="file" name={name} className={style.input} id={id} onChange={uploadFile} />
        </div>
    )
}