export interface SearchPlaceType {
  address_name: string;
  category_color: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface SearchPlaceInfoType {
  place_id: number;
  place_name: string;
  address: string;
  road_address_name: string;
  latitude: number;
  longitude: number;
  detail_link: string;
  distance: string;
}

export interface SearchShopInfoType {
  shopId: string;
  shopName: string;
  address: string;
  latitude: number;
  longitude: number;
  star: number;
  startTime: string;
  endTime: string;
  imageUrl: string;
  tastes: string[];
  distance?: number;
}

export interface ShopHomeInfoType {
  shopId: string;
  shopName: string;
  address: string;
  startTime: string;
  endTime: string;
  phone: string;
  tastes: string[];
  imageUrls: string[];
}

export interface ShopPhotoType {
  photoId: string;
  imageUrl: string;
  updatedAt: string;
}

export interface ShopReviewType {
  reviewId: string;
  profileImageUrl: string;
  userLevel: number;
  nickname: string;
  bungImages: string[];
  reviewText: string;
  reviewTimestamp: string;
}
