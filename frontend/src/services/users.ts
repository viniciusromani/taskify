import { api } from "./api";

type UserResponse = {
  id: string;
  name: string;
  email: string;
};
type AuthenticatedUserResponse = UserResponse & { access_token: string };

function getMe() {
  const path = "users/me";
  return api.get<UserResponse>(path);
}

export { type AuthenticatedUserResponse, getMe, type UserResponse };
