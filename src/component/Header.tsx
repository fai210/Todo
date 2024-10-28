// import { MoodProvider } from "./context/ContextMood";
// import MoodButton from "./context/MoodButton";


import { Link } from "react-router-dom";

import {moodStore} from "./Zustand/Zustand";



export default function Header() {

    const getModemood = moodStore((state)=> state.mood)
    const getToggleMood = moodStore((state)=> state.toggleMood)


  return (

    <div className="flex grow bg-[#92C7CF] p-3  justify-between " >
            <ul className="flex flex-row  gap-3 items-center">
                <li>
                   <Link to="SignIn" className="bg-slate-500 text-white p-2 rounded">SignIn</Link>
                </li>
                <li>
                    <Link to="SignUp" className="bg-slate-500 text-white p-2 rounded">SignUp</Link>
                </li>
                <li>
                    <Link to="/" className="bg-slate-500 text-white p-2 rounded">Home</Link>
                </li>
                <li>
                    {/* <MoodProvider>
                       <MoodButton />
                    </MoodProvider> */}
                    <button onClick={getToggleMood} className="bg-slate-500 text-white p-2 rounded"  >mood {getModemood}</button>

                </li>
            </ul>
            <img src="src/assets/to-do-list.png" className="w-11 h-13"></img>
    </div>
  )
}



