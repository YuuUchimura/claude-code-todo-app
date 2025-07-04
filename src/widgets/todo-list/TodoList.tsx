'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/entities/todo/model/types';
import { TodoItem } from './TodoItem';
import { CreateTodoForm } from '@/features/create-todo/CreateTodoForm';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Todoリスト</h1>
      
      <div className="mb-8">
        <CreateTodoForm onSuccess={fetchTodos} />
      </div>
      
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            タスクがありません。新しいタスクを追加してください。
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={fetchTodos}
            />
          ))
        )}
      </div>
    </div>
  );
};