import { Calendar, CheckCircle2, Clock, MessageSquare } from "lucide-react";

import { Badge } from "@/components/shadcn/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { cn } from "@/lib/utils";
import type { TaskResponse } from "@/services/tasks";

const iconConfig = {
  pending: {
    label: "Pendente",
    icon: Clock,
    color:
      "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
  },
  finished: {
    label: "Concluída",
    icon: CheckCircle2,
    color:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  },
};

function TaskCard({ task }: { task: TaskResponse }) {
  const Config = iconConfig[task.status];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col">
        <div className="w-full flex justify-between gap-2 items-center">
          <CardTitle className="leading-6">{task.title}</CardTitle>
          <Badge
            variant="outline"
            className={cn(
              "font-medium transition-all duration-200 text-xs sm:text-sm px-2 py-1",
              Config.color,
            )}
          >
            <Config.icon className="w-3 h-3 mr-1 flex-shrink-0" />
            {Config.label}
          </Badge>
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
