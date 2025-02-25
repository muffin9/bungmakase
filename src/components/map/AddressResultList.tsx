import { useSearchPlaceStore } from '@/store/useSearchPlace';
import { SearchPlaceInfoType } from '@/types/map';
import { Separator } from '../ui/separator';
import useGeolocation from '@/hooks/map/useGeolocation';

export function AddressResultList() {
  const { resultSearchInfo } = useSearchPlaceStore();
  const { setLocation } = useGeolocation();

  const handleClickAddress = (resultInfo: SearchPlaceInfoType) => {
    setLocation({
      latitude: resultInfo.latitude,
      longitude: resultInfo.longitude,
    });
  };

  return (
    <section className="flex flex-col gap-2 py-4">
      {resultSearchInfo.map((resultInfo: SearchPlaceInfoType) => {
        return (
          <div
            key={resultInfo.place_id}
            onClick={() => handleClickAddress(resultInfo)}
          >
            <div className="flex flex-col gap-2 py-2">
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center w-[50px] h-[20px] p-[5px] rounded-sm bg-[#EBEBEB] text-xs">
                  도로명
                </div>
                <span className="text-xs">{resultInfo.road_address_name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center w-[50px] h-[20px] p-[5px] rounded-sm bg-[#EBEBEB] text-xs">
                  지번
                </div>
                <span className="text-xs">{resultInfo.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center w-[50px] h-[20px] p-[5px] rounded-sm bg-[#EBEBEB] text-xs">
                  거리
                </div>
                <span className="text-xs">{resultInfo.distance}km</span>
              </div>
            </div>

            <Separator />
          </div>
        );
      })}
    </section>
  );
}
