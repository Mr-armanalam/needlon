import { Address } from "./address";

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

export interface OrderItemProp {
  orderDate: Date;
  orderId: string;
  shippingAddress: Address;
  paymentMode: string;
  shippingCharge: number;
  podCharge: number;
  priceAtperchage: number;
  productId: string;
  image: string;
  orderProperties?: string;
  itemName: string;
  couponDiscount: number;
  totalPurchasePrice: number;
}

export interface suggestionAndRecentSearch {
  id: string;
  name: string;
  category: string;
  subcategory: string;
}

export interface searchSuggestionProps {
  heading_name: string;
  recent: suggestionAndRecentSearch[],
  handleOnSelect: (item: suggestionAndRecentSearch) => void
}

export interface ProductItemResult {
  id: string;
  categoryId: string;
  name: string;
  tagName: string;
  mrp_price: string | null;
  price: string;
  image: string | null;
  modalImage: string[] | null;
  quantity: number;
  averageRating: string;
  reviewCount: number;
  isPremium: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface ClientProductItemWithCategory extends ProductItemResult {
  category: string | null;
  CatType: string | null;
  SubCatType: string | null;
}

type ProductData = {
  id: string;
  name: string;
  price: number;
  image: string;
  modalImage?: string[] | null;
  sizes?: string[];
  category?: string;
  catType?: string;
};

type Product = {
  productData: ProductData[] | [];
  productTagDes: {
    descriptiveContent: string;
    contentTag: string;
  };
};