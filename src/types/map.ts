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

export interface MarkerType {
  shopId: string;
  address: string;
  shopName: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
  star: number;
  tastes: string[];
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
