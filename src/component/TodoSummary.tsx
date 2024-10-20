import { Todo } from "../types/todos";
interface TodoSummaryProps{
    todos: Todo[];
    deleteAllCompleted:() => void;
}

export default function Todosummary({ todos, deleteAllCompleted }: TodoSummaryProps) {
 
    const completedTodos = todos.filter(todo => todo.completed);

    return(
        <div className="text-center space-y-2">
            <p className="text-sm font-medium">
            {completedTodos.length}/{todos.length} todos completed
            </p>
            {completedTodos.length > 0 && (
                <button  onClick={deleteAllCompleted} className="text-red-500 hover:underline txt-sm font-medium">
                    delet all completed
                </button>
            )}
        </div>
        )
    
    }


