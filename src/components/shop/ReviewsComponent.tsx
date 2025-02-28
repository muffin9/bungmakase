import { useShopReviews } from '@/api/shop/info';
import { useParams, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ShopReviewType } from '@/types/map';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import Stars from '../common/Stars';

const ReviewsComponent = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: shopReviews, isPending } = useShopReviews(id as string);

  if (isPending) {
    return <LoadingSpinner text="후기를 불러오고 있습니다." />;
  }

  return (
    <div>
      <div className="px-6 py-2 flex justify-between items-center gap-2 bg-[#FAFAFA]">
        <p className="text-sm">이곳의 후기를 추가해 보세요!</p>
        <Button
          className="w-[115px] h-[40px] bg-[#ffeed0] text-[#ffa914] hover:bg-[#ffeed0]/70"
          onClick={() => router.push(`/review/create?id=${id}`)}
        >
          <Edit size={20} />
          <span>후기 작성</span>
        </Button>
      </div>
      <div className="px-6 py-4 flex flex-col gap-8">
        {shopReviews?.map((review: ShopReviewType) => (
          <div key={review.reviewId} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Image
                src={review.profileImageUrl}
                alt="profile image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>레벨 {review.userLevel}</div>
              <span>{review.nickname}</span>
            </div>
            {/* TODO: starScore 값 백엔드에서 받아온 데이터로 변경 필요 */}
            <Stars starSize="small" starScore={5} />
            <div>
              <p>{review.reviewText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsComponent;
