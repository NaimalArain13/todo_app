// components/TodoItem.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { completedTodos, removeTodo } from '@/store/todoSlice';

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(completedTodos(todo.id))}
      />
      <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
      <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
    </div>
  );
};

export default TodoItem;
