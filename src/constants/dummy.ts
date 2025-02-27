import { SearchShopInfoType } from '@/types/map';

export interface Store {
  id: string;
  name: string;
  imageUrl: string;
  businessHours: string;
  rating: number;
  type: string;
  distance: string;
}

export const storeData: SearchShopInfoType[] = [
  {
    shopId: '1',
    shopName: '붕어빵 가게 이름',
    // imageUrl: '/images/sample_store.jpg',
    startTime: '01:00',
    endTime: '12:00',
    address: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
    latitude: 37.494589,
    longitude: 126.868346,
    star: 5,
    tastes: ['팥', '슈크림', '호두'],
    // distance: '현재 위치로부터 거리',
  },
  {
    shopId: '2',
    shopName: '붕어빵 가게 이름',
    // imageUrl: '/images/sample_store.jpg',
    startTime: '01:00',
    endTime: '12:00',
    address: '망원',
    latitude: 37.494589,
    longitude: 126.868346,
    star: 4,
    tastes: ['팥', '슈크림'],
    // distance: '현재 위치로부터 거리',
  },
];

export const bungDogamData = [
  {
    id: 'dogam1',
    name: '팥',
  },
  {
    id: 'dogam2',
    name: '슈크림',
  },
  {
    id: 'dogam3',
    name: '호두',
  },
  {
    id: 'dogam4',
    name: '치즈',
  },
  {
    id: 'dogam5',
    name: '딸기',
  },
  {
    id: 'dogam6',
    name: '초코',
  },
  {
    id: 'dogam7',
    name: '녹차',
  },
];
