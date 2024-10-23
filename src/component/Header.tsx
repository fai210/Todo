// import SignIn from "./SignIn";
// import Signup from "./SignUp";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex grow bg-white p-3  justify-between">
            <ul className="flex flex-row  gap-3">
                <li>
                    <button className="bg-slate-500 text-white p-2 rounded">
                      <Link to="./SignIn">SignIn</Link>
                    </button>
                </li>
                <li>
                    <button className="bg-slate-500 text-white p-2 rounded">
                       <Link to="./SignUp">SignUp</Link>
                    </button>
                </li>
            </ul>
            <img src="src/assets/to-do-list.png" className="w-11 h-13"></img>
    </div>
  )
}
