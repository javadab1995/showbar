import { createContext, useContext, useEffect, useState } from "react";

import supabase from "../services/supabase";

type UserProfile = {
  id: string;
  email: string;
  role: "admin" | "super_admin";
};

type AuthContextType = {
  user: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUserProfile(userId: string) {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, role")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("PROFILE ERROR:", error);
      setUser(null);
      return;
    }

    setUser(data);
    }
    
    async function signOut() {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("SIGN OUT ERROR:", error);
        return;
      }

      setUser(null);
    }

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (session?.user) {
        await loadUserProfile(session.user.id);
      }

      setLoading(false);
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

