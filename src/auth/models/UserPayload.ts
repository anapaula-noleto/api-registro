export interface UserPayload {
  sub: string;
  email: string;
  activeUser: boolean;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}
