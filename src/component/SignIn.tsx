import { useForm } from "react-hook-form"
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
// import http from "./http/http";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";



const loginValidation=z.object({
    firstName: z.string().min(1, "First name is required"), 
    password: z.string().min(9, "Minimum length is 9"),
})


type LoginValidation =z.infer<typeof loginValidation>

export default function SignIn() {

   
    const { login } = useAuth(); 
   
    const { register, handleSubmit, formState: { errors } } = useForm<LoginValidation>({
        resolver: zodResolver(loginValidation),
    });

    const onSubmit = async (data: LoginValidation) => {
        try {
            await login(data); 
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid username or password"); 
        }
    };
  return (
    <div className="space-y-5 pt-14  pb-4" >
        <h1 className="font-bold text-3xl text-center pt-2 ">Login</h1>
        <form className="flex flex-col  max-w-lg  mx-auto bg-[#E5E1DA] rounded-md p-5 space-y-6 " onSubmit={handleSubmit(onSubmit)}>
            <label className="font-bold ">First Name:</label>
            <input className="w-11/12 rounded-lg p-2" {...register("firstName")} type="text" placeholder="First Name" />
            <p>{errors.firstName?.message}</p>
               
            <label className="font-bold ">Password:</label>
            <input className="w-11/12 rounded-lg p-2" {...register("password" )} type="text" placeholder="Password" />
            <p>{errors.password?.message}</p>

            <input className="bg-black w-4/5 p-2 rounded-lg  text-white  hover:bg-slate-400" type="submit" ></input>
        </form>
    </div>
  )
}



