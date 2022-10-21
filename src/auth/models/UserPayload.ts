export interface UserPayload {
  sub: string;
  email: string;
  activeUser: boolean;
  role: string;
  iat?: number;
  exp?: number;
}
