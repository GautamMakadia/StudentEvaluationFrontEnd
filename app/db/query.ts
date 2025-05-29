import type { Faculty, Subject } from "~/models/faculty"

export const demoFaculty: Faculty = {
    _id: 'FOET_1',
    name: "ABC",
    department: ["IT", "EC"],
    subjects: ['IT21', 'IT31', 'EC21', 'EC31']
}

export const demoSubjects: Subject[] = [
    {
        _id: "IT21",
        semester: 2,
        department: 'IT',
        name: "Digital Electronics",
        marks: 100
    },
    {
        _id: "IT31",
        name: "Computer Network",
        department: 'IT',
        semester: 3,
        marks: 100
    },
    {
        _id: "EC21",
        name: "Digital Electronics",
        department: 'EC',
        semester: 2,
        marks: 100
    },
    {
        _id: "EC31",
        name: "Analog Electronics",
        department: 'EC',
        semester: 3,
        marks: 100
    }
]