

// import * as React from "react";
//   import * as ReactDOM from "react-dom";
  import {
    createBrowserRouter,

    RouterProvider,
  } from "react-router-dom";
import SignIn from "./component/SignIn";
import Signup from "./component/Signup";
import Layout from "./component/Layout";
import Home from "./component/Home";
import { useEffect } from "react";
import { mood } from "./component/Zustand/Zustand";
// import { MoodProvider } from "./component/context/ContextMood";




  
  
function App() {
  
 
  
  
  const router = createBrowserRouter([{

     path:"/",
     element:<Layout />,
     children:[
      {
        path: "/",
        element: <Home />,
        
      },
      {
        path: "SignIn",
        element:<SignIn />,
      },
      {
        path: "signup",
        element:<Signup/>,
      },
    ]

  }]);

  const getMode = mood();

useEffect(() => {
    const localMood = localStorage.getItem("mood");
    if (localMood) {
        document.documentElement.setAttribute("data-mode", localMood);
        document.documentElement.className = localMood;
    } else {
        document.documentElement.setAttribute("data-mode", getMode);
        document.documentElement.className = getMode;
    }
}, [getMode]); 


return (
    <RouterProvider router={router} />
);
}
export default App


