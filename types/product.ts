export interface ClientProductItem {
  id: string;
  name: string;
  tagName: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  categoryId: string,
  mrp_price: string | null; 
  price: string;
  quantity: number;
  material?: string | null;
  sizes?: string[] | null; 
  image: string | null;       
  modalImage: string[] | null; 
  averageRating: string; 
  reviewCount: number;
  isPremium: boolean;
  seasonType?: string;
}