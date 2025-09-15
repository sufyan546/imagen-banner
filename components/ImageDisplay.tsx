
import React, { useState, useEffect } from 'react';

interface ImageDisplayProps {
  imageUrl: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [imageUrl]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <img
        src={imageUrl}
        alt="Generated banner"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-contain transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
