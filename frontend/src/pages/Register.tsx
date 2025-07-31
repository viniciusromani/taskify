import { User } from "lucide-react";
import { useNavigate } from "react-router";

import { RegisterForm } from "@/components/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 my-8 mx-4 items-center space-y-8">
      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
        <User className="w-6 h-6 text-primary-foreground" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-foreground">Crie sua conta</h1>
        <p className="text-muted-foreground text-center">
          Junte-se a nós hoje e registre-se em segundos
        </p>
      </div>
      <Card className="w-full sm:max-w-xl">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Registrar</CardTitle>
          <CardDescription className="text-center">
            Forneça suas informações para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm onRegisterSuccess={() => navigate("/login")} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
