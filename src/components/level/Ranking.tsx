'use client';

import { rankingType } from '@/types/level';
import { AnimatePresence, motion } from 'framer-motion';

const dummyDataRecords: rankingType[] = [
  { rank: 1, nickname: '붕붕왕1', level: 1, recentBungCount: 200 },
  { rank: 2, nickname: '붕붕왕2', level: 2, recentBungCount: 100 },
  { rank: 3, nickname: '붕붕왕3', level: 3, recentBungCount: 50 },
];

export function Ranking() {
  return (
    <div className="w-full bg-[#FFF7E7]">
      <div className="p-6 text-center text-amber-800 font-bold text-lg">
        붕최몇 랭킹
      </div>

      {/* Ranking list */}
      <AnimatePresence>
        {dummyDataRecords.map((record: rankingType, index) => (
          <motion.div
            key={record.rank}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border-b border-amber-200 p-6 flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-800">{index + 1}</span>
              <span className="text-amber-800">{record.nickname}</span>
            </div>
            <div className="text-amber-800">{record.recentBungCount}개</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
