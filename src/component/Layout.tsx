import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";


export default function Layout() {
    

  return (
   <div className=" bg-[#FBF9F1] h-screen text-black bg:white dark:text-white dark:bg-slate-600"  >
      <Header/>
      <Outlet />
      <Footer />
   </div>
  )
}
