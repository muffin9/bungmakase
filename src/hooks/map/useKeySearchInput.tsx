/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchPlaceStore } from '@/store/useSearchPlace';
import useGeolocation from './useGeolocation';
import { SearchPlaceType } from '@/types/map';

declare global {
  interface Window {
    kakao: any;
  }
}

function useKeySearchInput() {
  const location = useGeolocation();
  const { setResultSearchInfo } = useSearchPlaceStore();

  const placesSearchCallBack = (data: SearchPlaceType[], status: string) => {
    if (
      status === window.kakao.maps.services.Status.OK ||
      status === window.kakao.maps.services.Status.ZERO_RESULT
    ) {
      const searchPlaceInfos = data.map((place: SearchPlaceType) => ({
        place_id: +place.id,
        place_name: place.place_name,
        address: place.address_name,
        road_address_name: place.road_address_name,
        latitude: +place.y,
        longitude: +place.x,
        detail_link: place.place_url,
        distance: (+place.distance / 1000).toFixed(1),
      }));
      // set searchPlaceInfos to state
      setResultSearchInfo(searchPlaceInfos);
    }
    if (status === window.kakao.maps.services.Status.ERROR) {
      // 검색 결과 중 오류가 발생했습니다.
    }
  };

  async function searchAddressToCoordinate(address: string) {
    const kakaoSearchService = new window.kakao.maps.services.Places();
    return kakaoSearchService.keywordSearch(address, placesSearchCallBack, {
      location: new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      ),
    });
  }

  return { searchAddressToCoordinate };
}

export default useKeySearchInput;
