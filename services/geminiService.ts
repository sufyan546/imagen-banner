import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    // This provides a clearer error message upfront if the API key is missing.
    throw new Error("API Key is not configured. Please ensure it is set in your environment.");
}
  
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Function to get a text description of an image
export const describeImage = async (base64Image: string, mimeType: string): Promise<string> => {
    const imagePart = {
        inlineData: {
            // The slice is to remove the "data:image/jpeg;base64," prefix
            data: base64Image.split(',')[1],
            mimeType,
        },
    };

    const textPart = {
        text: "Describe this image in detail for an AI image generator. Focus on objects, style, colors, and composition. Be concise and descriptive."
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error('Error calling Gemini API for image description:', error);
        throw new Error('Failed to analyze the image. The model may have refused the content.');
    }
};

export const describeCharacter = async (base64Image: string, mimeType: string): Promise<string> => {
    const imagePart = {
        inlineData: {
            data: base64Image.split(',')[1],
            mimeType,
        },
    };

    const textPart = {
        text: "Describe the person in this image in extreme detail for a consistent character reference in an AI image generator. Focus on facial features (shape, eyes, nose, mouth), hair style and color, skin tone, body type, and clothing. Be objective and precise."
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error('Error calling Gemini API for character description:', error);
        throw new Error('Failed to analyze the character image. The model may have refused the content.');
    }
};

export const describePdf = async (base64Pdf: string, mimeType: string): Promise<string> => {
    const pdfPart = {
        inlineData: {
            data: base64Pdf.split(',')[1],
            mimeType,
        },
    };

    const textPart = {
        text: "Summarize this PDF for a marketing banner. Extract the product name, key features, and target audience. Provide a concise summary to guide an AI image generator in creating a compelling visual."
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [pdfPart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error('Error calling Gemini API for PDF description:', error);
        throw new Error('Failed to analyze the PDF. The model may have refused the content.');
    }
};

export const describeFile = async (base64File: string, mimeType: string): Promise<string> => {
    const filePart = {
        inlineData: {
            data: base64File.split(',')[1],
            mimeType,
        },
    };

    const textPart = {
        text: "Summarize this document for a marketing banner. Extract the product name, key features, and target audience. Provide a concise summary to guide an AI image generator in creating a compelling visual."
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [filePart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error('Error calling Gemini API for file description:', error);
        throw new Error('Failed to analyze the file. The model may have refused the content.');
    }
};

export const generateBanner = async (prompt: string, aspectRatio: string): Promise<string> => {
  try {
    const fullPrompt = `A high-quality, professional banner with a clear subject and aesthetic composition. Final instructions: ${prompt}`;
    
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio as "1:1" | "16:9" | "9:16" | "4:3" | "3:4",
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
        throw new Error('Image generation failed: The API did not return any images. This might be due to a safety policy violation or an internal error.');
    }
  } catch (error) {
    console.error('Error calling Gemini API for banner generation:', error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error('The provided API Key is invalid. Please check your configuration.');
    }
    throw new Error('Failed to generate banner. The model may have refused the prompt. Please try a different, safer prompt.');
  }
};