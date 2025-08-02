import { Badge } from "@/components/shadcn/badge";
import { cn } from "@/lib/utils";
import type { TaskStatusResponse } from "@/services/tasks";

function FilterBadge({
  name,
  value,
  current,
  onClick,
}: {
  name: string;
  value: string;
  current: "all" | TaskStatusResponse;
  onClick: () => void;
}) {
  return (
    <Badge
      className={cn(
        "rounded-3xl border-transparent bg-gray-200 text-foreground hover:cursor-pointer",
        current === value && "bg-primary opacity-60 text-primary-foreground",
      )}
      onClick={onClick}
      data-cy={`filter-${value}`}
    >
      {name}
    </Badge>
  );
}

export { FilterBadge };
