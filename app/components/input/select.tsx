import type { ChangeEventHandler, JSX, ReactNode } from "react"
import './style.css'

type SelectProp = {
    children: ReactNode
    className?: string
    name: string
    label: string
    onChange: ChangeEventHandler<HTMLSelectElement>
    required: boolean
    value?: string
    defaultValue?: string
}

export default function Select({
    children,
    label,
    className,
    name,
    onChange,
    required = false,
    value,
    defaultValue
}: SelectProp) {
    return (
        <div className='input-group'>
            <label htmlFor={name} className='label'>{`${label}:`}</label>
            <select
                id={name}
                name={name}
                value={value}
                defaultValue={defaultValue}
                aria-label={`Select ${label}:`}
                className={`select ${className}`} onChange={onChange} required={required}>
                <option value="" disabled>{`Select ${label}`}</option>
                {children}
            </select>
        </div>
    )
}