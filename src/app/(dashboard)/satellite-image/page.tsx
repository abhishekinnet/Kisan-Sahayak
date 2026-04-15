import Image from "next/image";
import { Satellite, MapPin, Activity, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SatelliteImagePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-black">Satellite Farm Analysis</h1>
          <p className="text-muted-foreground mt-1 text-black">
            Monitor crop health, field boundaries, and moisture levels through satellite imagery.
          </p>
        </div>
        <Button className="shrink-0 bg-primary hover:bg-primary/90">
          <Satellite className="mr-2 h-4 w-4" />
          Request New Scan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 overflow-hidden bg-background/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="text-primary h-5 w-5" />
              Sector 7, North Field
              <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700 hover:bg-green-100">Live</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full aspect-video bg-muted border-y border-border/50">
              <Image 
                src="/images/satellite_farm.png" 
                alt="Satellite view of farm" 
                fill 
                className="object-cover"
                priority
              />
              {/* Overlay elements to simulate scanning HUD */}
              <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-overlay"></div>
              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-md text-xs font-mono backdrop-blur-md">
                LAT: 28.6139° N | LNG: 77.2090° E
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-md text-xs font-mono backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                NDVI Index: 0.78 (Healthy)
              </div>
            </div>
            <div className="p-4 bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Last updated: 10 minutes ago. Resolution: 0.5m/px. Imagery provided by KisanSat-1.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Field Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-muted/40 rounded-lg border border-border/30">
                <div className="p-2 bg-green-100 text-green-700 rounded-full dark:bg-green-900/30 dark:text-green-400">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none mb-1">Crop Health</p>
                  <p className="text-xs text-muted-foreground">92% coverage is strictly healthy.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-muted/40 rounded-lg border border-border/30">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                  <Droplets className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none mb-1">Soil Moisture</p>
                  <p className="text-xs text-muted-foreground">Adequate levels in North sector.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
