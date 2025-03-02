'use client';

import { useUserRankings } from '@/api/level/user';
import { rankingType } from '@/types/level';
import { AnimatePresence, motion } from 'framer-motion';

export function Ranking() {
  const { data: userRankings } = useUserRankings();

  return (
    <div className="w-full bg-[#FFF7E7] overflow-y-scroll pb-16">
      <div className="p-6 text-center text-amber-800 font-bold text-lg">
        붕최몇 랭킹
      </div>

      {/* Ranking list */}
      <AnimatePresence>
        {userRankings &&
          userRankings.map((record: rankingType) => (
            <motion.div
              key={record.nickname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: record.rank * 0.1 }}
              className="bg-white border-b border-amber-200 p-6 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-800">{record.rank}</span>
                <span className="text-amber-800">{record.nickname}</span>
              </div>
              <div className="text-amber-800">{record.recentBungCount}개</div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
