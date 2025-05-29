import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { api } from '~/conf/url';
import LoginPage from '~/routes/auth/login';

interface User {
    _id: string
    email: string;
    role: 'faculty' | 'student';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const isLogin = useLocation().pathname.includes("login")

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await fetch(`${api}/auth/me`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null)
                    navigate("/login")
                }
            } finally {
                setLoading(false)
            }
        })();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await fetch(`${api}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            navigate(data.user.role === 'faculty' ? '/faculty/home' : '/student');
        } else {
            throw new Error('Login failed');
        }
    };


    const logout = async () => {
        await fetch(`${api}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        setUser(null);
        navigate('/login');
    };

    if (!loading && !user) {
        return <AuthContext.Provider value={{user, login, logout}}>
            <LoginPage/>
        </AuthContext.Provider>
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loading && user && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    else return context;
}