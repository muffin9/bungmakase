import { useShopHomeInfo } from '@/api/shop/info';
import { Clock, Fish, MapPin, Phone } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import LoadingSpinner from '../common/LoadingSpinner';
import KakaoPlaceStaticMap from '../common/KakaoPlaceStaticMap';

const HomeComponent = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { data: shopHomeInfo, isPending } = useShopHomeInfo(id as string);

  if (isPending) {
    return <LoadingSpinner text="붕어빵 가게 정보를 불러오고 있습니다." />;
  }

  const getCoordinates = (): { latitude: number; longitude: number } | null => {
    const lat = searchParams.get('latitude');
    const lng = searchParams.get('longitude');

    if (!lat || !lng) return null;

    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    };
  };

  const coordinates = getCoordinates();

  return (
    <>
      {shopHomeInfo && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <span className="text-sm font-light">
              {shopHomeInfo.startTime} ~ {shopHomeInfo.endTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={20} />
            <span className="text-sm font-light">{shopHomeInfo.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fish size={20} />
            <span className="text-sm font-light">
              {shopHomeInfo.tastes.join(', ')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={20} />
            <span className="text-sm font-light">{shopHomeInfo.phone}</span>
          </div>

          {coordinates && (
            <KakaoPlaceStaticMap
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
            />
          )}
        </div>
      )}
    </>
  );
};

export default HomeComponent;
