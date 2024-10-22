

// import * as React from "react";
//   import * as ReactDOM from "react-dom";
  import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import SignIn from "./component/SignIn";
import Signup from "./component/SignUp";
import Layout from "./component/Layout";

  
  
function App() {
  
 
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      
    },
    {
      path: "/SignIn",
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
