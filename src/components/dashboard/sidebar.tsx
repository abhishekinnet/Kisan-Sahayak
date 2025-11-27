

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Book, 
  Bug, 
  CloudSun, 
  FlaskConical, 
  Landmark, 
  Leaf, 
  LayoutDashboard, 
  Users 
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/disease-diagnosis", label: "Disease Diagnosis", icon: Bug },
  { href: "/fertilizer-advisory", label: "Fertilizer Advisory", icon: FlaskConical },
  { href: "/weather-advisory", label: "Weather Advisory", icon: CloudSun },
  { href: "/market-prices", label: "Market Prices", icon: BarChart3 },
  { href: "/financial-ledger", label: "Financial Ledger", icon: Book },
  { href: "/schemes", label: "Govt. Schemes", icon: Landmark },
  { href: "/expert-connect", label: "Expert Connect", icon: Users },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-primary font-headline">
            Kisan Sahayak
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <div className="flex flex-col gap-2 p-4 text-sm text-muted-foreground">
          <p>&copy; 2025 Kisan Sahayak</p>
          <p>Empowering Farmers with AI.</p>
          <p>Made by Aditya Jha</p>
         </div>
      </SidebarFooter>
    </Sidebar>
  );
}
