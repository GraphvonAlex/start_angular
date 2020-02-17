export interface UserInterface {
  login: string;
  password: string;
  token?: string; // optional token
  isAuthenticated: boolean;
}
