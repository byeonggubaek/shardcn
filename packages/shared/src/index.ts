export const greet = (name: string): string => `Hello ${name}!`;

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}
export interface NavSubItem {
  id: string,
  title: string;
  href: string,  
  description: string;
}
export interface NavItem {
  id: string,
  title: string;
  img: string;
  description: string;
  sub_menus: NavSubItem[];
}