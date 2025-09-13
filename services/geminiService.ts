
import { GoogleGenAI, Type } from "@google/genai";
import type { VisualData } from '../types';

const getResponseSchema = (visualType: 'mind_map' | 'flowchart' | 'list') => {
  switch (visualType) {
    case 'mind_map':
      // Define a schema with a fixed depth to avoid a "Maximum call stack size exceeded" error
      // caused by a direct recursive schema reference.
      const nodeProps = {
        label: { type: Type.STRING, description: 'The text label for this node.' },
        icon: { type: Type.STRING, description: 'A single, relevant, lowercase icon name from the lucide-react library (e.g., "brain", "settings", "lightbulb").' },
      };

      const level3Node = { // Deepest nodes, no children
        type: Type.OBJECT,
        properties: nodeProps,
        required: ['label', 'icon'],
      };

      const level2Node = {
        type: Type.OBJECT,
        properties: {
          ...nodeProps,
          children: { type: Type.ARRAY, items: level3Node },
        },
        required: ['label', 'icon'],
      };

      const level1Node = {
        type: Type.OBJECT,
        properties: {
          ...nodeProps,
          children: { type: Type.ARRAY, items: level2Node },
        },
        required: ['label', 'icon'],
      };

      return { // Root Node
        type: Type.OBJECT,
        properties: {
          ...nodeProps,
          children: { type: Type.ARRAY, items: level1Node },
        },
        required: ['label', 'icon'],
      };

    case 'flowchart':
      return {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING, description: 'The text label for this step.' },
            icon: { type: Type.STRING, description: 'A single, relevant, lowercase icon name from lucide-react.' },
            type: { type: Type.STRING, description: 'The type of node: "start", "process", "decision", "io", or "end".', enum: ['start', 'process', 'decision', 'io', 'end'] },
          },
          required: ['label', 'icon', 'type'],
        },
      };
    case 'list':
      return {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING, description: 'The main title or label for this list item.' },
            icon: { type: Type.STRING, description: 'A single, relevant, lowercase icon name from lucide-react.' },
            description: { type: Type.STRING, description: 'A brief description for this list item.' },
          },
          required: ['label', 'icon', 'description'],
        },
      };
    default:
      throw new Error('Invalid visual type');
  }
};


const getPrompt = (text: string, visualType: 'mind_map' | 'flowchart' | 'list'): string => {
  const commonInstructions = `
You are an expert at structuring information for visualization. Convert the following text into a structured JSON format suitable for rendering as a ${visualType.replace('_', ' ')}.
Analyze the text to identify key concepts, hierarchies, sequences, or main points.
For icons, provide a single, relevant, lowercase icon name from the lucide-react library for each item (e.g., "brain", "settings", "lightbulb", "check-circle", "arrow-right").
Your output must be ONLY the JSON object, without any markdown formatting or explanatory text.

Text to analyze:
"""
${text}
"""
`;
  return commonInstructions;
};

export const generateVisualData = async (text: string, visualType: 'mind_map' | 'flowchart' | 'list'): Promise<VisualData> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = getPrompt(text, visualType);
  const schema = getResponseSchema(visualType);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const responseText = response.text.trim();
    return JSON.parse(responseText) as VisualData;
  } catch (error) {
    console.error("Error generating visual data from Gemini:", error);
    throw new Error("Failed to generate visual data. The AI model might be unavailable or the request could not be processed. Please check your input or try again later.");
  }
};
