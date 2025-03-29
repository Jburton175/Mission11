export interface CartItem {
  bookId: number;
  title: string;
  price: number;
  quantity?: number; // Optional quantity field
}
