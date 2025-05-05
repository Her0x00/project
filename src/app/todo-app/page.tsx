"use client"
import { useState } from "react"

export default function TodoPage() {

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (task.trim() === '') return; // Lägger int till tom tasks
        setTasks((prevTasks?) => [...prevTasks, task]); 
        setTask(''); // clearar input
    };

    const deleteTask = (indexToRemove: number) => {
        setTasks((prevTasks) => prevTasks.filter((_, index) => index !== indexToRemove)); // using the functional form of setState
    };
      

    return(
        <div className="max-w-md h-[600px] w-[800px] mx-auto mt-20 p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
  <h1 className="text-2xl font-bold mb-6 text-black text-center">Todo App</h1>
  <div className="flex mb-6">
    <input 
      type="text" 
      placeholder="Add new task"
      value={task}
      onChange={(e) => setTask(e.target.value)}
      className="flex-1 px-4 py-3 text-lg rounded-l border border-gray-300 placeholder-gray-400 focus:outline-none text-black"
    />
    <button onClick={addTask}
      className="px-6 bg-purple-500 text-white text-xl font-bold rounded-r hover:bg-purple-600"
    >
      +
    </button>
  </div>
  <ul className="space-y-3">
  {tasks.map((t, index) => (
    <li key={index} className="flex items-center">
      <span className="flex-1 px-4 py-2 bg-gray-100 rounded-l text-black">{t}</span>
      <button onClick={() => deleteTask(index)}
      className="bg-red-500 text-white px-3 py-2 rounded-r hover:bg-red-600">
        🗑️
      </button>
    </li>
  ))}
</ul>

</div>

    )
    
}
