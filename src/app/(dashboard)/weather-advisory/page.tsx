"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, Bot, CheckCircle, Languages, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { weatherAdvisoryAction } from "./actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useLanguage, type Language } from "@/context/language-provider";
import { useEffect, useState } from "react";

const initialState = {
  data: null,
  error: null,
};

export default function WeatherAdvisoryPage() {
  const [state, formAction] = useActionState(weatherAdvisoryAction, initialState);
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
        <h1 className="text-3xl font-bold tracking-tight font-headline">Weather Alert & Advisory</h1>
        <p className="text-muted-foreground">Get actionable advice based on the 7-day weather forecast.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-card/70 backdrop-blur-sm">
          <form action={formAction}>
            <CardHeader>
              <CardTitle>Submit Location Details</CardTitle>
              <CardDescription>Provide your location to get a localized weather advisory.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location/Village</Label>
                  <Input id="location" name="location" placeholder="e.g., Rampur" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input id="district" name="district" placeholder="e.g., Sitapur" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" placeholder="e.g., Uttar Pradesh" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weatherForecast">Weather Forecast (mock)</Label>
                <Textarea id="weatherForecast" name="weatherForecast" defaultValue="Next 7 days: Temperature 35-40°C, Humidity 70-80%, Probability of heavy rain on day 3 and 4." />
                 <p className="text-xs text-muted-foreground">This is mock data. In a real app, this would be fetched from an API like OpenWeatherAPI.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredLanguage">Language</Label>
                <Select name="preferredLanguage" value={selectedLanguage} onValueChange={(v) => setSelectedLanguage(v as Language)}>
                    <SelectTrigger className="pl-10">
                        <div className="relative flex items-center gap-2 w-full">
                           <Languages className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
          <h2 className="text-2xl font-bold font-headline">Weather Advisory</h2>
          {state.data && (
            <Alert className="bg-primary/10 border-primary/50">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary/90">Weather Alert</AlertTitle>
                <AlertDescription className="prose prose-sm dark:prose-invert mt-2 text-foreground/90">
                  <h3 className="flex items-center gap-2"><Bot className="h-5 w-5"/> AI Advisor says:</h3>
                  <p>{state.data.advisory}</p>
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
                <p className="text-muted-foreground mt-4">AI-powered weather advisory will appear here.</p>
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
      Get Weather Advisory
    </Button>
  );
}
