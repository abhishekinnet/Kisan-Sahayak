'use server';
/**
 * @fileOverview A weather alert and advisory AI agent.
 *
 * - weatherAlertAndAdvisory - A function that provides weather-based advisories to farmers.
 * - WeatherAlertAndAdvisoryInput - The input type for the weatherAlertAndAdvisory function.
 * - WeatherAlertAndAdvisoryOutput - The return type for the weatherAlertAndAdvisory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherAlertAndAdvisoryInputSchema = z.object({
  location: z.string().describe('The location of the farmer.'),
  district: z.string().describe('The district of the farmer.'),
  state: z.string().describe('The state of the farmer.'),
  weatherForecast: z.string().describe('The real-time weather forecast for the next seven days, including rainfall probability, humidity, and temperature.'),
  preferredLanguage: z.string().describe('The farmer’s preferred language.'),
});
export type WeatherAlertAndAdvisoryInput = z.infer<typeof WeatherAlertAndAdvisoryInputSchema>;

const WeatherAlertAndAdvisoryOutputSchema = z.object({
  advisory: z.string().describe('A short farmer-friendly paragraph warning about the expected weather conditions and their possible impact on crops, with two immediate, practical steps the farmer can take to reduce risk.'),
});
export type WeatherAlertAndAdvisoryOutput = z.infer<typeof WeatherAlertAndAdvisoryOutputSchema>;

export async function weatherAlertAndAdvisory(input: WeatherAlertAndAdvisoryInput): Promise<WeatherAlertAndAdvisoryOutput> {
  return weatherAlertAndAdvisoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherAlertAndAdvisoryPrompt',
  input: {schema: WeatherAlertAndAdvisoryInputSchema},
  output: {schema: WeatherAlertAndAdvisoryOutputSchema},
  prompt: `You are an agricultural assistant preparing a weather-based advisory for farmers in India.

You are given the farmer’s location, district, state, and the real-time weather forecast for the next seven days, including rainfall probability, humidity, and temperature.

Location: {{{location}}}
District: {{{district}}}
State: {{{state}}}
Weather Forecast: {{{weatherForecast}}}

Create a short farmer-friendly paragraph in the preferred language warning about the expected weather conditions and their possible impact on crops.
Give two immediate, practical steps the farmer can take to reduce risk—for example, delaying pesticide spraying if rain is expected, or irrigating if a heat wave is forecast.
Use very simple words, avoid technical jargon, and keep the advice short enough to be read as an SMS or WhatsApp message.
End by suggesting the farmer can ask more details or connect with an expert if needed.

Preferred Language: {{{preferredLanguage}}}

Advisory:`,
});

const weatherAlertAndAdvisoryFlow = ai.defineFlow(
  {
    name: 'weatherAlertAndAdvisoryFlow',
    inputSchema: WeatherAlertAndAdvisoryInputSchema,
    outputSchema: WeatherAlertAndAdvisoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
