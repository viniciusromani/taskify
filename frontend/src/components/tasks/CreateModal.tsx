import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { kGetTasks } from "@/services/queryKeys";
import { postTask } from "@/services/tasks";

import { TaskForm } from "./TaskForm";

function CreateModal() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [kGetTasks] });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex self-end bg-primary text-white rounded-2xl size-fit p-2"
          onClick={() => setOpen(true)}
        >
          <Plus />
          <span>Adicionar</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova tarefa</DialogTitle>
          <DialogDescription>
            Crie uma nova tarefa e começe a se organizar agora mesmo
          </DialogDescription>
        </DialogHeader>
        <TaskForm
          task={undefined}
          mutationFunc={postTask}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}

export { CreateModal };
