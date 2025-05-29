import { use, useEffect, useState } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router";
import { useAuth } from "~/context/authContext";

export default function AuthGaurd({ children, role }: { children: React.ReactNode, role: "faculty" | "student" }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        console.log(user?.role)
        if (user === null) {
            navigate('/login');
        } else if (user && user.role !== role) {
            navigate('/noauth');
        } else if (user) {
            setChecked(true);
        }
    }, [user, role]);

    if (!user || !checked) {
        return null;
    }

    return <>{children}</>;
}