import { useState } from "react"

interface AddTodoProps{
    onSubmit: (title: string) => void;
    
}

function AddTodoForme({onSubmit}: AddTodoProps) {
    const [input, setinput]= useState("");

    function handlSubmit(e :React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(!input.trim()) return;

        onSubmit(input);
        setinput("");
    }


  return (
   <form className="flex" onSubmit={handlSubmit}>
    <input value={input} onChange={(e) => setinput(e.target.value)} placeholder="what needs to done?" className="rounded-s-md grow border border-gray-400 p-2"></input>
    <button type="submit" className="w-16 rounded-e-md bg-black text-white hover:bg-slate-500">
        Add
    </button>
   </form>
  )
}

export default AddTodoForme