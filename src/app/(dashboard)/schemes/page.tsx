"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { governmentSchemes } from "@/lib/data";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GovernmentSchemesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Government Schemes</h1>
        <p className="text-muted-foreground">Discover central and state government schemes available for farmers.</p>
        <p className="text-xs text-muted-foreground pt-2">Note: The data below is for demonstration purposes. In a real application, this would be fetched from live government data sources.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {governmentSchemes.map((scheme) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex flex-col h-full bg-card/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{scheme.name}</CardTitle>
                <CardDescription className="line-clamp-3">{scheme.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Key Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {scheme.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary">{benefit}</Badge>
                    ))}
                  </div>
                </div>
                 <div>
                  <h4 className="text-sm font-semibold mb-2">Eligibility</h4>
                  <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                </div>
              </CardContent>
              <CardFooter>
                 <Button asChild className="w-full">
                  <Link href={scheme.link} target="_blank">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
