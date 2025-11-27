
"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { LanguageSelector } from "./language-selector";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { useEffect, useState } from "react";

export function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card/50 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search features..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      {isClient ? (
        <>
          <LanguageSelector />
          <ThemeToggle />
        </>
      ) : (
        <>
          <div className="h-10 w-10" />
          <div className="h-10 w-10" />
        </>
      )}
      <UserNav />
    </header>
  );
}
