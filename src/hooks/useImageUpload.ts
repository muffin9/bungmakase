'use client';

import { useRef, useState } from 'react';

interface UseImageUploadProps {
  multiple?: boolean;
  maxFiles?: number;
}

export const useImageUpload = ({
  multiple = false,
  maxFiles = 5,
}: UseImageUploadProps = {}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length > 0) {
      setLoading(true);
      try {
        if (multiple) {
          const uploadedFiles = [...files, ...newFiles];
          if (uploadedFiles.length > maxFiles) {
            alert(`이미지는 최대 ${maxFiles}개까지 업로드할 수 있습니다.`);
            return;
          }
          setFiles(uploadedFiles);
        } else {
          // 단일 파일 업로드의 경우 마지막 파일만 사용
          setFiles([newFiles[0]]);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const removeImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    files,
    handleImageChange,
    handleImageClick,
    removeImage,
    isLoading,
  };
};
