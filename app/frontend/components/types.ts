export interface User {
  email_address: string;
  role: string;
}

export enum UserRole {
  Admin = "admin",
}