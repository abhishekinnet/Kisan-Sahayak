'use server';
/**
 * @fileOverview This file defines a Genkit flow for diagnosing plant diseases from an image.
 *
 * It includes:
 * - diagnoseDiseaseFromImage - A function that takes an image of a plant and returns a diagnosis.
 * - DiagnoseDiseaseFromImageInput - The input type for the diagnoseDiseaseFromImage function.
 * - DiagnoseDiseaseFromImageOutput - The return type for the diagnoseDiseaseFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnoseDiseaseFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  cropDetails: z.string().describe('Details about the crop, such as type and stage.'),
  soilTestResults: z.string().describe('Results of a recent soil test.'),
  recentWeatherConditions: z.string().describe('Recent weather conditions in the area.'),
});
export type DiagnoseDiseaseFromImageInput = z.infer<typeof DiagnoseDiseaseFromImageInputSchema>;

const DiagnoseDiseaseFromImageOutputSchema = z.object({
  diseaseName: z.string().describe('The likely name of the plant disease.'),
  confidenceScore: z.number().describe('The confidence score of the diagnosis (0-1).'),
  explanation: z.string().describe('A simple explanation of the disease.'),
  immediateActions: z.string().describe('2-3 immediate actions the farmer should take.'),
  chemicalControl: z.string().describe('A suggested chemical control with dosage range.'),
  organicControl: z.string().describe('A suggested organic or cultural practice.'),
  expertRecommendation: z.string().optional().describe('Recommendation to contact expert, if confidence is low.')
});
export type DiagnoseDiseaseFromImageOutput = z.infer<typeof DiagnoseDiseaseFromImageOutputSchema>;

export async function diagnoseDiseaseFromImage(input: DiagnoseDiseaseFromImageInput): Promise<DiagnoseDiseaseFromImageOutput> {
  return diagnoseDiseaseFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnoseDiseaseFromImagePrompt',
  input: {schema: DiagnoseDiseaseFromImageInputSchema},
  output: {schema: DiagnoseDiseaseFromImageOutputSchema},
  prompt: `You are helping a farmer who has uploaded a crop image for problem detection. 

The image has been analyzed by a plant disease recognition model, and you are given the likely disease name, confidence score, crop details, and soil/weather context. 
Based on this, explain the disease in very simple terms, list 2–3 immediate actions the farmer should take to prevent further spread, and suggest one chemical control with dosage range and one organic or cultural practice. 
Emphasize safe handling of chemicals and remind the farmer to read and follow the label. 
Make the language easy and short, so a farmer with limited literacy can understand.
If confidence in the diagnosis is low, say clearly that you are not fully sure and recommend the farmer to consult a live expert through video call, audio, or WhatsApp. 
End the response by asking one follow-up question to the farmer, such as when symptoms started or whether nearby plants are also affected.

Crop Details: {{{cropDetails}}}
Soil Test Results: {{{soilTestResults}}}
Recent Weather Conditions: {{{recentWeatherConditions}}}
Photo: {{media url=photoDataUri}}
`,
});

const diagnoseDiseaseFromImageFlow = ai.defineFlow(
  {
    name: 'diagnoseDiseaseFromImageFlow',
    inputSchema: DiagnoseDiseaseFromImageInputSchema,
    outputSchema: DiagnoseDiseaseFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
