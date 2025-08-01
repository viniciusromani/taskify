import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { register } from "@/services/auth";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome tem que ter no mínimo 2 caracteres" })
    .max(70, { message: "Nome não pode ser maior que 70 caracteres" })
    .regex(/^[a-zA-Z\s.-]+$/, {
      message: "Nome pode ter apenas letras, espaço, hífen e ponto-final.",
    }),
  email: z.email("Email inválido"),
  password: z.string().min(3, "Senha tem que ter no mínimo 3 caracteres"),
});
type RegisterData = z.infer<typeof schema>;

function RegisterForm({
  onRegisterSuccess,
}: {
  onRegisterSuccess: () => void;
}) {
  const form = useForm<RegisterData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterData) => mutation.mutate(data);
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: onRegisterSuccess,
  });

  if (mutation.isError) {
    // TODO: improve error handling and error messages
    toast.error(mutation.error.message);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Entre seu nome" {...field} />
              </FormControl>
              <FormMessage data-cy="name-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Entre seu email" {...field} />
              </FormControl>
              <FormMessage data-cy="email-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Entre sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage data-cy="password-error" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          isLoading={mutation.isPending}
          data-cy="register-button"
        >
          Criar conta
        </Button>
      </form>
    </Form>
  );
}

export { RegisterForm };
