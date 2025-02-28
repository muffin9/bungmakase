import { useShopPhotos } from '@/api/shop/info';
import { useParams } from 'next/navigation';
import LoadingSpinner from '../common/LoadingSpinner';
import Image from 'next/image';
import { ShopPhotoType } from '@/types/map';

const PhotosComponent = () => {
  const { id } = useParams();
  const { data: shopPhotos, isPending } = useShopPhotos(id as string);

  if (isPending) {
    return <LoadingSpinner text="사진을 불러오고 있습니다." />;
  }

  return (
    shopPhotos && (
      <div className="flex flex-wrap gap-2">
        {shopPhotos.map((photo: ShopPhotoType) => (
          <div key={photo.photoId}>
            <Image
              width={150}
              height={150}
              key={photo.photoId}
              src={photo.imageUrl}
              alt={`${photo.photoId} photo image`}
              className="rounded-md"
              // layout="responsive"
              // objectFit="cover"
            />
          </div>
        ))}
      </div>
    )
  );
};

export default PhotosComponent;
