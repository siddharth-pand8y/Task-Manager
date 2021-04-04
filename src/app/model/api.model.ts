export interface TaskAPIModel {
  status: string;
  tasks?: Task[];
  users?: User[];
  error?: string;
}

export interface TaskCreationAPIModel {
  status: string;
  taskid?: string;
  error?: string;
}

export interface Task {
  id: string;
  message: string;
  assigned_to: string;
  assigned_name: string;
  created_on: string;
  due_date: string;
  priority: string;
}

export interface User {
  id: string;
  name: string;
  picture: string;
}
