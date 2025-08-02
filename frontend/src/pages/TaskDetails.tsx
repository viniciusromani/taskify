import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { PageLoading } from "@/components/PageLoading";
import { Button } from "@/components/shadcn/button";
import { StatusBadge } from "@/components/tasks/StatusBadge";
import { TaskForm } from "@/components/tasks/TaskForm";
import { kGetTaskDetails, kGetTasks } from "@/services/queryKeys";
import { deleteTask, getTaskDetails, patchTask } from "@/services/tasks";

function TaskDetails() {
  const queryClient = useQueryClient();
  const { taskId } = useParams();
  const navigate = useNavigate();

  const {
    isPending,
    isError,
    data: task,
    error,
  } = useQuery({
    queryKey: [kGetTaskDetails, taskId],
    queryFn: () => getTaskDetails(taskId!),
  });

  const mutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [kGetTasks] });
      toast.success("Tarefa deletada com sucesso!");
      navigate(-1);
    },
  });

  const onDelete = () => mutation.mutate(taskId!);

  const onUpdate = () => {
    queryClient.invalidateQueries({ queryKey: [kGetTaskDetails, taskId] });
    toast.success("Tarefa atualizada com sucesso!");
  };

  return (
    <div className="flex flex-col flex-1 my-8 sm:mx-16">
      {isPending ? (
        <PageLoading />
      ) : isError ? (
        <div>Show error {error.message}</div>
      ) : (
        <div className="flex flex-col flex-1 space-y-6">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </Button>
          <div className="sm:w-full sm:flex sm:justify-between">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {task.title}
            </h1>
            <Button
              variant="destructive"
              size="icon"
              className="hidden sm:block sm:size-8 sm:flex sm:justify-center"
              onClick={onDelete}
              isLoading={mutation.isPending}
              data-cy="task-delete"
            >
              <Trash2 />
            </Button>
          </div>
          <div className="flex space-x-2">
            <StatusBadge status={task.status} />
          </div>
          <div className="space-y-3 flex flex-col flex-1 sm:space-y-4">
            <TaskForm
              task={task}
              mutationFunc={(data) => patchTask(task.id, data)}
              onSuccess={onUpdate}
            />
            <Button
              variant="destructive"
              className="w-full sm:hidden"
              onClick={onDelete}
              isLoading={mutation.isPending}
              data-cy="task-delete"
            >
              Excluir
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDetails;
