import { Calendar, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import type { TaskResponse } from "@/services/tasks";

import { StatusBadge } from "./StatusBadge";

function TaskCard({ task }: { task: TaskResponse }) {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full cursor-pointer"
      onClick={() => navigate(task.id)}
      data-cy="task-card"
    >
      <CardHeader className="flex flex-col">
        <div className="w-full flex justify-between gap-2 items-center">
          <CardTitle className="leading-6">{task.title}</CardTitle>
          <StatusBadge status={task.status} />
        </div>
        <CardDescription className="flex flex-col space-y-3 mt-4">
          <div className="flex flex-row gap-2 items-start">
            <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            {task.description ?? "-"}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Calendar className="h-4 w-4" />
            {new Date(task.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
            })}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export { TaskCard };
