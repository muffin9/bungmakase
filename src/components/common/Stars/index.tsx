import Image from 'next/image';

interface StarProps {
  starSize: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
  starScore: number;
}

const starSizes = {
  xSmall: 12,
  small: 16,
  medium: 20,
  large: 24,
  xLarge: 32,
} as const;

const Stars = ({ starSize = 'medium', starScore }: StarProps) => {
  const size = starSizes[starSize];

  const filledStars = Array.from({ length: Math.floor(starScore) }).map(
    (_, index) => (
      <Image
        key={`star-filled-${index}`}
        src={'/images/svg/star-fill.svg'}
        alt="star"
        width={size}
        height={size}
      />
    ),
  );

  const emptyStars = Array.from({ length: 5 - Math.floor(starScore) }).map(
    (_, index) => (
      <Image
        src={'/images/svg/star-empty.svg'}
        key={`star-empty-${index}`}
        alt="empty Star"
        width={size}
        height={size}
      />
    ),
  );

  return (
    <div className="flex gap-2 items-center">
      {filledStars}
      {emptyStars}
    </div>
  );
};

export default Stars;
