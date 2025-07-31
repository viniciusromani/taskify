import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { PageLoading } from "@/components/PageLoading";
import { Button } from "@/components/shadcn/button";
import { EmptyState, FilterBadge, TaskCard } from "@/components/tasks";
import { getTasks, type TaskStatusResponse } from "@/services/tasks";

function Tasks() {
  const [statusFilter, setStatusFilter] = useState<"all" | TaskStatusResponse>(
    "all",
  );
  const {
    isPending,
    isError,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const filteredTasks = useMemo(() => {
    if (isPending || !tasks) return [];
    return (
      tasks?.filter(
        (task) => statusFilter === "all" || task.status === statusFilter,
      ) ?? []
    );
  }, [isPending, tasks, statusFilter]);

  return (
    <div className="flex flex-col flex-1 my-8">
      <div className="flex flex-col">
        <Button className="flex self-end bg-primary text-white rounded-2xl size-fit p-2">
          <Plus />
          <span>Adicionar</span>
        </Button>
      </div>
      <div className="flex flex-col flex-1 space-y-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Tasks</h1>

        {isPending ? (
          <PageLoading />
        ) : isError ? (
          <div>Show error {error.message}</div>
        ) : (
          <>
            <div className="flex space-x-2">
              <FilterBadge
                name="Todas"
                value="all"
                current={statusFilter}
                onClick={() => setStatusFilter("all")}
              />
              <FilterBadge
                name="Pendentes"
                value="pending"
                current={statusFilter}
                onClick={() => setStatusFilter("pending")}
              />
              <FilterBadge
                name="Concluídas"
                value="finished"
                current={statusFilter}
                onClick={() => setStatusFilter("finished")}
              />
            </div>
            <div className="space-y-3 sm:space-y-4">
              {!filteredTasks.length ? (
                <EmptyState />
              ) : (
                filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Tasks;
