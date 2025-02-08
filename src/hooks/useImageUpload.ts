'use client';

import { useState } from 'react';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File) => {
    try {
      setIsUploading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading };
};
