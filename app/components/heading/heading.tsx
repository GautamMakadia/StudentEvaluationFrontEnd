type HeadingProp = {
    id: string
    className?: string
    title: string
}

export default function Heading({id, className, title}: HeadingProp) {
    return <>
        <h1 id={id} className={`text-2xl font-semibold text-primary ${className}`}>{title}</h1>
        <hr className="text-outline-variant mb-2" />
    </>
}