import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(todos)
  }, [])
  
  

  const saveToLS=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id != id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id != id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="con bg-white px-9">
       
        <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[80vh] ">
           <h1 className="font-bold text-center text-xl">Taskly - Manage your tasks</h1>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h1 className="text-lg font-bold ">Add a Todo</h1>
            <input onChange={handleChange} value={todo} type="text" className='bg-slate-200 mr-1 rounded-md ' />
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 text-white px-1 hover:bg-violet-950 rounded-md disabled:bg-violet-500  h-8'>Save</button>
          </div>
          <h2 className='text-lg font-bold'>Your todo</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
            {
              todos.map(item => {
                return <div key={item.id} className="todo flex justify-between  my-3">
                  <div className='flex gap-5'>

                    <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className=" flex h-full">
                    <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 text-white px-1 hover:bg-violet-950 rounded-md mx-1'><FaEdit /></button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 text-white px-1 hover:bg-violet-950 rounded-md mx-1 text-2xl'><MdDelete /></button>
                  </div>

                </div>

              })
            }

          </div>
        </div>

      </div>

    </>
  )
}

export default App
