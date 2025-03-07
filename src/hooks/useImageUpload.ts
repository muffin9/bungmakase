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

  const validateFileSize = (file: File): boolean => {
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 1) {
      alert(`파일 크기는 1MB 이하여야 합니다.`);
      return false;
    }
    return true;
  };

  const validateTotalSize = (newFiles: File[]): boolean => {
    const totalSizeInMB = newFiles.reduce(
      (total, file) => total + file.size / (1024 * 1024),
      0,
    );

    if (totalSizeInMB > 1) {
      alert(`전체 파일 크기는 1MB를 초과할 수 없습니다.`);
      return false;
    }
    return true;
  };

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

          // 전체 파일 크기 검증
          if (!validateTotalSize(uploadedFiles)) {
            return;
          }

          setFiles(uploadedFiles);
        } else {
          // 단일 파일 업로드의 경우 마지막 파일만 사용
          const validFiles = newFiles.filter(validateFileSize);

          if (validFiles.length !== newFiles.length) {
            alert('파일 크기는 1MB 이하여야 합니다.');
            return; // 크기 제한을 초과하는 파일이 있으면 중단
          }

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
