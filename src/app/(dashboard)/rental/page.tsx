import Image from "next/image";
import { Tractor, CalendarClock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const equipmentList = [
  {
    id: 1,
    name: "Mahindra 575 DI Tractor",
    category: "Tractors",
    rate: "₹800/hour",
    owner: "Ramesh Kumar",
    distance: "2.5 km away",
    image: "/images/tractor.png",
    availability: "Available Now"
  },
  {
    id: 2,
    name: "John Deere Combine Harvester",
    category: "Harvesters",
    rate: "₹2500/hour",
    owner: "Kisan Co-op Society",
    distance: "5.0 km away",
    image: "/images/harvester.png",
    availability: "Available Tomorrow"
  },
  {
    id: 3,
    name: "Heavy Duty Disc Plow",
    category: "Implements",
    rate: "₹300/hour",
    owner: "Suresh Singh",
    distance: "1.2 km away",
    image: "/images/plow.png",
    availability: "Available Now"
  },
  {
    id: 4,
    name: "Automatic Seed Drill",
    category: "Implements",
    rate: "₹450/hour",
    owner: "AgriTech Rentals",
    distance: "4.8 km away",
    image: "/images/seeddrill.png",
    availability: "Available in 2 Days"
  }
];

export default function RentalPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-black">Equipment Rental</h1>
          <p className="text-muted-foreground mt-1 text-black">
            Rent tractors, harvesters, and other farming equipment from local owners.
          </p>
        </div>
        <Button className="shrink-0 bg-primary hover:bg-primary/90">
          <Tractor className="mr-2 h-4 w-4" />
          List Your Equipment
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {equipmentList.map((item) => (
          <Card key={item.id} className="overflow-hidden flex flex-col bg-background/50 backdrop-blur-sm border-border/50 transition-all hover:shadow-md">
            <div className="relative h-48 w-full">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover"
              />
              <Badge 
                className={`absolute top-3 left-3 ${
                  item.availability.includes("Now") 
                  ? "bg-green-500 hover:bg-green-600" 
                  : "bg-orange-500 hover:bg-orange-600"
                } text-white`}
              >
                {item.availability}
              </Badge>
            </div>
            <CardContent className="p-4 flex-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-lg line-clamp-2">{item.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
              
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {item.distance}
                </div>
                <div className="flex items-center text-muted-foreground">
                   <span className="font-medium text-black dark:text-white mr-1 text-xs px-1.5 py-0.5 rounded bg-muted">Owner:</span>
                  {item.owner}
                </div>
              </div>

              <div className="mt-4 text-xl font-bold text-primary">{item.rate}</div>
            </CardContent>
            <CardFooter className="p-4 pt-0 gap-2">
              <Button variant="outline" className="flex-1 bg-background">
                <CalendarClock className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
