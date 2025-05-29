import type { ChangeEventHandler } from "react"
import './style.css'

type TextAreaProp = {
    label: string
    className?: string
    name: string
    row: number
    col: number
    required: boolean
    onChange: ChangeEventHandler<HTMLTextAreaElement>
}

export default function TextArea({ col, row, name, className, label, onChange, required }: TextAreaProp) {
    return <div className='input-group'>
        <label htmlFor={name} className='label'>{`${label}:`}</label>
        <textarea
            name={name}
            id={name}
            cols={col}
            rows={row}
            onChange={onChange}
            required={required}
            className={`'text-area' ${className}`}>

        </textarea>
    </div>
}