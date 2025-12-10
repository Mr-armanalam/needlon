export interface ClientProductItem {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  // category: string | null;
  // CatType: string | null;
  // SubCatType: string | null;
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
}