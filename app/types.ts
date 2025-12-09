export type User = {
  id: number;
  name: string;
  price?: string;
  img?: string;
  url?: string; 
  [key: string]: any;
};
export type Categoria = {
  table_name: string;
};