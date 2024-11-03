import { useAuth } from './context/AuthProvider'; 
import TodoList from './TodoList'; 
import Todosummary from "./TodoSummary";
import { Todo } from '../types/todos';
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import http from './http/http';
import AddTodoForme from './AddTodoForme';

export default function Home() {
    const auth = useAuth(); 
    const userId = auth?.userI?.id; 
    const queryClient=useQueryClient()

    const { data: todos=[], isLoading, isError } = useQuery<Todo[]>({
        queryKey: ["todos"], 
        queryFn:  () => {
            return http.get<Todo[]>("todo?userId="+ userId).then(response => response.data);
        },
        enabled: !!userId,
    });

    const deleteTodo = useMutation({
        mutationFn: (id: number) => http.delete(`todo/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["todos"]
            });
        },
    });

    const deleteCompleted = useMutation({
        mutationFn: () => http.delete(`todo/completed?userId=${userId}`), 
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["todos"]
            });
        },
    });
    const toggleCompleted = useMutation({
        mutationFn: (todo: Todo) => 
            http.put(`todo/${todo.id}`, { ...todo, completed: !todo.completed }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["todos"]
            });
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to get todos</p>;
    console.log(todos)
       
    
    const handleDelete = (id: number) => {
        deleteTodo.mutate(id);
    };

    const handleDeleteAllCompleted = () => {
        deleteCompleted.mutate();
    };
     
    const handleCompletedChange = (id: number, completed: boolean) => {
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (todoToUpdate) {
            toggleCompleted.mutate({ ...todoToUpdate, completed: !completed });
        }
    };

    return (
        <main className="">
            <div className="font-bold text-3xl text-center pt-10">
                <h1>Your Tasks, {auth?.userInfo}</h1>
            </div>
            <h2 className="text-lg text-center">Your Todos</h2>
            <div className="max-w-lg mx-auto bg-[#E5E1DA] rounded-md p-5 space-y-6">
               <AddTodoForme />
              <TodoList todos={todos || []}  onCompletedChange={handleCompletedChange} onDelete={handleDelete}/>
            </div>
            <Todosummary todos={todos || []} deleteAllCompleted={handleDeleteAllCompleted} />
        </main>
    );
}
