import { useForm } from "react-hook-form";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";



const schcmavalidation=z.object({
    firstName:z.string().min(7,"nnnnnnnn"),
    email:z.string().email("Invalid Email"),
    password:z.string().min(9,"Minimum length is 9"),
    confirmPassword:z.string().min(9,"Minimum length is 9")
}).refine((arg) =>arg.confirmPassword === arg.password,{
    message:"Invalid password",
    path:["confirmPassword"],
  

})

type schcmavalidation =z.infer<typeof schcmavalidation>

export default function Signup() {
    const { register, handleSubmit, formState: { errors }  } = useForm<schcmavalidation>({resolver: zodResolver(schcmavalidation)});
     console.log(errors)
    return (
        <div className="space-y-5 pt-14  pb-4" >
            <h1 className="font-bold text-3xl text-center pt-2 ">Register</h1>
            <form className="flex flex-col  max-w-lg  mx-auto bg-slate-100 rounded-md p-5 space-y-6 " onSubmit={handleSubmit((data) => {
                console.log(data);
                
            })}>
                <p className="text-center ">Create a new account</p>
                <label className="font-bold ">First Name:</label>
                <input className="w-11/12 rounded-lg p-2" {...register("firstName")} type="text" placeholder="First Name" />
                <p>{errors.firstName?.message}</p>
               

                <label className="font-bold ">Your Email:</label>
                <input className="w-11/12 rounded-lg p-2" {...register("email")} type="text" placeholder="Email" />
                <p>{errors.email?.message}</p>

                <label className="font-bold ">Password:</label>
                <input className="w-11/12 rounded-lg p-2" {...register("password" )} type="text" placeholder="Password" />
                <p>{errors.password?.message}</p>

                <label className="font-bold ">confirm Password:</label>
                <input className="w-11/12 rounded-lg p-2" {...register("confirmPassword")} type="text" placeholder="confirm Password" />
                <p>{errors.confirmPassword?.message}</p>

                <input className="bg-black w-4/5 p-2 rounded-lg  text-white  hover:bg-slate-400" type="submit" />
            </form>
        </div>
    );
}
