'use client';

import { Todo } from '@/entities/todo/model/types';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Button } from '@/shared/ui/Button';
import { useToggleTodo } from '@/features/toggle-todo/useToggleTodo';
import { useDeleteTodo } from '@/features/delete-todo/useDeleteTodo';

type TodoItemProps = {
  todo: Todo;
  onUpdate: () => void;
};

export const TodoItem = ({ todo, onUpdate }: TodoItemProps) => {
  const { toggleTodo, isToggling } = useToggleTodo();
  const { deleteTodo, isDeleting } = useDeleteTodo();

  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id, todo.completed);
      onUpdate();
    } catch (error) {
      // エラーは既にhook内でログ出力済み
    }
  };

  const handleDelete = async () => {
    if (confirm('このタスクを削除しますか？')) {
      try {
        await deleteTodo(todo.id);
        onUpdate();
      } catch (error) {
        // エラーは既にhook内でログ出力済み
      }
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isToggling === todo.id}
      />
      <div className="flex-1">
        <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
        )}
      </div>
      <Button
        variant="danger"
        onClick={handleDelete}
        disabled={isDeleting === todo.id}
        className="text-sm px-3 py-1"
      >
        {isDeleting === todo.id ? '削除中...' : '削除'}
      </Button>
    </div>
  );
};