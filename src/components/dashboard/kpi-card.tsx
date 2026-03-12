import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { KpiCard as KpiCardType } from "@/lib/types";

export function KpiCard({ title, value, change, changeType, icon: Icon }: KpiCardType) {
  return (
    <Card className="bg-card/70 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <span className={cn("flex items-center gap-1", changeType === "increase" ? "text-green-600" : "text-red-400")}>
            {changeType === "increase" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {change}
          </span>
          from last week
        </p>
      </CardContent>
    </Card>
  );
}
