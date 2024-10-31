



  import {
    createBrowserRouter,
  
    RouterProvider,
  
  } from "react-router-dom";
import SignIn from "./component/SignIn";
import Signup from "./component/Signup";
import Layout from "./component/Layout";
import Home from "./component/Home";
import { useEffect } from "react";
import { mood } from "./component/Zu/Zustand";
import AuthProvider from "./component/context/AuthProvider";
// import AuthProvider from "./component/context/AuthProvider"
// import { MoodProvider } from "./component/context/ContextMood";
import { QueryClient, QueryClientProvider  } from "@tanstack/react-query";

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

const qureyClinet= new QueryClient();

return (
 
  <AuthProvider>
    <QueryClientProvider client={qureyClinet}>
       <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>


  
    
  
);
}

export default App


