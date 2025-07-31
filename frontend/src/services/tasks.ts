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

async function postTask(body: TaskRequest) {
  return api.post<TaskResponse>("tasks", body);
}

export { getTasks, postTask, type TaskResponse, type TaskStatusResponse };
