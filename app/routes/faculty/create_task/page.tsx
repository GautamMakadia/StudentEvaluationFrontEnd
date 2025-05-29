import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { Outlet, useNavigate } from 'react-router'
import useSWR from 'swr'
import Heading from '~/components/heading/heading'
import { api } from '~/conf/url'
import { useFaculty } from '~/context/facultyContext'
import { fetcher } from "~/utils/fetcher"
import { UploadFile } from './file_upload'
import style from './page.module.css'
import type { Department, FacultyData, Subject, TaskData } from './type'
import { useUploadState } from './uploadState'




const emptyTaskData: TaskData = {
    type: "quiz",
    department_id: "",
    semester: 0,
    subject_id: "",
    tag: "",
    support_file_id: "",
    title: "",
    description: "",
    content: {}
}

function TaskSelect({ value, onChange }: {
    value: string
    onChange: React.ChangeEventHandler<HTMLSelectElement>
}) {
    return (
        <div className={style.input_group}>
            <label htmlFor='task_select' className={style.input_label}>Task Type:</label>
            <select id='task_select' className={style.input} value={value} name="type" onChange={onChange} required>
                <option value="quiz">Quiz</option>
                <option value="practical">Practical</option>
                <option value="presentation">Presentation</option>
                <option value="assignment">Assignment</option>
            </select>
        </div>
    );
}

type DepartmentProp = {
    departments: Department[]
    onChange: (id: string) => void;
}

function DepartmentSelect({ departments, onChange }: DepartmentProp) {

    const [id, setId] = useState('')

    useEffect(() => {
        onChange(id)
    }, [id])

    return (
        <div className={style.input_group}>
            <label htmlFor='department' className={style.input_label}>
                Department:
            </label>
            <select id='department' className={style.input} defaultValue='' name='department' onChange={(e) => setId(e.target.value)} required>
                <>
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                        <option key={index} value={dept._id}>{dept.name}</option>
                    ))}
                </>
            </select>
        </div>
    );
};


type SubjectSelectProp = {
    subjects: Subject[]
    onChange: (id: string, sem: number) => void
}

function SubjectSelect({ subjects, onChange }: SubjectSelectProp) {


    const onSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value

        const subject = subjects.find((sub) => sub._id == id)
        if (subject) {
            onChange(id, subject.semester)
        }
    }

    return (
        <div className={style.input_group}>
            <label htmlFor='subject' className={style.input_label}>Subject</label>
            <select id='subject' className={style.input} defaultValue='' name='subject' onChange={onSubjectChange} required>
                <>
                    <option value="">Select Subject</option>
                    {subjects.map((subject, index) => {
                        return <option key={index} value={subject._id} className="select-option">{`(${subject.code}) ${subject.name}`}</option>
                    })}
                </>
            </select>
        </div>
    );
}

const fetchFaculty = (id: string): { facultyData: any, error: any, isLoading: boolean } => {
    const { data, error, isLoading } = useSWR(`${api}/faculty/${id}`, fetcher)

    return {
        facultyData: data,
        error,
        isLoading
    }
}

function UploadForm({ faculty }: { faculty: FacultyData }) {

    const navigate = useNavigate()
    const { data, error, isUpLoading, action } = useUploadState<{ message: string, task_id: string }>()
    const formRef = useRef<HTMLFormElement>(null)
    const [taskType, setTaskType] = useState<string>('quiz');
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [taskData, setTaskData] = useState<TaskData>({
        type: "quiz",
        department_id: "",
        semester: 0,
        subject_id: "",
        tag: "",
        support_file_id: "",
        title: "",
        description: "",
        content: {}
    });

    useEffect(() => { navigate(taskType) }, [taskType])
    useEffect(() => { console.log(taskData) }, [taskData])

    const onTaskSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const type = event.target.value
        setTaskType(type)
        setTaskData((prev) => ({ ...prev, type: type, content: {} }))
    }

    const onInputChange = (key: keyof TaskData, value: any) => {
        setTaskData({ ...taskData, [key]: value })
    }

    const onContentChange = (content: any) => {
        setTaskData({ ...taskData, content: content })
    }

    const onDepartmentChange = (id: string) => {
        const subject = faculty.subjects.filter((subject) => subject.department_id == id)
        setSubjects(subject)
        onInputChange("department_id", id)
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        action(taskData)
    }

    const resetForm = () => {
        setTaskType('quiz')
        setTaskData(emptyTaskData)
        navigate(0)
    }

    return <>
        <form id={style.task_form} onSubmit={onSubmit} onReset={resetForm} ref={formRef}>
            <div id={style.submit_container}>
                {error && <span className="text-xl text-red-600 font-semibold">Error Creating Task</span>}
                {data ?
                    <input type='reset' id='form-reset' value='Reset' /> :
                    <button
                        id={style.create_button}
                        className={`${style.button} ${data && style.success}`}
                        disabled={data ? true : false}>
                        {isUpLoading ? "Uploading..." : (data ? "Created" : "Create")}
                    </button>
                }
            </div>
            <div id={style.input_container}>
                <div className={style.flex_container}>
                    <Heading id={style.form_title} title="Create Task" />
                    <TaskSelect value={taskType} onChange={onTaskSelectChange} />
                    <DepartmentSelect departments={faculty.departments} onChange={(id: string) => { onDepartmentChange(id) }} />
                    <SubjectSelect subjects={subjects}
                        onChange={(id, sem) => { setTaskData({ ...taskData, subject_id: id, semester: sem }) }} />

                    <div className={style.input_group}>
                        <label htmlFor={style.title} className={style.input_label}>Title:</label>
                        <input type="text" name="title" className={style.input} id={style.title}
                        placeholder='Title Of Task'
                            onChange={(e) => { onInputChange("title", e.target.value) }} required />
                    </div>

                    <div className={style.input_group}>
                        <label htmlFor={style.description} className={style.input_label}>Description:</label>
                        <textarea name='description' id={style.description} rows={3} cols={0} placeholder='Enter task description'
                            className={style.input}
                            onChange={(e) => { onInputChange("description", e.target.value) }} required />
                    </div>

                    <div className={style.input_group}>
                        <label htmlFor={style.tags} className={style.input_label}>Tags:</label>
                        <input type='text' className={style.input} name='tags' id={style.tags}
                            placeholder='Enter tags separated by commas ,'
                            onChange={(e) => { onInputChange("tag", e.target.value) }} required />
                    </div>

                    <UploadFile id={style.support_file} name='support_file' label='Support File'
                        onSuccess={(id: string) => { onInputChange("support_file_id", id) }} />
                </div>

                <div className={style.flex_container}>
                    <Outlet context={{ content: taskData.content, onChange: onContentChange, type: taskType }} />
                </div>
            </div>
        </form>
    </>
}

export default function Page() {
    const { faculty } = useFaculty()


    if (!faculty) return <span>Error fetching faculty data</span>


    return <div id={style.root}>
        <UploadForm faculty={faculty} />
    </div>
}