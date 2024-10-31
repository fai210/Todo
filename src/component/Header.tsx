// import { MoodProvider } from "./context/ContextMood";
// import MoodButton from "./context/MoodButton";


import { Link } from "react-router-dom";

import {moodStore} from "./Zu/Zustand";
import { useLogout } from "./logout";
import { useAuth } from "./context/AuthProvider";



export default function Header() {

    const getModemood = moodStore((state)=> state.mood)
    const getToggleMood = moodStore((state)=> state.toggleMood)
    const handleLogout = useLogout();
    const auth = useAuth();
    const userI = auth?.userI;




  return (

    <div className="flex grow bg-[#92C7CF] p-3  justify-between " >
            <ul className="flex flex-row  gap-3 items-center">
                <li>
                    {/* <MoodProvider>
                       <MoodButton />
                    </MoodProvider> */}
                    <button onClick={getToggleMood} className="bg-slate-500 text-white p-2 rounded"  >mood {getModemood}</button>

                </li>
                {userI ? (
                        <>
                            <li>
                                <button onClick={handleLogout} className="bg-slate-500 text-white p-2 rounded">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="SignIn" className="bg-slate-500 text-white p-2 rounded">SignIn</Link>
                            </li>
                            <li>
                                <Link to="SignUp" className="bg-slate-500 text-white p-2 rounded">SignUp</Link>
                            </li>
                        </>
                    )}
            </ul>
            <img src="src/assets/to-do-list.png" className="w-11 h-13"></img>
    </div>
  )
}



