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
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-slate-900 leading-none tracking-tighter">ACESSÍVEL</span>
                <span className="text-base font-black text-[#008542] leading-none tracking-tighter">HUB</span>
              </div>
              <span className="text-[10px] font-black text-[#008542] uppercase tracking-widest mt-0.5">Petrobras</span>
            </div>
          )}
        </Link>
        <div className="flex-1 flex items-center h-16 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-4 w-full max-w-2xl px-8">
            <div className="relative w-full group">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-colors group-focus-within:text-[#008542]">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-[#008542]" />
              </div>
              <Input 
                placeholder="Pesquisar demandas, processos ou usuários..." 
                className="pl-11 pr-16 bg-slate-50/50 border-slate-200/60 h-10 rounded-xl transition-all duration-300 focus-visible:bg-white focus-visible:ring-0 focus-visible:border-[#008542]/30 focus-visible:shadow-[0_0_20px_-5px_rgba(0,133,66,0.15)] placeholder:text-slate-400 placeholder:font-medium"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1">
                <kbd className="hidden sm:flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-sans text-[10px] font-bold text-slate-400 shadow-sm">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
