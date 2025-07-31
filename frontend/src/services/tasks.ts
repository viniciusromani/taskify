import { api } from "./api";

type TaskStatusResponse = "pending" | "finished";
type TaskResponse = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatusResponse;
  createdAt: string;
};

async function getTasks() {
  return api.get<TaskResponse[]>("tasks");
}

export { getTasks, type TaskResponse, type TaskStatusResponse };
