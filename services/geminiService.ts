import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SERVICES } from "../constants";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeStyle = async (
  userDescription: string,
  imageBase64?: string
): Promise<{ suggestion: string; recommendedServiceId: string | null }> => {
  try {
    const ai = getAiClient();
    const serviceNames = SERVICES.map(s => s.name).join(", ");
    
    let promptText = `
      You are an elite barber stylist consultant for "Crown & Clipper".
      Your goal is to recommend a specific haircut or beard style based on the user's input.
      
      Available Services: ${serviceNames}.
      
      User Description: "${userDescription}"
      
      Task:
      1. Analyze the face shape and hair texture if an image is provided.
      2. If no image, base it on the description.
      3. Recommend ONE specific style (e.g., "Textured Crop with Mid Fade", "Classic Pompadour").
      4. Explain WHY it suits them in 2-3 sentences.
      5. Match it to one of our Available Services closest to the need (e.g. if it involves a beard, pick Beard Sculpting, otherwise Signature Haircut).
      
      Return the response in JSON format with the keys: "suggestion" (the text explanation) and "matchedServiceName" (exact string match from list).
    `;

    const parts: any[] = [{ text: promptText }];
    
    if (imageBase64) {
      // Clean base64 string if it has the data url prefix
      const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
      
      parts.push({
        inlineData: {
          mimeType: "image/jpeg", // Assuming jpeg for simplicity from input, or extract from string
          data: cleanBase64
        }
      });
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Good for multimodal analysis
      contents: { parts },
      config: {
        responseMimeType: "application/json"
      }
    });

    const responseText = response.text;
    if (!responseText) throw new Error("No response from AI");

    const parsed = JSON.parse(responseText);
    
    const matchedService = SERVICES.find(s => s.name === parsed.matchedServiceName);

    return {
      suggestion: parsed.suggestion,
      recommendedServiceId: matchedService ? matchedService.id : null
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      suggestion: "I'm having trouble connecting to the styling database right now. However, our 'Signature Haircut' is always a safe and stylish bet!",
      recommendedServiceId: 's1' // Fallback
    };
  }
};
