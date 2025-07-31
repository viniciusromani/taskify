import { Lock } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 my-8 mx-4 items-center space-y-8">
      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
        <Lock className="w-6 h-6 text-primary-foreground" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-foreground">Bem vindo</h1>
        <p className="text-muted-foreground text-center">
          Acesse a sua conta para continuar
        </p>
      </div>
      <Card className="w-full sm:max-w-xl">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Login</CardTitle>
          <CardDescription className="text-center">
            Forneça email e senha para entrar no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onLoginSuccess={() => navigate("/tasks")} />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Não tem conta?{" "}
              <Button
                variant="link"
                className="px-0 font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <Link to="/register">Registre-se</Link>
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
