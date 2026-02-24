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
export interface Invoice {
  id: string;
  inv_dt: Date;
  seller_id: string;
  seller_name: string;
  area_name: string;
  payment_status: string;
  payment_method: string;
  payment_status_color: string;
  payment_method_color: string;
  qty: number;
  price: number;
  amount: number;
}
export interface ColDesc {
  id: string;
  title: string;
  type: string;
  width?: number;
  summary?: string;
  aggregate?: number;
}
export interface InvoiceSummarySub {
  amount: number;
}
export interface InvoiceSummary {
  month: string;
  sub_amounts: InvoiceSummarySub[];
}
