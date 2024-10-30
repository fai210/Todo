// import { useContext, createContext, useState } from "react";
// import http from "../http/http"; 
// import { useNavigate } from "react-router-dom";

// type AuthContextType = {
//     userId: string | null;
//     user: string | null;
//     token: string | null;
//     login(data: { firstName: string; password: string }): void;
//     logout(): void;
// };

// const AuthContext = createContext<AuthContextType>({
//     userId: null,
//     user: null,
//     token: '',
//     login: async () => {},
//     logout: () => {}
// });

// const randomAlphaNumeric = (length: number) => {
//     let s = '';
//     Array.from({ length }).some(() => {
//         s += Math.random().toString(36).slice(2);
//         return s.length >= length;
//     });
//     return s.slice(0, length);
// };

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;
//     const [user, setUser] = useState<string | null>(storedInfo?.firstName || null);
//     const [token, setToken] = useState<string>(storedInfo?.token || '');
//     const [userId, setUserId] = useState<string | null>(storedInfo?.id || null);

//     const navigate = useNavigate();

//     const login = async ({ firstName, password }: { firstName: string; password: string }) => {
//         try {
//             const response = await http.get<{ firstName: string; password: string; id: string }[]>("/user");
//             const users = response.data;
//             const foundUser = users.find(item => item.firstName === firstName && item.password === password);

//             if (foundUser) {
//                 const token = randomAlphaNumeric(50);
//                 const obj = { ...foundUser, token };
//                 setUser(foundUser.firstName);
//                 setToken(token);
//                 setUserId(foundUser.id);
//                 localStorage.setItem('user', JSON.stringify(obj));
//                 navigate('/');
//             } else {
//                 throw new Error("Invalid credentials");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             alert("Login failed: " + (error instanceof Error ? error.message : "An unknown error occurred"));
//         }
//     };

//     const logout = () => {
//         setUser(null);
//         setToken('');
//         localStorage.removeItem('user', );
//         navigate('/Singin');
//     };

//     return (
//         <AuthContext.Provider value={{ userId, user, token, login,  logout}}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http/http";

 export type User = {
    id: string;
    firstName: string;
    userId: string | null;
};

export type AuthContextType = {
    userInfo: string;
    user: User | null;
    loginAction: (data: { firstName: string; password: string }) => void;
    logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userInfo, setUserInfo] = useState<string>(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "").firstName : "");

    const navigate = useNavigate();

    const loginAction = async ({ firstName, password }: { firstName: string; password: string }) => {
        try {
            const response = await http.get<{ firstName: string; password: string; id: string }[]>("/user");
            const users = response.data;
            const foundUser = users.find(item => item.firstName === firstName && item.password === password);

            if (foundUser) {
                setUser(foundUser);
                setUserInfo(foundUser.firstName);
                localStorage.setItem('user', JSON.stringify(foundUser));
                navigate("/");
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + (error instanceof Error ? error.message : "An unknown error occurred"));
        }
    };

    const logOut = () => {
        setUser(null);
        setUserInfo("");
        localStorage.removeItem("user");
        navigate("SignIn"); 
    };

    return (
        <AuthContext.Provider value={{ userInfo, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


export const useAuth = () => {
    return useContext(AuthContext);
};




