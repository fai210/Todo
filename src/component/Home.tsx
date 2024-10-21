
import { useEffect, useState } from "react"
// import TodoItem from "./component/TodoItem"
import { dummyData } from '../data/todo';
import AddTodoForme from './AddTodoForme';
import TodoList from './TodoList';
import Todosummary from './Todosummary';
import { Todo } from '../types/todos';



export default function Home() {


    const [todos, setTodos] = useState(() => {
        const savedTodos : Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        return savedTodos.length  > 0 ? savedTodos: dummyData;
      });



      useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
      },[todos])
    
    
      function setTodoCompleted (id:number, completed:boolean){
        
        setTodos((prevTodos) => 
        prevTodos.map((todo) => (todo.id === id ? {...todo, completed} : todo ))
      );
      }
     
    
      function addTodo(title: string){
        setTodos(prevTodos =>[
          {
            id: Date.now(),
            title,
            completed:false 
          },
          ...prevTodos
        ])
      }
    
      function deleteTodo(id:number) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
      }
    
      function deleteAllCompleted(){
        setTodos(prevTodos => prevTodos.filter(todo => todo.completed))
      }
    

  return (
    
    <main className=" bg-purple-300 h-screen space-y-5">
      <div className="font-bold text-3xl text-center pt-10">
            <h1>Add Your Tasks</h1>
       </div>
      <h2 className="text-lg text-center">
        Your Todos
      </h2>
      <div className="max-w-lg  mx-auto bg-slate-100 rounded-md p-5 space-y-6">
      <AddTodoForme onSubmit={addTodo}></AddTodoForme>
      <TodoList todos={todos} onCompletedChange={setTodoCompleted} onDelete={deleteTodo}></TodoList>
      </div>
      <Todosummary todos={todos} deleteAllCompleted={deleteAllCompleted}></Todosummary>
    </main>
  )
}
