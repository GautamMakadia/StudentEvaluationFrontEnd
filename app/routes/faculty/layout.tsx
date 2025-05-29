import { NavLink, Outlet, useLocation } from "react-router";
import Navigation from "~/components/nav/navigation";
import { useAuth } from "~/context/authContext";
import { FacultyProvider } from "~/context/facultyContext";
import AuthGaurd from "~/utils/authGaurd";
import style from "./layout.module.css";


interface NavItem {
    name: string
    url: string
}



function Head() {
    return <div>
        <h1 id={style.head} className={style.nav_item}>Faculty Dashboard</h1>
    </div>
}

function UserProfile() {
    const { logout } = useAuth()

    return <>
        {/* <Temp /> */}
        <span id={style.nav_user} className={style.nav_item} onClick={logout}>Logout</span>
    </>
}

export default function FacultyAuthLayout() {
    const { pathname } = useLocation()

    const navItem: NavItem[] = [
        {
            name: 'Home', url: "/faculty/home"
        },
        {
            name: "Create Task",
            url: "/faculty/tasks/create"
        },
        {
            name: "Task Evaluation",
            url: "/faculty/eval"
        },
    ]

    return (
        <AuthGaurd role={"faculty"}>
            <FacultyProvider>
                <div id={style.root}>
                    <Navigation id={style.nav} >
                        <Head />
                        <ul id={style.navlist}>
                            {navItem.map((item, index) => {
                                return <li
                                    key={index}
                                    className={`${style.nav_item}`}>
                                    <NavLink to={item.url}
                                        className={`${style.nav_link} ${pathname.includes(item.url) && style.nav_link_active}`}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            })}
                        </ul>
                        <UserProfile />
                    </Navigation>
                    <main id={style.main}>
                        <Outlet />
                    </main>

                </div>
            </FacultyProvider>
        </AuthGaurd>
    )

}