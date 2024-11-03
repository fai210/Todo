import { useState } from "react";
import http from "./http/http";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { useAuth } from './context/AuthProvider'; 



function AddTodoForme( ) {
    const [input, setInput] = useState("");
    const auth = useAuth(); 
    const userId = auth?.userI?.id; 
    
   
    
    const queryClient=useQueryClient()

    const addToo = useMutation({
        mutationFn: (body: { title: string; userId: string }) =>
            http.post<{ title: string; userId: string }>("todo", body).then(res => res.data),
        onError: (err) => {
            console.error("Error adding todo:", err);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["todos"]
            })
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!input.trim() || !userId) return;

        addToo.mutateAsync({ title: input, userId }, {
            onSuccess: () => {
               
                setInput("");
            }
        });
    };

    

    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What needs to be done?"
                className="rounded-s-md grow border border-gray-400 p-2"
            />
            <button type="submit" className="w-16 rounded-e-md bg-black text-white hover:bg-slate-500">
                Add
            </button>
            
        </form>
    );
}

export default AddTodoForme;
