import { useForm } from "react-hook-form"
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import http from "./http/http";
import { useNavigate } from "react-router-dom";


const loginvalidation=z.object({
    firstName:z.string(), 
    password:z.string().min(9,"Minimum length is 9"),
})
// .refine((data) => data.firstName && data.password, {
//     message: "Invalid username or password",
//     path: ["password"],
// });

type loginvalidation =z.infer<typeof loginvalidation>

export default function SignIn() {

      
    const navigate = useNavigate();

    const { register, handleSubmit ,formState: { errors }  } = useForm<loginvalidation>({resolver: zodResolver(loginvalidation)});
    console.log(errors)

    const onSubmit = async (data: loginvalidation) => {

        await http.get<loginvalidation[]>("/user").then((result)=>{

            console.log(result.data);
        const login = result.data.find((item)=> item.firstName === data.firstName && item.password === data.password);
        if (login) {
            navigate("/Home"); 
        } else {
            console.log("Invalid username or password");
        }
    

        });
        
};
  return (
    <div className="space-y-5 pt-14  pb-4" >
        <form className="flex flex-col  max-w-lg  mx-auto bg-slate-100 rounded-md p-5 space-y-6 " onSubmit={handleSubmit(onSubmit)}>
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
