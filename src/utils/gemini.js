import { GoogleGenerativeAI } from '@google/generative-ai';

const gemini = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

async function generateContentWithGemini(prompt, options = {}) {
  try {
    const model = gemini.getGenerativeModel({
      model: 'gemini-2.0-pro-exp-02-05',
    }); // Use the appropriate model

    const generationConfig = {
      temperature: options.temperature ?? 0.9,
      topP: options.topP ?? 1,
      topK: options.topK ?? 32,
      maxOutputTokens: options.maxOutputTokens ?? 2048,
      ...options,
    };

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings: options.safetySettings,
    });

    const response = await result.response;
    const text = response.text();

    return { success: true, text };
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    return {
      success: false,
      error: error.message || 'An unknown error occurred.',
      rawError: error,
    };
  }
}

export { generateContentWithGemini };
