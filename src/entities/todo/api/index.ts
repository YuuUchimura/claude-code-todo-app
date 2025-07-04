import db from '@/shared/lib/db';
import type { Todo, CreateTodoInput, UpdateTodoInput } from '../model/types';

export const getAllTodos = (): Todo[] => {
  const stmt = db.prepare('SELECT * FROM todos ORDER BY created_at DESC');
  return stmt.all() as Todo[];
};

export const getTodoById = (id: number): Todo | undefined => {
  const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
  return stmt.get(id) as Todo | undefined;
};

export const createTodo = (input: CreateTodoInput): Todo => {
  const stmt = db.prepare(
    'INSERT INTO todos (title, description) VALUES (?, ?) RETURNING *'
  );
  return stmt.get(input.title, input.description || null) as Todo;
};

export const updateTodo = (id: number, input: UpdateTodoInput): Todo | undefined => {
  const updates: string[] = [];
  const values: any[] = [];
  
  if (input.title !== undefined) {
    updates.push('title = ?');
    values.push(input.title);
  }
  
  if (input.description !== undefined) {
    updates.push('description = ?');
    values.push(input.description);
  }
  
  if (input.completed !== undefined) {
    updates.push('completed = ?');
    values.push(input.completed ? 1 : 0);
  }
  
  if (updates.length === 0) {
    return getTodoById(id);
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(
    `UPDATE todos SET ${updates.join(', ')} WHERE id = ? RETURNING *`
  );
  return stmt.get(...values) as Todo | undefined;
};

export const deleteTodo = (id: number): boolean => {
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
};