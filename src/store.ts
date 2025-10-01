import { create } from "zustand";
import { devtools } from "zustand/middleware";


export interface Tanent{
    id: string;
    name: string;
    address: string;
    updatedAt: string;
    createdAt: string;
}


export interface User{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    tanent?: Tanent
}

interface AuthState{
    user: User | null;
    setUser: (user: User) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(devtools((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    logout: () => set({ user: null }),
})));