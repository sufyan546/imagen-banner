
import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
  title: string;
  onImageSelect: (file: { file: File, dataUrl: string } | null) => void;
  disabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onImageSelect, disabled }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        onImageSelect({ file, dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContainerClick = () => {
    if (!disabled && !imagePreview) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="p-4 rounded-2xl shadow-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm h-full flex flex-col">
      <h3 className="block text-lg font-medium text-slate-300 mb-2">
        {title}
      </h3>
       <div 
        onClick={handleContainerClick}
        className={`relative flex-grow flex items-center justify-center border-2 border-dashed rounded-xl transition-colors ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-cyan-500'} ${imagePreview ? 'border-solid border-slate-600' : 'border-slate-600'}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          disabled={disabled}
        />
        {imagePreview ? (
          <>
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
            <button
              onClick={handleClearImage}
              disabled={disabled}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/80 transition-all"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <div className="text-center text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-1 text-sm">Click to upload</p>
          </div>
        )}
      </div>
    </div>
  );
};
