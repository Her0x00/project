// app/page.tsx

"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";// Adjust the import path as necessary

// Define the shape of a Task (to match your SQLite schema)
interface Task {
  id: number;
  title: string;
  isdone: number;
  iscreatedat: string;
}

export default function TodoPage() {
  const {data: session} = authClient.useSession()
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  // Fetch tasks from the database on mount
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/todo");
      const data: Task[] = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, [session]);
  if (!session) {
    return <div className="text-center">Please log in to view your tasks.</div>;
  }

  // Add a new task to the database and frontend state
  const addTask = async () => {
    if (task.trim() === "") return;

    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task }),
    });

    const newTask: Task = await res.json();
    setTasks((prev) => [...prev, newTask]);
    setTask("");
  };

  // Delete a task from the database and frontend state
  const deleteTask = async (indexToRemove: number) => {
    const taskToDelete = tasks[indexToRemove];
    await fetch(`/api/todo`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskToDelete.id }),
    });

    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== indexToRemove));
  };

  // Start editing a task
  const startEditing = (index: number) => {
    setIsEditing(index);
    setEditTask(tasks[index].title);
  };

  // Save the edited task to the database and frontend state
  const saveEdit = async (index: number) => {
    if (editTask.trim() === "") return;

    const taskToUpdate = tasks[index];

    const res = await fetch(`/api/todo`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskToUpdate.id, title: editTask }),
    });

    const updatedTask: Task = await res.json();

    const updatedTasks = tasks.map((t, i) =>
      i === index ? updatedTask : t
    );

    setTasks(updatedTasks);
    setIsEditing(null);
    setEditTask("");
  };

  return (
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
        <button
          onClick={addTask}
          className="px-6 bg-purple-500 text-white text-xl font-bold rounded-r hover:bg-purple-600"
        >
          +
        </button>
      </div>
      <ul className="space-y-3">
        {tasks.map((t, index) => (
          <li key={t.id} className="flex items-center">
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-l text-black border border-gray-300"
                />
                <button
                  onClick={() => saveEdit(index)}
                  className="bg-green-500 text-white px-3 py-2 rounded-r hover:bg-green-600"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 px-4 py-2 bg-gray-100 rounded-l text-black">{t.title}</span>
                <button
                  onClick={() => startEditing(index)}
                  className="bg-blue-500 text-white px-3 py-2 hover:bg-blue-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-r hover:bg-red-600"
                >
                  🗑️
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
