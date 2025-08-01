import { api } from "./api";

type TaskStatusResponse = "pending" | "finished";
type TaskResponse = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatusResponse;
  createdAt: Date;
};
type TaskRequest = {
  title: string;
  description: string | null;
  status: TaskStatusResponse;
};

async function getTasks() {
  return api.get<TaskResponse[]>("tasks");
}

async function getTaskDetails(id: string) {
  return api.get<TaskResponse>(`tasks/${id}`);
}

async function postTask(body: TaskRequest) {
  return api.post<TaskResponse>("tasks", body);
}

async function patchTask(id: string, body: Partial<TaskRequest>) {
  return api.patch<TaskResponse>(`tasks/${id}`, body);
}

async function deleteTask(id: string) {
  return api._delete<TaskResponse>(`tasks/${id}`);
}

export {
  deleteTask,
  getTaskDetails,
  getTasks,
  patchTask,
  postTask,
  type TaskResponse,
  type TaskStatusResponse,
};
