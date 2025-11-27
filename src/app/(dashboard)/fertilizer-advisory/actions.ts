"use server";

import { fertilizerAndNutrientAdvisory } from "@/ai/flows/fertilizer-and-nutrient-advisory";
import type { FertilizerAndNutrientAdvisoryOutput } from "@/ai/flows/fertilizer-and-nutrient-advisory";

type FormState = {
  data: FertilizerAndNutrientAdvisoryOutput | null;
  error: string | null;
};

export async function fertilizerAdvisoryAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const soilTestValues = formData.get("soilTestValues") as string;
  const cropType = formData.get("cropType") as string;
  const cropStage = formData.get("cropStage") as string;
  const recentWeather = formData.get("recentWeather") as string;
  const preferredLanguage = formData.get("preferredLanguage") as string;

  if (!soilTestValues || !cropType || !cropStage || !recentWeather || !preferredLanguage) {
    return { data: null, error: "All fields are required." };
  }

  try {
    const result = await fertilizerAndNutrientAdvisory({
      soilTestValues,
      cropType,
      cropStage,
      recentWeather,
      preferredLanguage,
    });

    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to get advisory: ${errorMessage}` };
  }
}
