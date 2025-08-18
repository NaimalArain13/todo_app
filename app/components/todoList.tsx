"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addTodo, removeTodo, completedTodos } from "@/store//todoSlice";
import { Input } from "@/components/ui/input"; // Assuming from ShadCN
import { Button } from "@/components/ui/button"; // Assuming from ShadCN
import { useState } from "react";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-2">My Todo List</h1>
      <p className="text-lg mb-6">Organize your tasks effortlessly</p>
      
      <div className="flex items-center space-x-2 mb-6">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow w-full p-3 rounded-lg border border-gray-300"
        />
        <Button onClick={handleAddTodo} className="p-3 bg-blue-500 text-white rounded-lg">
          Add Todo
        </Button>
      </div>

      {/* Display the list of todos */}
      <div className="w-full max-w-md space-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
            <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
            <div className="flex space-x-2">
              <Button onClick={() => dispatch(completedTodos(todo.id))} className="bg-green-500 text-white rounded px-3">
                Toggle
              </Button>
              <Button onClick={() => dispatch(removeTodo(todo.id))} className="bg-red-500 text-white rounded px-3">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
