'use client';

import { useModalStore } from '@/hooks/useModalStore';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function GlobalModal() {
  const { isOpen, content, closeModal } = useModalStore();

  if (!content) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={closeModal}
      titleElement={content.title}
    >
      <div className="flex flex-col items-center gap-6">
        <p
          className={cn(
            'text-center text-lg',
            content.type === 'error' ? 'text-destructive' : 'text-primary',
          )}
        >
          {content.description}
        </p>
        <Button
          className="w-full"
          variant={content.type === 'error' ? 'secondary' : 'default'}
          onClick={closeModal}
        >
          확인
        </Button>
      </div>
    </Modal>
  );
}
