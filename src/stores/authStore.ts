import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Storing password in plain text ONLY for mockup purposes
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  register: (user: Omit<User, 'id'>) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,

      register: async (userData) => {
        const { users } = get();
        // Check if email already exists
        if (users.some((u) => u.email === userData.email)) {
          return false; 
        }
        
        const newUser = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
        };

        set({ users: [...users, newUser] });
        return true;
      },

      login: async (email, password) => {
        const { users } = get();
        const user = users.find((u) => u.email === email && u.password === password);
        
        if (user) {
          // Store user without password in currentUser state
          const { password: _, ...userWithoutPassword } = user;
          set({ currentUser: userWithoutPassword as User });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ currentUser: null });
      },
    }),
    {
      name: 'pos-auth-storage', 
    }
  )
);
