export interface AuthResponse {
  success: boolean;
  token: string;
  message?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
} 