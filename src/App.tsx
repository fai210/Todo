



  import {
    createBrowserRouter,
    BrowserRouter,
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
// import Logout from "./component/logout";

// import { MoodProvider } from "./component/context/ContextMood";

function App() {
    const router = createBrowserRouter([{

     path:"/",
     element:<Layout />,
     children:[
      {
        path: "/Home",
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
 
  // <AuthProvider>
  //   <RouterProvider router={router} />
  // </AuthProvider>

<BrowserRouter>
  <AuthProvider>
    
                    
      <RouterProvider router={router} />
    
  </AuthProvider>
</BrowserRouter>
  
    
  
);
}

export default App


