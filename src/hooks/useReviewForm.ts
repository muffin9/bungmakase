import { useState } from 'react';

export function useReviewForm() {
  const [formData, setFormData] = useState({
    files: [],
    starRating: 0,
    bungType: '',
    reviewContent: '',
  });

  const handleChange = (key: string, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return { formData, handleChange, handleSubmit };
}
