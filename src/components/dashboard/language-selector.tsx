"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage, type Language } from "@/context/language-provider"
import { Languages } from "lucide-react"

const languages: { value: Language; label: string }[] = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "हिन्दी (Hindi)" },
    { value: "Bengali", label: "বাংলা (Bengali)" },
    { value: "Telugu", label: "తెలుగు (Telugu)" },
];

export function LanguageSelector() {
  const { setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
            <DropdownMenuItem key={lang.value} onClick={() => setLanguage(lang.value)}>
                {lang.label}
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
