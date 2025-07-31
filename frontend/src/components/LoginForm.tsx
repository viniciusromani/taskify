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
import { useAuth } from "@/hooks/auth/auth";
import { login } from "@/services/auth";

const schema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(3, "Senha tem que ter no mínimo 3 caracteres"),
});
type LoginData = z.infer<typeof schema>;

function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const form = useForm<LoginData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser } = useAuth();
  const onSubmit = (data: LoginData) => mutation.mutate(data);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      setUser(user);
      onLoginSuccess();
    },
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Entre seu email" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" isLoading={mutation.isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
}

export { LoginForm };
