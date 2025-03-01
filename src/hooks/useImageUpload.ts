'use client';

import { useRef, useState } from 'react';

export const useImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length > 0) {
      setLoading(true);
      try {
        const uploadedFiles = [...files, ...newFiles];
        // 최대 5개로 제한
        if (uploadedFiles.length > 5) {
          alert('이미지는 최대 5개까지 업로드할 수 있습니다.');
          return;
        }
        setFiles(uploadedFiles);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return {
    fileInputRef,
    files,
    handleImageChange,
    removeImage,
    isLoading,
  };
};
