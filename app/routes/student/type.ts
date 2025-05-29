interface Department {
    _id: string
    name: string
    code: string
}

interface Student {
    _id: string 
    name: string
    department: Department
    current_semester: number
}