'use client';

import { useState } from 'react';

export const useToggleTodo = () => {
  const [isToggling, setIsToggling] = useState<number | null>(null);

  const toggleTodo = async (id: number, completed: boolean) => {
    setIsToggling(id);
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle todo');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error toggling todo:', error);
      throw error;
    } finally {
      setIsToggling(null);
    }
  };

  return { toggleTodo, isToggling };
};