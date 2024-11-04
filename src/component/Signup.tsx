import {  SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import http from "./http/http";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";





const schemaValidation=z.object({
    firstName:z.string().min(1, "First name is required"),
    email:z.string().email("Invalid Email"),
    password:z.string().min(9,"Minimum length is 9"),
    confirmPassword:z.string().min(9,"Minimum length is 9")
}).refine((arg) =>arg.confirmPassword === arg.password,{
    message:"Invalid password",
    path:["confirmPassword"],
  

})

type SchemaValidation = z.infer<typeof schemaValidation>;
  export default function Signup() {
  
    const navigate = useNavigate();

    const form = useForm<SchemaValidation>({
        resolver: zodResolver(schemaValidation),
       
    });
      
      const onSubmit : SubmitHandler<SchemaValidation> =  (data) => {

          http.post("/user", data).then((res)=>{

            if(res.data){
              console.log(res);
              navigate("/"); 

            }
           


            });
        
    };



    return (
      <Form {...form}>
        <div className="space-y-5 pt-14  pb-4" >
            <h1 className="font-bold text-3xl text-center pt-2 ">Register</h1>
            <form className="flex flex-col  max-w-lg  mx-auto bg-[#E5E1DA] rounded-md p-5 space-y-6 " onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
          control={form.control}
          name="firstName"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl className="bg-white">
                <Input  placeholder="First Name" {...field} />
              </FormControl>
              
              <FormMessage  />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="bg-white">
                <Input  placeholder="Email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl className="bg-white">
                <Input  type="password" placeholder="***" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm Password</FormLabel>
              <FormControl className="bg-white">
                <Input  type="password" placeholder="***" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
                <Button>Supment</Button>
                  <p className="font-bold pl-4">You Have Account?<Link to="/SignIn" className="p-2 rounded-lg text-gray-600 underline">Login </Link></p>
            </form>
          
        </div>
      </Form>  
    );
}


