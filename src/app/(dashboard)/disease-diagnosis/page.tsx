"use client";

import { useState, useActionState, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { AlertCircle, Bot, Camera, CheckCircle, File, Image as ImageIcon, Loader2, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { diagnoseDiseaseAction } from "./actions";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const initialState = {
  data: null,
  error: null,
};

export default function DiseaseDiagnosisPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(diagnoseDiseaseAction, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const [capturedImageDataUri, setCapturedImageDataUri] = useState<string>('');
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    let stream: MediaStream | null = null;
    const getCameraPermission = async () => {
      if (isCameraOpen) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasCameraPermission(false);
          setCameraOpen(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings to use this feature.",
          });
        }
      }
    };

    getCameraPermission();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOpen, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setCapturedImageDataUri(''); // Clear captured data if a file is selected
      };
      reader.readAsDataURL(file);
      setCameraOpen(false);
    } else {
      setPreview(null);
    }
  };

  const handleCapture = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      const dataUri = canvas.toDataURL('image/jpeg');
      setPreview(dataUri);
      setCapturedImageDataUri(dataUri);

      // Clear the file input if a file was previously selected
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      setCameraOpen(false);
    }
  };
  
  const handleReset = () => {
    setPreview(null);
    setCapturedImageDataUri('');
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (formRef.current) formRef.current.reset();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Disease Diagnosis</h1>
        <p className="text-muted-foreground">Upload an image of a plant to diagnose potential diseases.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-card/70 backdrop-blur-sm">
          <form ref={formRef} action={formAction}>
            <CardHeader>
              <CardTitle>Submit Crop Details</CardTitle>
              <CardDescription>Provide an image and details about your crop for analysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="photo">Crop Photo</Label>
                <div className="w-full aspect-video border-2 border-dashed rounded-lg flex items-center justify-center relative bg-muted/20 overflow-hidden">
                  {isCameraOpen ? (
                    <div className="w-full h-full relative">
                      <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                      <canvas ref={canvasRef} className="hidden" />
                      {hasCameraPermission === false && (
                         <Alert variant="destructive" className="absolute bottom-4 left-4 right-4">
                          <AlertTitle>Camera Access Required</AlertTitle>
                          <AlertDescription>
                            Please allow camera access to use this feature.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ) : preview ? (
                    <Image src={preview} alt="Crop preview" fill style={{ objectFit: 'contain' }} className="p-2" />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="mx-auto h-12 w-12" />
                      <p>Image preview will appear here</p>
                    </div>
                  )}
                   {!isCameraOpen && preview && (
                     <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleReset}>
                       <X className="h-4 w-4"/>
                       <span className="sr-only">Remove image</span>
                     </Button>
                   )}
                </div>
                 <div className="flex gap-2 mt-2">
                    <Label htmlFor="photo" className={cn("flex-1", isCameraOpen && "hidden")}>
                        <div className={buttonVariants({ variant: 'outline', className: "w-full cursor-pointer"})}>
                            <File className="mr-2 h-4 w-4" />
                            Upload File
                        </div>
                    </Label>
                    <Input ref={fileInputRef} id="photo" name="photo" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <input type="hidden" name="capturedPhoto" value={capturedImageDataUri} />

                    {isCameraOpen ? (
                        <Button type="button" onClick={handleCapture} className="flex-1" disabled={!hasCameraPermission}>
                            <Camera className="mr-2 h-4 w-4" />
                            Capture Image
                        </Button>
                    ) : (
                         <Button type="button" variant="secondary" className="flex-1" onClick={() => setCameraOpen(true)}>
                            <Camera className="mr-2 h-4 w-4" />
                            Use Camera
                        </Button>
                    )}
                 </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cropDetails">Crop Details</Label>
                <Input id="cropDetails" name="cropDetails" placeholder="e.g., Corn, 4 weeks old" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="soilTestResults">Soil Test Results (Optional)</Label>
                <Textarea id="soilTestResults" name="soilTestResults" placeholder="e.g., pH 6.5, high nitrogen" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recentWeatherConditions">Recent Weather (Optional)</Label>
                <Input id="recentWeatherConditions" name="recentWeatherConditions" placeholder="e.g., Humid, frequent rain" />
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline">Diagnosis Result</h2>
          {state.data && (
            <Alert className="bg-primary/10 border-primary/50">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary/90">Diagnosis Complete</AlertTitle>
                <AlertDescription className="prose prose-sm dark:prose-invert mt-2 text-foreground/90">
                  <h3 className="flex items-center gap-2"><Bot className="h-5 w-5"/> AI Advisor says:</h3>
                  <h4>{state.data.diseaseName} (Confidence: {Math.round(state.data.confidenceScore * 100)}%)</h4>
                  <p><strong>Explanation:</strong> {state.data.explanation}</p>
                  <p><strong>Immediate Actions:</strong> {state.data.immediateActions}</p>
                  <p><strong>Chemical Control:</strong> {state.data.chemicalControl}</p>
                  <p><strong>Organic Control:</strong> {state.data.organicControl}</p>
                  {state.data.expertRecommendation && <p className="font-bold text-accent-foreground/90">{state.data.expertRecommendation}</p>}
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
                <p className="text-muted-foreground mt-4">AI diagnosis will appear here.</p>
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
      Diagnose Disease
    </Button>
  );
}
