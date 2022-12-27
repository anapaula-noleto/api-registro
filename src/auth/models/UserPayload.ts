export interface UserPayload {
  sub: number;
  email: string;
  activeUser: boolean;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}
