"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { financialRecords } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function FinancialLedgerPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };
  
  const totalIncome = financialRecords.filter(r => r.type === 'Income').reduce((acc, r) => acc + r.amount, 0);
  const totalExpense = financialRecords.filter(r => r.type === 'Expense').reduce((acc, r) => acc + r.amount, 0);
  const netProfit = totalIncome - totalExpense;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <header className="flex items-center justify-between">
        <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Financial Ledger</h1>
            <p className="text-muted-foreground">Track your farm's income and expenses to calculate profitability.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Record
        </Button>
      </header>
      <Card className="bg-card/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Income & Expense Records</CardTitle>
          <CardDescription>
            A summary of your financial activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financialRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                   <TableCell>
                     <Badge variant={record.type === 'Income' ? 'default' : 'secondary'} 
                       className={cn(record.type === 'Income' && 'bg-green-600/80 text-white')}>
                       {record.type}
                     </Badge>
                   </TableCell>
                  <TableCell>{record.category}</TableCell>
                  <TableCell className="font-medium">{record.description}</TableCell>
                  <TableCell className={cn("text-right", record.type === 'Income' ? 'text-green-600' : 'text-red-600')}>
                    {record.type === 'Income' ? '+' : '-'} {formatCurrency(record.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
             <TableFooter>
                <TableRow>
                    <TableCell colSpan={4} className="font-bold text-lg text-right">Net Profit</TableCell>
                    <TableCell className={cn("font-bold text-lg text-right", netProfit > 0 ? 'text-green-600' : 'text-red-600')}>
                        {formatCurrency(netProfit)}
                    </TableCell>
                </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
