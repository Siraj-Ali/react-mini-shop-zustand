import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthType } from "../types/authType";

export const useAuthStore = create<AuthType>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,
            login: async (userName: string, password: any) => {
                set({isLoading: true})
                await new Promise((r) => setTimeout(r, 1000));
                if(userName === "user" && password === "12455") {
                    set({ user: {name: "User"}, isLoading: false });
                    
                    return true;
                }

                set({isLoading: false})

                return false;
            },
            logout: () => set({user: null}),
        }),

        {name: "auth-storage"}
    )
)