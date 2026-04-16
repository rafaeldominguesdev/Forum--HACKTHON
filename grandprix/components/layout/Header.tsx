"use client";

import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLayout } from "@/components/providers/LayoutProvider";

export function Header() {
  const { isSidebarCollapsed } = useLayout();

  return (
    <header className="h-16 bg-white sticky top-0 z-10 px-0 flex items-center justify-between">
      <div className="flex items-center w-full h-full">
        {/* Logo */}
        <Link 
          href="/" 
          className={cn(
            "flex items-center gap-3 shrink-0 border-r border-slate-200 h-16 transition-all duration-300",
            isSidebarCollapsed ? "w-20 justify-center px-0" : "w-64 px-6 justify-start"
          )}
        >
          <img src="/img/petrobrasLogo.svg" alt="Petrobras" className="h-8 w-auto shrink-0" />
          {!isSidebarCollapsed && (
            <div className="flex flex-col mt-0.5 overflow-hidden">
              <span className="text-sm font-black text-slate-900 leading-none tracking-tight">ACESSÍVEL</span>
              <span className="text-[10px] font-black text-[#008542] uppercase tracking-widest mt-0.5">Petrobras</span>
            </div>
          )}
        </Link>
        <div className="flex-1 flex items-center h-16 border-b border-slate-200">
          <div className="flex items-center gap-4 w-full max-w-3xl px-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Buscar demandas, respostas..." 
                className="pl-10 bg-slate-50 border-none h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
