"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, Bot, CheckCircle, FlaskConical, Languages, Loader2, Thermometer, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fertilizerAdvisoryAction } from "./actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage, type Language } from "@/context/language-provider";

const initialState = {
  data: null,
  error: null,
};

export default function FertilizerAdvisoryPage() {
  const [state, formAction] = useActionState(fertilizerAdvisoryAction, initialState);
  const { language: globalLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(globalLanguage);

  useEffect(() => {
      setSelectedLanguage(globalLanguage);
  }, [globalLanguage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Fertilizer & Nutrient Advisory</h1>
        <p className="text-muted-foreground">Get personalized fertilizer recommendations for your crops.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-card/70 backdrop-blur-sm">
          <form action={formAction}>
            <CardHeader>
              <CardTitle>Submit Crop and Soil Data</CardTitle>
              <CardDescription>Fill in the details below to receive a custom fertilizer plan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <div className="relative">
                    <Trees className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="cropType" name="cropType" placeholder="e.g., Wheat, Cotton" required className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cropStage">Crop Stage</Label>
                <div className="relative">
                    <FlaskConical className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="cropStage" name="cropStage" placeholder="e.g., Tillering, Flowering" required className="pl-10" />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="soilTestValues">Soil Test Values</Label>
                 <Textarea id="soilTestValues" name="soilTestValues" placeholder="e.g., pH: 6.8, N: low, P: medium, K: high" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recentWeather">Recent Weather</Label>
                 <div className="relative">
                    <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="recentWeather" name="recentWeather" placeholder="e.g., Hot and dry, 35°C" required className="pl-10"/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredLanguage">Language</Label>
                <Select name="preferredLanguage" value={selectedLanguage} onValueChange={(v) => setSelectedLanguage(v as Language)}>
                    <SelectTrigger className="pl-10">
                        <div className="relative flex items-center gap-2 w-full">
                           <Languages className="h-4 w-4 text-muted-foreground" />
                           <SelectValue placeholder="Select a language" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">हिन्दी (Hindi)</SelectItem>
                        <SelectItem value="Bengali">বাংলা (Bengali)</SelectItem>
                        <SelectItem value="Telugu">తెలుగు (Telugu)</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline">Advisory Result</h2>
          {state.data && (
            <Alert className="bg-primary/10 border-primary/50">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary/90">Recommendation Generated</AlertTitle>
                <AlertDescription className="prose prose-sm dark:prose-invert mt-2 text-foreground/90">
                  <h3 className="flex items-center gap-2"><Bot className="h-5 w-5"/> AI Advisor says:</h3>
                  <p>{state.data.advice}</p>
                </AlertDescription>
            </Alert>
          )}
          {state.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          {!state.data && !state.error && (
             <div className="flex flex-col items-center justify-center h-full p-8 border-2 border-dashed rounded-lg bg-card/50">
                <Bot className="h-16 w-16 text-muted-foreground/50" />
                <p className="text-muted-foreground mt-4">AI-powered fertilizer advice will appear here.</p>
             </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Get Advisory
    </Button>
  );
}
