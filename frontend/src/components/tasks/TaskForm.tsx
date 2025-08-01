import { zodResolver } from "@hookform/resolvers/zod";
import { type MutationFunction, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button } from "@/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Switch } from "@/components/shadcn/switch";
import { Textarea } from "@/components/shadcn/textarea";
import type { TaskResponse } from "@/services/tasks";

const schema = z.object({
  title: z.string().min(3, "Título tem que ter no mínimo 3 caracteres"),
  description: z
    .string()
    .min(3, "Descrição tem que ter no mínimo 3 caracteres")
    .nullable()
    .or(z.literal("")),
  // TODO: it might be to generate possible values from type TaskStatusResponse
  status: z.enum(["pending", "finished"]),
});
type TaskData = z.infer<typeof schema>;

function TaskForm({
  task,
  mutationFunc,
  onSuccess,
}: {
  task?: TaskResponse;
  mutationFunc: MutationFunction<TaskResponse, TaskData>;
  onSuccess: (task: TaskResponse) => void;
}) {
  const form = useForm<TaskData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? null,
      status: task?.status ?? "pending",
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
    mutationFn: mutationFunc,
    onSuccess: onSuccess,
  });

  if (mutation.isError) {
    // TODO: improve error handling and error messages
    toast.error(mutation.error.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col flex-1"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título" {...field} />
              </FormControl>
              <FormMessage data-cy="title-error" />
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
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage data-cy="description-error" />
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
                  className="cursor-pointer"
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
        <div className="flex flex-col flex-1 sm:hidden" />
        <div className="sm:w-full sm:flex sm:justify-center">
          <Button
            type="submit"
            className="w-full sm:w-1/4"
            isLoading={mutation.isPending}
            data-cy="submit-task-form"
          >
            {task != undefined ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { TaskForm };
