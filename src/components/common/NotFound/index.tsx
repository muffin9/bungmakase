import React from 'react';

const NotFound = ({ title }: { title?: string }) => {
  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <p className="text-xs">{title ? title : '데이터'}가 없습니다.</p>
    </div>
  );
};

export default NotFound;
