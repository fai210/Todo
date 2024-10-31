import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthProvider'; 
import { dummyData } from '../data/todo';
import AddTodoForm from './AddTodoForme';
import TodoList from './TodoList';
import Todosummary from "./TodoSummary";
import { Todo } from '../types/todos';

export default function Home() {
    const auth = useAuth(); 
    const userId = auth?.userI?.id; 

    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
        return savedTodos.length > 0 ? savedTodos : dummyData;
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function setTodoCompleted(id: number, completed: boolean) {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
        );
    }

    function addTodo(title: string) {
        if (!userId) return; 
        setTodos(prevTodos => [
            {
                id: Date.now(),
                title,
                completed: false,
                userId, 
            },
            ...prevTodos
        ]);
    }

    function deleteTodo(id: number) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }

    function deleteAllCompleted() {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed)); 
    }

    return (
        <main className="">
            <div className="font-bold text-3xl text-center pt-10">
                <h1>Add {auth?.userInfo } Tasks</h1>
            </div>
            <h2 className="text-lg text-center">Your Todos</h2>
            <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
                <AddTodoForm onSubmit={addTodo} />
                <TodoList todos={todos} onCompletedChange={setTodoCompleted} onDelete={deleteTodo} />
            </div>
            <Todosummary todos={todos} deleteAllCompleted={deleteAllCompleted} />
        </main>
    );
}


