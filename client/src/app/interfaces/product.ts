export interface Product {
  id: number;
  title: string;
  category: string[];
  description: string;
  image: string | null;
  price: number;
  sku: string;
  urlSlug: string
}
