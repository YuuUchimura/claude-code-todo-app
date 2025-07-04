export type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateTodoInput = {
  title: string;
  description?: string;
};

export type UpdateTodoInput = {
  title?: string;
  description?: string;
  completed?: boolean;
};