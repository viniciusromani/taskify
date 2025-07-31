import { createContext } from "react";

import type { UserResponse } from "@/services/users";

type AuthContextType = {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };
