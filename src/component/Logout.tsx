import { useAuth } from "./context/AuthProvider"; 
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const auth = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        if (auth) { 
            auth.logOut(); 
            navigate("/SignIn"); 
        } else {
            console.error("Auth context is undefined");
        }
    };

    return handleLogout;
};



