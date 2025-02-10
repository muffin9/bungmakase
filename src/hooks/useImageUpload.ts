'use client';

import { useRef, useState } from 'react';

export const useImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState('');

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImage(file);
      setProfileImage(imageUrl as string);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    profileImage,
    handleImageChange,
    handleImageClick,
    isUploading,
  };
};
