'use client';

import { useState } from 'react';

export const useDeleteTodo = () => {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const deleteTodo = async (id: number) => {
    setIsDeleting(id);
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    } finally {
      setIsDeleting(null);
    }
  };

  return { deleteTodo, isDeleting };
};