import { useContext, createContext, useState, ReactNode } from "react";
import { Iuser } from "../../types/todos";



export type AuthContextType = {
    userI: Iuser | null;
    userInfo: string;
    loginAction: (data: Iuser) => void;
    logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userI, setUser] = useState<Iuser | null>(null);
    const [userInfo, setUserInfo] = useState<string>(
        localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "").firstName : ""
    );

    const loginAction = async (data:Iuser) => {
        console.log(data)
         setUser(data);
         setUserInfo(data.firstName)
        
       
      
    };

    const logOut = () => {
        setUser(null);
        setUserInfo("");
        localStorage.removeItem("user");
                
    };

    return (
        <AuthContext.Provider value={{ userInfo, userI, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};


