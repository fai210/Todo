import { useForm } from "react-hook-form"
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import http from "./http/http";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
 
 
 
const loginValidation=z.object({
    firstName: z.string().min(1, "First name is required"),
    password: z.string().min(9, "Minimum length is 9"),
})
 
type LoginValidation = z.infer<typeof loginValidation>;
 
export default function SignIn() {
    const auth = useAuth();
    const navigate = useNavigate();
    const form = useForm<LoginValidation>({
        resolver: zodResolver(loginValidation),
        defaultValues:{
            password:"",

        }
    });
 
 
    const onSubmit = async (data: LoginValidation) => {
 
        try {
 
                const response = await http.get<{ firstName: string; password: string; id: string; userId: string | null }[]>("/user");
                const users = response.data;
                const foundUser = users.find(item => item.firstName === data.firstName && item.password === data.password);
                console.log(foundUser)
                if (foundUser) {
                    await auth?.loginAction(foundUser);
                    navigate("/");
                }
 
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid username or password");
        }
    };
 
  return (
    <Form {...form}>
        <div className="space-y-5 pt-14  pb-4" >
            <h1 className="font-bold text-3xl text-center pt-2 ">Login</h1>
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
              
              <FormMessage />
            </FormItem>
          )}
        />
       
        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>password</FormLabel>
            <FormControl className="bg-white">
              <Input type="password" placeholder="***" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
                <Button>Login</Button>
            </form>
        </div>
    </Form>
  )
}
 
 