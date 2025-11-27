'use server';
/**
 * @fileOverview A multilingual agronomy assistance AI agent.
 *
 * - multilingualAgronomyAssistance - A function that provides real-time, personalized agronomic guidance in the user's preferred language.
 * - MultilingualAgronomyAssistanceInput - The input type for the multilingualAgronomyAssistance function.
 * - MultilingualAgronomyAssistanceOutput - The return type for the multilingualAgronomyAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MultilingualAgronomyAssistanceInputSchema = z.object({
  query: z.string().describe('The agronomy-related question or request from the farmer.'),
  preferredLanguage: z.string().describe('The farmer\'s preferred language for the response.'),
  crop: z.string().optional().describe('The specific crop the farmer is asking about.'),
  cropStage: z.string().optional().describe('The current growth stage of the crop.'),
  soilTestResults: z.string().optional().describe('Recent soil test results for the farmer\'s field.'),
  recentWeatherConditions: z.string().optional().describe('Recent weather conditions in the farmer\'s location.'),
  imageDiagnosis: z.string().optional().describe('Diagnosis based on an uploaded image of the crop.'),
});
export type MultilingualAgronomyAssistanceInput = z.infer<typeof MultilingualAgronomyAssistanceInputSchema>;

const MultilingualAgronomyAssistanceOutputSchema = z.object({
  advice: z.string().describe('The agronomic advice provided in the farmer\'s preferred language.'),
});
export type MultilingualAgronomyAssistanceOutput = z.infer<typeof MultilingualAgronomyAssistanceOutputSchema>;

export async function multilingualAgronomyAssistance(input: MultilingualAgronomyAssistanceInput): Promise<MultilingualAgronomyAssistanceOutput> {
  return multilingualAgronomyAssistanceFlow(input);
}

const multilingualAgronomyAssistancePrompt = ai.definePrompt({
  name: 'multilingualAgronomyAssistancePrompt',
  input: {schema: MultilingualAgronomyAssistanceInputSchema},
  output: {schema: MultilingualAgronomyAssistanceOutputSchema},
  prompt: `You are an expert agronomy assistant for smallholder and marginal farmers in India. Always reply in the user’s preferred language and keep the response short, clear, and farmer-friendly. Use local measurement units such as kilograms per hectare, liters per acre, or milliliters per liter of water. If you provide any pesticide or fertilizer recommendation, always mention that the farmer must follow label instructions and government-approved dosages.

  When the system shares a crop ({{{crop}}}), crop stage ({{{cropStage}}}), soil test results ({{{soilTestResults}}}), recent weather conditions ({{{recentWeatherConditions}}}), or an image diagnosis ({{{imageDiagnosis}}}), use all of that information to give safe, scientific, and practical guidance. Break the advice into simple steps that can be followed in the field, include at least one organic or low-cost alternative when possible, and finish by asking one clarifying question that will help you refine the recommendation further. If you are uncertain or confidence in diagnosis is low, recommend connecting to a live expert via audio, video, or WhatsApp.

  Respond in the user\'s preferred language: {{{preferredLanguage}}}.

  Farmer\'s Question: {{{query}}}`,
});

const multilingualAgronomyAssistanceFlow = ai.defineFlow(
  {
    name: 'multilingualAgronomyAssistanceFlow',
    inputSchema: MultilingualAgronomyAssistanceInputSchema,
    outputSchema: MultilingualAgronomyAssistanceOutputSchema,
  },
  async input => {
    const {output} = await multilingualAgronomyAssistancePrompt(input);
    return output!;
  }
);
