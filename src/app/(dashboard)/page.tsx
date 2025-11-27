"use client";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { kpiData } from "@/lib/data";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function DashboardPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-1 space-y-4"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Farmer!</h1>
        <p className="text-muted-foreground">Here's a quick overview of your farm's status.</p>
      </motion.div>
      <motion.div 
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {kpiData.map((kpi) => (
          <motion.div key={kpi.title} variants={itemVariants}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        variants={containerVariants}
        className="grid gap-4 grid-cols-1 lg:grid-cols-3"
      >
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <OverviewChart />
        </motion.div>
        <motion.div variants={itemVariants}>
          <RecentActivity />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
