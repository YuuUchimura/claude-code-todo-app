'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

type CreateTodoFormProps = {
  onSuccess?: () => void;
};

export const CreateTodoForm = ({ onSuccess }: CreateTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
      
      setTitle('');
      setDescription('');
      onSuccess?.();
    } catch (error) {
      console.error('Error creating todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいタスクを入力"
        required
      />
      <Input
        label="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="タスクの詳細（オプション）"
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '作成中...' : 'タスクを追加'}
      </Button>
    </form>
  );
};