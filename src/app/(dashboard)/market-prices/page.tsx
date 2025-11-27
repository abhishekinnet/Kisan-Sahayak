"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { allMarketPrices } from "@/lib/data";
import { ArrowDown, ArrowUp, Minus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { MarketPrice } from "@/lib/types";

export default function MarketPricesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTrendInfo = (price: MarketPrice) => {
    const difference = price.localMandiPrice - price.stateAvgPrice;
    let trend: 'up' | 'down' | 'stable';
    if (difference > 0) trend = 'up';
    else if (difference < 0) trend = 'down';
    else trend = 'stable';
    return { difference, trend };
  }
  
  const filteredAndGroupedPrices = useMemo(() => {
    const filtered = allMarketPrices.filter((price) =>
      price.crop.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.reduce((acc, price) => {
        const category = price.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(price);
        return acc;
    }, {} as Record<string, MarketPrice[]>);
  }, [searchTerm]);

  const categories = Object.keys(filteredAndGroupedPrices);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Market Price Information</h1>
        <p className="text-muted-foreground">Compare local Mandi prices with state averages for your crops.</p>
      </header>
      <Card className="bg-card/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Crop Price Comparison (per Quintal)</CardTitle>
           <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardDescription>
                Search for a crop to see today's market prices across all categories.
            </CardDescription>
            <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search for any crop..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
        </CardHeader>
        <CardContent>
            {categories.length > 0 ? (
                <Accordion type="multiple" defaultValue={categories} className="w-full">
                    {categories.map((category) => (
                        <AccordionItem value={category} key={category}>
                            <AccordionTrigger className="text-lg font-semibold">{category}</AccordionTrigger>
                            <AccordionContent>
                                <Table>
                                    <TableHeader>
                                    <TableRow>
                                        <TableHead>Crop</TableHead>
                                        <TableHead className="text-right">Local Mandi Price</TableHead>
                                        <TableHead className="text-right">State Average Price</TableHead>
                                        <TableHead className="text-right">Difference</TableHead>
                                        <TableHead className="text-center">Trend</TableHead>
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {filteredAndGroupedPrices[category].map((price) => {
                                        const { difference, trend } = getTrendInfo(price);
                                        return (
                                        <TableRow key={price.id}>
                                            <TableCell className="font-medium">{price.crop}</TableCell>
                                            <TableCell className="text-right">{formatCurrency(price.localMandiPrice)}</TableCell>
                                            <TableCell className="text-right">{formatCurrency(price.stateAvgPrice)}</TableCell>
                                            <TableCell className={cn("text-right font-medium",
                                                difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : 'text-muted-foreground'
                                            )}>
                                                {difference > 0 ? '+' : ''}{formatCurrency(difference)}
                                            </TableCell>
                                            <TableCell className="text-center">
                                            <Badge variant={trend === 'up' ? 'default' : trend === 'down' ? 'destructive' : 'secondary'}
                                                className={cn(
                                                'w-[70px] justify-center',
                                                trend === 'up' && 'bg-green-600/80 text-white',
                                                trend === 'down' && 'bg-red-600/80'
                                                )}
                                            >
                                                {trend === 'up' && <ArrowUp className="mr-1 h-3 w-3" />}
                                                {trend === 'down' && <ArrowDown className="mr-1 h-3 w-3" />}
                                                {trend === 'stable' && <Minus className="mr-1 h-3 w-3" />}
                                                {trend.charAt(0).toUpperCase() + trend.slice(1)}
                                            </Badge>
                                            </TableCell>
                                        </TableRow>
                                        )
                                    })}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                 <div className="text-center h-24 flex items-center justify-center">
                    <p>No crops found for "{searchTerm}".</p>
                 </div>
            )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
