import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { StyleSelector } from './components/StyleSelector';
import { PersonSelector } from './components/ModelSelector';
import { generateBanner, describeImage, describeCharacter, describePdf, describeFile } from './services/geminiService';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { ProfessionalPrompting } from './components/ProfessionalPrompting';
import { ImageReferences } from './components/ImageReferences';

const BANNER_STYLES = ['Minimal', 'Modern', 'Corporate', 'Luxury', 'Futuristic', 'Vibrant', 'Vintage'];
const ASPECT_RATIOS = [
  { value: '16:9', label: 'Website' },
  { value: '1:1', label: 'Social' },
  { value: '9:16', label: 'Story' },
  { value: '4:3', label: 'Photo' },
  { value: '3:4', label: 'PDF' },
];

interface ImageFile {
  file: File;
  dataUrl: string;
}

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [bannerStyle, setBannerStyle] = useState<string>(BANNER_STYLES[0]);
  const [aspectRatio, setAspectRatio] = useState<string>(ASPECT_RATIOS[0].value);
  const [colors, setColors] = useState<string>('');
  const [bannerText, setBannerText] = useState<string>('');
  const [reserveTextSpace, setReserveTextSpace] = useState<boolean>(false);
  
  const [referenceImage, setReferenceImage] = useState<ImageFile | null>(null);
  const [productImage, setProductImage] = useState<ImageFile | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<ImageFile | null>(null);
  const [pdfFile, setPdfFile] = useState<ImageFile | null>(null);
  const [documentFile, setDocumentFile] = useState<ImageFile | null>(null);
  const [addPerson, setAddPerson] = useState<boolean>(false);
  const [personPose, setPersonPose] = useState<string>('');
  const [characterImage, setCharacterImage] = useState<ImageFile | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate a banner.");
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      let fullPrompt = `Style: ${bannerStyle}. Prompt: ${prompt}.`;

      if (colors.trim()) {
        fullPrompt += ` Use a color palette of: ${colors.trim()}.`;
      }

      if (bannerText.trim()) {
        fullPrompt += ` The banner must prominently feature the text "${bannerText.trim()}". The text should be stylish and legible.`;
      }

      if (reserveTextSpace) {
        fullPrompt += ` Leave blank space for a headline text or logo placement.`;
      }
      
      if (referenceImage) {
        setLoadingMessage('Analyzing reference image...');
        const refDescription = await describeImage(referenceImage.dataUrl, referenceImage.file.type);
        fullPrompt += ` The banner should be inspired by this reference image description: ${refDescription}.`;
      }

      if (productImage) {
        setLoadingMessage('Analyzing product image...');
        const prodDescription = await describeImage(productImage.dataUrl, productImage.file.type);
        fullPrompt += ` The banner must feature a product with the following description: ${prodDescription}.`;
      }

      if (backgroundImage) {
        setLoadingMessage('Analyzing background image...');
        const bgDescription = await describeImage(backgroundImage.dataUrl, backgroundImage.file.type);
        fullPrompt += ` The banner's background should match this description: "${bgDescription}". The main subjects should be placed in this background.`;
      }

      if (pdfFile) {
        setLoadingMessage('Analyzing PDF document...');
        const pdfDescription = await describePdf(pdfFile.dataUrl, pdfFile.file.type);
        fullPrompt += ` The banner should be based on the following information from the PDF document: ${pdfDescription}.`;
      }

      if (documentFile) {
        setLoadingMessage('Analyzing document...');
        const docDescription = await describeFile(documentFile.dataUrl, documentFile.file.type);
        fullPrompt += ` The banner should be based on the following information from the provided document: ${docDescription}.`;
      }
      
      if (addPerson) {
        let personInstruction = ` The banner must also feature a person.`;

        if (characterImage) {
            setLoadingMessage('Analyzing character image...');
            const charDescription = await describeCharacter(characterImage.dataUrl, characterImage.file.type);
            personInstruction += ` The person must be consistent with this detailed description: "${charDescription}".`;
        }

        if (personPose.trim()) {
          personInstruction += ` The person's pose or action should be: "${personPose}".`;
        }
        if (productImage) {
            personInstruction += ` The person should be interacting with or presenting the described product in a natural and appealing way.`;
        }
        fullPrompt += personInstruction;
      }

      fullPrompt += ' 4K, ultra realistic, clean design, professional graphic design, highly polished, balanced composition.';

      setLoadingMessage('Generating your banner...');
      const generatedUrl = await generateBanner(fullPrompt, aspectRatio);
      setImageUrl(generatedUrl);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      setImageUrl(null);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [prompt, bannerStyle, aspectRatio, colors, bannerText, reserveTextSpace, referenceImage, productImage, backgroundImage, pdfFile, documentFile, isLoading, addPerson, personPose, characterImage]);

  const handleDownload = useCallback(() => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    const safePrompt = prompt.trim().replace(/[\s\W-]+/g, '_').slice(0, 50);
    const filename = safePrompt ? `${safePrompt}.jpeg` : 'generated_banner.jpeg';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrl, prompt]);
  
  const canGenerate = prompt.trim() !== '' && !isLoading;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-gray-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Controls Column */}
          <div className="flex flex-col space-y-6">
            <PromptInput
              title="1. Describe your banner"
              prompt={prompt}
              setPrompt={setPrompt}
              isLoading={isLoading}
            />
            
            <StyleSelector
                title="2. Choose a style"
                styles={BANNER_STYLES}
                selectedStyle={bannerStyle}
                setSelectedStyle={setBannerStyle}
                disabled={isLoading}
            />

            <AspectRatioSelector
              title="3. Choose aspect ratio"
              ratios={ASPECT_RATIOS}
              selectedRatio={aspectRatio}
              setSelectedRatio={setAspectRatio}
              disabled={isLoading}
            />

            <ProfessionalPrompting
              title="4. Advanced Options"
              colors={colors}
              onColorsChange={setColors}
              bannerText={bannerText}
              onBannerTextChange={setBannerText}
              reserveTextSpace={reserveTextSpace}
              onReserveTextSpaceChange={setReserveTextSpace}
              disabled={isLoading}
            />
            
            <ImageReferences
              title="5. Image & Document References (Optional)"
              onReferenceImageSelect={setReferenceImage}
              onProductImageSelect={setProductImage}
              onBackgroundImageSelect={setBackgroundImage}
              onPdfSelect={setPdfFile}
              onDocumentSelect={setDocumentFile}
              disabled={isLoading}
            />
            
            <PersonSelector
              title="6. Add a Person (Optional)"
              enabled={addPerson}
              onEnabledChange={setAddPerson}
              pose={personPose}
              onPoseChange={setPersonPose}
              onCharacterImageSelect={setCharacterImage}
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl shadow-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:bg-slate-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:opacity-70 transition-all duration-200"
            >
              {isLoading ? (loadingMessage || 'Generating...') : 'Generate Banner'}
            </button>
          </div>

          {/* Output Column */}
          <div className="flex flex-col space-y-4">
            <div 
              className="w-full bg-black/20 rounded-xl shadow-2xl flex items-center justify-center border border-slate-700 overflow-hidden" 
              style={{aspectRatio: aspectRatio.replace(':', ' / ')}}
            >
              {isLoading && <LoadingSpinner message={loadingMessage}/>}
              {error && !isLoading && <ErrorDisplay message={error} />}
              {imageUrl && !isLoading && !error && <ImageDisplay imageUrl={imageUrl} />}
              {!isLoading && !error && !imageUrl && (
                <div className="text-center text-slate-400 p-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium">Your generated banner will appear here</h3>
                  <p className="mt-1 text-sm text-slate-500">Fill in the details on the left and click "Generate" to start.</p>
                </div>
              )}
            </div>
             {imageUrl && !isLoading && !error && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center px-6 py-3 border border-cyan-500/50 text-cyan-400 font-medium rounded-lg hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200"
                  aria-label="Save generated banner"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Save Banner
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;