"use server";

import { weatherAlertAndAdvisory } from "@/ai/flows/weather-alert-and-advisory";
import type { WeatherAlertAndAdvisoryOutput } from "@/ai/flows/weather-alert-and-advisory";

type FormState = {
  data: WeatherAlertAndAdvisoryOutput | null;
  error: string | null;
};

export async function weatherAdvisoryAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const location = formData.get("location") as string;
  const district = formData.get("district") as string;
  const state = formData.get("state") as string;
  const weatherForecast = formData.get("weatherForecast") as string;
  const preferredLanguage = formData.get("preferredLanguage") as string;

  if (!location || !district || !state || !weatherForecast || !preferredLanguage) {
    return { data: null, error: "All fields are required." };
  }

  try {
    const result = await weatherAlertAndAdvisory({
      location,
      district,
      state,
      weatherForecast,
      preferredLanguage,
    });

    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to get advisory: ${errorMessage}` };
  }
}
