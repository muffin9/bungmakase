import { Store } from '@/constants/dummy';
import { Star } from 'lucide-react';

const StoreInfo = ({ store }: { store: Store }) => {
  return (
    <div className="max-w-[300px] flex items-center p-4 gap-4">
      <div className="flex-grow min-w-0">
        <h3 className="text-lg truncate">{store.name}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>영업상태</span>
          <span>{store.businessHours}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm ml-1">별점</span>
          </div>
          <span className="text-sm text-muted-foreground">{store.type}</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {store.distance}
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
