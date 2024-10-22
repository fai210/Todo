import { useForm } from "react-hook-form";

interface Inputs {
    firstName: string;
    email: string;
    password: string; 
}

export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    return (
        <div className=" bg-purple-300 h-screen space-y-5 pt-14  pb-4" >
            <h1 className="font-bold text-3xl text-center pt-2 ">Register</h1>
            <form className="flex flex-col  max-w-lg  mx-auto bg-slate-100 rounded-md p-5 space-y-6 " onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <label className="font-bold ">First Name:</label>
                <input className="w-[35vw] rounded-lg p-2" {...register("firstName", { required: "This is required" })} type="text" placeholder="First Name" />
                <p>{errors.firstName?.message}</p>

                <label className="font-bold ">Your Email:</label>
                <input className="w-[35vw] rounded-lg p-2" {...register("email", { required: "This is required" })} type="email" placeholder="Email" />
                <p>{errors.email?.message}</p>

                <label className="font-bold ">Password:</label>
                <input className="w-[35vw] rounded-lg p-2" {...register("password", { required: "This is required", minLength: { value: 9, message: "Minimum length is 9" } })} type="password" placeholder="Password" />
                <p>{errors.password?.message}</p>

                <input className="bg-black w-[30vw] p-2 rounded-lg  text-white " type="submit" />
            </form>
        </div>
    );
}
