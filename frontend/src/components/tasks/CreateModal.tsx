import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { kGetTasks } from "@/services/queryKeys";
import { postTask } from "@/services/tasks";

import { Switch } from "../shadcn/switch";

const schema = z.object({
  title: z.string().min(3, "Título tem que ter no mínimo 3 caracteres"),
  description: z
    .string()
    .min(3, "Descrição tem que ter no mínimo 3 caracteres")
    .optional()
    .or(z.literal("")),
  // TODO: it might be to generate possible values from type TaskStatusResponse
  status: z.enum(["pending", "finished"]),
});
type TaskData = z.infer<typeof schema>;

function CreateModal() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const form = useForm<TaskData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: undefined,
      status: "pending",
    },
  });

  const onSubmit = (data: TaskData) => {
    const payload = {
      ...data,
      description:
        data.description == undefined || data.description === ""
          ? null
          : data.description,
    };
    mutation.mutate(payload);
  };
  const mutation = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [kGetTasks] });
      setOpen(false);
    },
  });

  if (mutation.isError) {
    // TODO: improve error handling and error messages
    toast.error(mutation.error.message);
  }

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
          <DialogTitle>Nova task</DialogTitle>
          <DialogDescription>
            Crie uma nova task e começe a se organizar agora mesmo
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite a descrição aqui"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex justify-between">
                  <FormLabel>Marcar como concluída</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value === "finished"}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? "finished" : "pending");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              isLoading={mutation.isPending}
            >
              Criar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { CreateModal };
