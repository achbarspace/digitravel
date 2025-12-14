import { GoogleGenAI } from "@google/genai";
import { Source, GroundingMetadata, GroundingChunk } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface GeminiResponse {
  text: string;
  sources: Source[];
}

export const queryGeminiWithSearch = async (prompt: string): Promise<GeminiResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        // Critical: Using Google Search Grounding tool
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType is NOT set to JSON when using Search Grounding as per guidelines
        systemInstruction: `You are DigiTravel, an expert, real-time global travel companion. 
        Your goal is to provide accurate, up-to-date, and helpful information to travelers exploring any part of the world.
        Use the Google Search tool to find the latest prices, opening hours, weather, events, and travel advisories for any location requested.
        Format your response nicely with clear paragraphs. Do not use markdown headers (like # or ##), use bolding for emphasis instead.
        Be welcoming, inspiring, and culturally aware of the destination being discussed.`
      },
    });

    const text = response.text || "I couldn't find an answer to that at the moment.";
    
    // Extract grounding chunks for citations
    // The SDK structure typically places groundingMetadata in candidates[0]
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata as GroundingMetadata | undefined;
    
    let sources: Source[] = [];
    
    if (groundingMetadata && groundingMetadata.groundingChunks) {
      sources = groundingMetadata.groundingChunks
        .map((chunk: GroundingChunk) => {
          if (chunk.web) {
            return {
              title: chunk.web.title,
              uri: chunk.web.uri,
            };
          }
          return null;
        })
        .filter((source): source is Source => source !== null);
        
      // Deduplicate sources based on URI
      sources = sources.filter((source, index, self) =>
        index === self.findIndex((t) => (
          t.uri === source.uri
        ))
      );
    }

    return {
      text,
      sources
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};