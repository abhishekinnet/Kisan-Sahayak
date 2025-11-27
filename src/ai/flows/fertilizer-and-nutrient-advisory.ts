'use server';
/**
 * @fileOverview A fertilizer and nutrient advisory AI agent.
 *
 * - fertilizerAndNutrientAdvisory - A function that handles the fertilizer and nutrient advisory process.
 * - FertilizerAndNutrientAdvisoryInput - The input type for the fertilizerAndNutrientAdvisory function.
 * - FertilizerAndNutrientAdvisoryOutput - The return type for the fertilizerAndNutrientAdvisory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FertilizerAndNutrientAdvisoryInputSchema = z.object({
  soilTestValues: z.string().describe('The soil test values of the farm.'),
  cropType: z.string().describe('The type of crop being grown.'),
  cropStage: z.string().describe('The current stage of the crop.'),
  recentWeather: z.string().describe('The recent weather conditions of the farm.'),
  preferredLanguage: z.string().describe('The preferred language of the farmer.'),
});
export type FertilizerAndNutrientAdvisoryInput = z.infer<typeof FertilizerAndNutrientAdvisoryInputSchema>;

const FertilizerAndNutrientAdvisoryOutputSchema = z.object({
  advice: z.string().describe('The fertilizer and nutrient advice for the farmer.'),
});
export type FertilizerAndNutrientAdvisoryOutput = z.infer<typeof FertilizerAndNutrientAdvisoryOutputSchema>;

export async function fertilizerAndNutrientAdvisory(input: FertilizerAndNutrientAdvisoryInput): Promise<FertilizerAndNutrientAdvisoryOutput> {
  return fertilizerAndNutrientAdvisoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fertilizerAndNutrientAdvisoryPrompt',
  input: {schema: FertilizerAndNutrientAdvisoryInputSchema},
  output: {schema: FertilizerAndNutrientAdvisoryOutputSchema},
  prompt: `You are giving fertilizer and soil nutrient advice to a farmer based on soil test values, crop type, crop stage, and recent weather. Always reply in the farmer’s chosen language, using local units like kg/acre or g/liter. Recommend a balanced fertilizer schedule that prevents overuse of chemicals and includes organic alternatives when available. If deficiencies are detected, explain the symptoms briefly and give one practical remedy for each nutrient deficiency. Structure your answer into clear steps: what to apply, how much, when to apply, and how to apply safely. Mention the importance of using protective gear and following label instructions. Conclude with a short tip on preventing long-term soil health decline, and end by asking a simple clarifying question, for example: 'Do you have access to compost or farmyard manure?'.

Soil Test Values: {{{soilTestValues}}}
Crop Type: {{{cropType}}}
Crop Stage: {{{cropStage}}}
Recent Weather: {{{recentWeather}}}
Preferred Language: {{{preferredLanguage}}}`,
});

const fertilizerAndNutrientAdvisoryFlow = ai.defineFlow(
  {
    name: 'fertilizerAndNutrientAdvisoryFlow',
    inputSchema: FertilizerAndNutrientAdvisoryInputSchema,
    outputSchema: FertilizerAndNutrientAdvisoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
