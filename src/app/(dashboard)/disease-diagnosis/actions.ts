"use server";

import { diagnoseDiseaseFromImage } from "@/ai/flows/disease-diagnosis-from-image";
import type { DiagnoseDiseaseFromImageOutput } from "@/ai/flows/disease-diagnosis-from-image";

type FormState = {
  data: DiagnoseDiseaseFromImageOutput | null;
  error: string | null;
};

async function fileToDataURI(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function diagnoseDiseaseAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const photo = formData.get("photo") as File;
  const cropDetails = formData.get("cropDetails") as string;
  const soilTestResults = formData.get("soilTestResults") as string;
  const recentWeatherConditions = formData.get("recentWeatherConditions") as string;

  if (!photo || !cropDetails) {
    return { data: null, error: "Photo and crop details are required." };
  }

  try {
    const photoDataUri = await fileToDataURI(photo);

    const result = await diagnoseDiseaseFromImage({
      photoDataUri,
      cropDetails,
      soilTestResults,
      recentWeatherConditions,
    });

    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to get diagnosis: ${errorMessage}` };
  }
}
