import { Link } from "react-router";
import { useStudent } from "~/context/studentContext";

export default function Page() {
    const { student } = useStudent()

    return <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center p-5 rounded-xl outline-1 outline-border bg-container drop-shadow-lg">
            <h2 className="text-2xl text-secondary font-bold">Student Details</h2>
            <div className=" flex flex-col items-start justify-center p-5">
                <span className="text-md text-secondary-active outline-1 outline-border my-1 inline-block w-full p-2 rounded-lg bg-background inset-shadow-sm"><span className="font-semibold ">Student:</span> {student?.name}</span>
                <span className="text-md text-secondary-active outline-1 outline-border my-1 inline-block w-full p-2 rounded-lg bg-background inset-shadow-sm"><span className="font-semibold ">Deparment:</span> {student?.department.name}</span>
                <span className="text-md text-secondary-active outline-1 outline-border my-1 inline-block w-full p-2 rounded-lg bg-background inset-shadow-sm"><span className="font-semibold ">Semester:</span> {student?.current_semester}</span>
            </div>
        </div>
    </div>
}