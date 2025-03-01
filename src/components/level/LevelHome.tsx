import Image from 'next/image';
import Link from 'next/link';
import { Ranking } from './Ranking';

export function LevelHome() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <Link href="/level/create">
        <p className="font-medium text-2xl text-center text-third pb-4">
          붕 레벨
        </p>
        <Image
          src="/images/bg_add_level.png"
          alt="add level"
          width={250}
          height={250}
        />
      </Link>
      <Ranking />
    </div>
  );
}
