import { Link } from "react-router";
import { useFaculty } from "~/context/facultyContext";
import style from "./page.module.css"

export default function Page() {
    const { faculty } = useFaculty()

    return <div id={style.root}>
        <div className={style.container}>
            <h2 className={style.title}>Faculty Details</h2>
            <div className={style.info}>
                <div className={style.display}>
                    <label className={style.label} htmlFor={style.name}>Name: </label>
                    <span id={style.name} className={style.value}>{faculty?.name}</span>
                </div>
                <div id={style.department} className={`${style.display} ${style.display_list}`}>
                    <label className={style.label} htmlFor={style.department}>Departments: </label>
                    {
                        faculty?.departments.map((dept, index) => {
                            return <><span className={style.value}>{index + 1}. {dept.name}-({dept.code})</span></>
                        })
                    }
                </div>
                <div className={`${style.display} ${style.display_list}`}>
                    <label className={style.label} htmlFor={style.email}>Email: </label>
                    {
                        faculty?.subjects.map((sub, index) => {
                            return <><span className={style.value}>{index + 1}. {sub.name}-({sub.code})</span></>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}