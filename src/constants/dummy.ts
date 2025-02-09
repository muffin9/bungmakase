export interface Store {
  id: string;
  name: string;
  imageUrl: string;
  businessHours: string;
  rating: number;
  type: string;
  distance: string;
}

export const storeData: Store[] = [
  {
    id: '1',
    name: '붕어빵 가게 이름',
    imageUrl: '/images/sample_store.jpg',
    businessHours: '01:00에 영업 종료',
    rating: 4,
    type: '붕어빵 종류',
    distance: '현재 위치로부터 거리',
  },
  {
    id: '2',
    name: '붕어빵 가게 이름',
    imageUrl: '/images/sample_store.jpg',
    businessHours: '01:00에 영업 종료',
    rating: 4,
    type: '붕어빵 종류',
    distance: '현재 위치로부터 거리',
  },
];
