"use client";

import { Bar, BarChart, CartesianGrid, Legend, Line, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { chartData } from "@/lib/data";

export function OverviewChart() {
  return (
    <Card className="bg-card/70 backdrop-blur-sm col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Weather & Climate Overview</CardTitle>
        <CardDescription>Rainfall and average temperature for the last 12 months.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} unit="mm" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} unit="°C" />
                <Tooltip 
                    contentStyle={{
                        background: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))"
                    }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="rainfall" name="Rainfall" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="temperature" name="Temperature" stroke="hsl(var(--chart-2))" />
            </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
