import { api } from "./api";

type UserResponse = {
  id: string;
  name: string;
  email: string;
};

function getMe() {
  const path = "users/me";
  return api.get<UserResponse>(path);
}

export { getMe, type UserResponse };
