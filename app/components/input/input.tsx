import type { ChangeEventHandler } from 'react';

type InputProps = {
    id?: string;
    className?: string
    label: string;
    name: string;
    ref?: React.RefObject<HTMLInputElement>
    type?: "text" | "number" | "file" | "hidden" | "checkbox";
    value?: string | number;
    checked?: boolean
    onChange: ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    disabled?: boolean
};

export default function Input({
    id,
    className,
    label,
    name,
    ref,
    type = "text",
    value,
    checked,
    onChange,
    required = false,
    disabled = false
}: InputProps) {
    return (
        <div className={className}>
            <label htmlFor={id} hidden={type == "hidden"}>{label}
                <input
                id={id}
                name={name}
                type={type}
                ref={ref}
                value={type !== "file" ? value : undefined}
                checked={type == "checkbox" ? checked : undefined}
                placeholder={`Enter ${label}`}
                onChange={onChange}
                required={required}
                disabled={disabled}
            />
            </label>
        </div>
    );
}
