export interface ClientProductItem {
  id: string;
  name: string;
  tagName: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string,
  mrp_price: string | null; 
  price: string;
  quantity: number;
  material: string | null;
  sizes: string[] | null; 
  image: string | null;       
  modalImage: string[] | null; 
  averageRating: string; 
  reviewCount: number;
  isPremium: boolean;
  seasonType: string;
}