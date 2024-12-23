import { Trash2 } from "lucide-react";
import { Todo } from "../types/todos";
import { useAuth } from "./context/AuthProvider";

interface TodoItemProps {
    todo: Todo;
    onCompletedChange:  (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onCompletedChange, onDelete }: TodoItemProps) {
    const auth = useAuth(); 
    const userId = auth?.userI?.id; 

    return (
        <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50 grow">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onCompletedChange(todo.id, todo.completed)}   
                    className="scale-125"
                />
                <span className={todo.completed ? "line-through text-gray-400" : ""}>
                    {todo.title}
                </span>
            </label>
            {userId && todo.userId === userId && (
                <button onClick={() => onDelete(todo.id)} className="p-2">
                    <Trash2 size={20} className="text-gray-500" />
                </button>
            )}
        </div>
    );
}


