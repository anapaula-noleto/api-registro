export interface UserPayload {
  sub: string;
  email: string;
  admin: boolean;
  iat?: number;
  exp?: number;
}
