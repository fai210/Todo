import { useForm } from "react-hook-form"
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const loginvalidation=z.object({
    firstName:z.string().min(7,"nnnnnnnn"), 
    password:z.string().min(9,"Minimum length is 9"),
}).refine((arg) =>arg.password != arg.password,{
    message:"Invalid password",
    path:["password"],
})


type loginvalidation =z.infer<typeof loginvalidation>

export default function SignIn() {
    const { register, handleSubmit ,formState: { errors }  } = useForm<loginvalidation>({resolver: zodResolver(loginvalidation)});
    console.log(errors)
  return (
    <div className="space-y-5 pt-14  pb-4" >
        <form className="flex flex-col  max-w-lg  mx-auto bg-slate-100 rounded-md p-5 space-y-6 " onSubmit={handleSubmit((data) => {
                console.log(data);
                
            })}>
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
