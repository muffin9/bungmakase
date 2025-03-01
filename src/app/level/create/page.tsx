import BackButton from '@/components/common/BackButton';
import { LevelForm } from '@/components/level/LevelForm';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function LevelCreatePage() {
  return (
    <section className="h-screen py-8">
      <header className="flex justify-between mb-2">
        <BackButton />
        <span>기록 추가</span>
        <div className="mr-8" />
      </header>
      <Separator />
      <div className="w-full pt-6 px-4">
        <LevelForm />
      </div>
    </section>
  );
}
