import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./header";


export default function Layout() {

  return (
   <div className=" bg-purple-300 h-screen">
      <Header/>
      <Outlet />
      <Footer />
   </div>
  )
}
