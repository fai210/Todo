

// import * as React from "react";
//   import * as ReactDOM from "react-dom";
  import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import Signup from "./component/SignUp";

  
  
function App() {
  
 
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      
    },
    {
      path: "/signin",
      element:<SignIn />
    },
    {
      path: "/signup",
      element:<Signup/>
    }
  ]);

  


  return (
     
    <RouterProvider router={router} />
    
    
  )
}
export default App
