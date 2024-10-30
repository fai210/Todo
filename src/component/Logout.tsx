import { useAuth } from "./context/AuthProvider"; 
// import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { logout } = useAuth(); 
   

    const handleLogout = () => {
        logout(); 
        
    };

    <button
    onClick={handleLogout}
    className="">
    Logout
</button>
}