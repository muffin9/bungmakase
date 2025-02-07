import Image from 'next/image';

interface LogoProps {
  size?: 'xSmall' | 'small' | 'xMedium' | 'medium' | 'large';
  type?: 'default' | 'empty';
  className?: string;
}

const LOGO_SIZES = {
  xSmall: { width: 38, height: 26 },
  small: { width: 49, height: 34 },
  xMedium: { width: 78, height: 55 },
  medium: { width: 118, height: 82 },
  large: { width: 228, height: 159 },
} as const;

const Logo = ({ size = 'medium', type = 'default', className }: LogoProps) => {
  return (
    <Image
      src={type === 'default' ? `/images/logo.png` : `/images/logo-empty.png`}
      width={LOGO_SIZES[size].width}
      height={LOGO_SIZES[size].height}
      alt="Logo image"
      className={className}
    />
  );
};

export default Logo;
