export interface User {
  name: string;
  // You can extend this with email, id, role, etc.
  // id: number;
  // email: string;
  // role: "admin" | "customer";
}

export interface AuthType {
    user: User | null;
    isLoading: boolean;
    login: (userName: string, password: string) => Promise<boolean>;
    logout: () => void;
}