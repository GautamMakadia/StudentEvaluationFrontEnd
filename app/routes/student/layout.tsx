import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import useSWRImmutable from "swr/immutable";
import Navigation from "~/components/nav/navigation";
import { api } from "~/conf/url";
import { useAuth } from "~/context/authContext";
import { StudentProvider, useStudent } from "~/context/studentContext";
import AuthGaurd from "~/utils/authGaurd";

interface NavItem {
    name: string
    url: string
}

const navItem: NavItem[] = [
    {
        name: 'Home', url: "/student"
    },
    {
        name: "Tasks",
        url: "/student/tasks"
    },
    {
        name: "Completed Task",
        url: "/student/task/completed"
    }
]

function Head() {
    return <div>
        <h1 className="text-lg text-secondary hover:text-secondary-hover hover:cursor-pointer font-semibold mx-5">Student Dashboard</h1>
    </div>
}

function UserProfile() {
    const {logout} = useAuth()
    const { student } = useStudent()

    return <span className="mx-5 justify-self-end hover:cursor-pointer" onClick={logout}>{student?.name}</span>
}

export default function StudentLayout() {
    const { pathname } = useLocation()

    return <AuthGaurd role={"student"}>
        <StudentProvider>
            <div className="flex flex-col h-full">
                <Navigation id="nav-main" className="bg-container text-secondary shadow-tertiary drop-shadow-md m-3 rounded-lg p-1">
                    <Head />
                    <ul className="flex flex-row items-center grow mx-5">
                        {navItem.map((item, index) => {
                            return <li
                                key={index}
                                aria-disabled={pathname.endsWith(item.url)}
                                className={`inlne-block text-md ${pathname.endsWith(item.url) ? "text-secondary font-semibold" : " hover:pointer hover:text-secondary-hover"} ms-6 p-1 `}>
                                <NavLink to={item.url}>{item.name}</NavLink>
                            </li>
                        })}
                    </ul>
                    <UserProfile />
                </Navigation>
                <div className="h-full block">
                    <Outlet />
                </div>
            </div>
        </StudentProvider>
    </AuthGaurd>
}