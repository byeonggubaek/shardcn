export const greet = (name: string): string => `Hello ${name}!`;

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}