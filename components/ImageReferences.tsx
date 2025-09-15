import React from 'react';
import { ImageUploader } from './ImageUploader';
import { PdfUploader } from './PdfUploader';
import { FileUploader } from './FileUploader';

interface ImageFile {
  file: File;
  dataUrl: string;
}

interface ImageReferencesProps {
    title: string;
    onReferenceImageSelect: (file: ImageFile | null) => void;
    onProductImageSelect: (file: ImageFile | null) => void;
    onBackgroundImageSelect: (file: ImageFile | null) => void;
    onPdfSelect: (file: ImageFile | null) => void;
    onDocumentSelect: (file: ImageFile | null) => void;
    disabled: boolean;
}

export const ImageReferences: React.FC<ImageReferencesProps> = ({
    title,
    onReferenceImageSelect,
    onProductImageSelect,
    onBackgroundImageSelect,
    onPdfSelect,
    onDocumentSelect,
    disabled
}) => {
    return (
        <div className="p-6 rounded-2xl shadow-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-slate-300 mb-4">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUploader
                title="Reference"
                onImageSelect={onReferenceImageSelect}
                disabled={disabled}
              />
              <ImageUploader
                title="Product"
                onImageSelect={onProductImageSelect}
                disabled={disabled}
              />
              <ImageUploader
                title="Background"
                onImageSelect={onBackgroundImageSelect}
                disabled={disabled}
              />
              <PdfUploader
                title="PDF Document"
                onPdfSelect={onPdfSelect}
                disabled={disabled}
              />
              <FileUploader
                title="Other Document"
                onFileSelect={onDocumentSelect}
                disabled={disabled}
              />
            </div>
        </div>
    );
};