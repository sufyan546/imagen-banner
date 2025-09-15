import React, { useState, useRef } from 'react';

interface FileUploaderProps {
  title: string;
  onFileSelect: (file: { file: File, dataUrl: string } | null) => void;
  disabled: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ title, onFileSelect, disabled }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setFileName(file.name);
        onFileSelect({ file, dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContainerClick = () => {
    if (!disabled && !fileName) {
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
        className={`relative flex-grow flex items-center justify-center border-2 border-dashed rounded-xl transition-colors ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-cyan-500'} ${fileName ? 'border-solid border-slate-600' : 'border-slate-600'}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="text/plain,.md,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          disabled={disabled}
        />
        {fileName ? (
          <div className="text-center text-slate-300 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="mt-2 text-sm break-all">{fileName}</p>
            <button
              onClick={handleClearFile}
              disabled={disabled}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/80 transition-all"
              aria-label="Remove File"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
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