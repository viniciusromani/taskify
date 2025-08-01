import { CheckCircle2, Clock } from "lucide-react";

import { Badge } from "@/components/shadcn/badge";
import { cn } from "@/lib/utils";
import type { TaskStatusResponse } from "@/services/tasks";

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

function StatusBadge({ status }: { status: TaskStatusResponse }) {
  const Config = iconConfig[status];

  return (
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
  );
}

export { StatusBadge };
