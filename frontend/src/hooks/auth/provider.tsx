import { useEffect, useState } from "react";

import { getMe, type UserResponse } from "@/services/users";

import { AuthContext } from "./context";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * WARN: not using react-query since native fetch API
   * implementation is simpler than having to control
   * - setUser manually when using useQuery;
   * - whether or not it should fetch based on state variable
   */
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const me = await getMe();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
