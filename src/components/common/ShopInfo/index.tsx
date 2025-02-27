import { Star } from 'lucide-react';
import { SearchShopInfoType } from '@/types/map';

const ShopInfo = ({ shop }: { shop: SearchShopInfoType }) => {
  return (
    <div className="flex items-center p-4 gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg truncate">{shop.shopName}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>영업시간</span>
          <span>
            {shop.startTime} ~ {shop.endTime}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <div className="flex items-center gap-1">
                <span className="text-sm ml-1">별점</span>
                <span className="text-sm text-muted-foreground">
                  {shop.star}
                </span>
              </div>
            </div>

            <div className="text-xs">{shop.tastes.join(', ')}</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          거리: {shop.distance}km
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
