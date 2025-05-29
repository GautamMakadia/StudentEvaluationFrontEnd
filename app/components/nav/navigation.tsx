interface NavProps {
    id: string
    className?: string
    children: React.ReactNode
}

export default function Navigation({
    id, children, className
}:NavProps) {
    return <nav id={id} className={className}>
        {children}
    </nav>
}