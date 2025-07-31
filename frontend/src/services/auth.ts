import { api } from "./api";
import type { AuthenticatedUserResponse } from "./users";

type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};
type LoginRequest = {
  email: string;
  password: string;
};

function login(body: LoginRequest) {
  const path = "auth/login";
  return api.post<AuthenticatedUserResponse>(path, body);
}
function register(body: RegisterRequest) {
  const path = "auth/register";
  return api.post(path, body);
}

export { login, register };
