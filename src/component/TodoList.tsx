import { Todo } from "../types/todos";
import TodoItem from "./TodoItem";
import { useAuth } from "./context/AuthProvider";

interface TodoListProps {
    todos: Todo[];
    onCompletedChange:  (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
}

export default function TodoList({
    todos,
    onCompletedChange,
    onDelete,
}: TodoListProps) {
    const auth = useAuth(); 
    const userId = auth?.userI?.id; 

    
    const userTodos = userId ? todos.filter(todo => todo.userId === userId) : [];

   
    const todosSorted = userTodos.sort((a, b) => {
        if (a.completed === b.completed) {
            return b.id - a.id;
        }
        return a.completed ? 1 : -1;
    });

    return (
        <>
            <div className="space-y-2">
                {todosSorted.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onCompletedChange={(id, completed) => onCompletedChange(id, completed)}
                        onDelete={onDelete}
                    />
                ))}
            </div>
            {todosSorted.length === 0 && (
                <p className="text-center text-sm text-gray-500">
                    No todos yet. Add a new one above.
                </p>
            )}
        </>
    );
}
