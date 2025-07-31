import { createContext } from "react";

import type { UserResponse } from "@/services/users";

type AuthContextType = {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };
