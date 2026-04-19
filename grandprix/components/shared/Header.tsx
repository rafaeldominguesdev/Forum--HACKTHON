"use client";

import { usePathname } from "next/navigation";
import { Search, User, ChevronRight, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLayout } from "@/components/providers/LayoutProvider";

export function Header() {
  const { isSidebarCollapsed } = useLayout();
  const pathname = usePathname();
  
  // Create breadcrumbs from pathname
  const paths = pathname.split("/").filter(Boolean);
  
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

        {/* Search & Breadcrumbs */}
        <div className="flex-1 flex items-center h-16 border-b border-slate-200 justify-between pr-6">
          <div className="flex items-center gap-8 w-full px-6">
            <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                <Home className="w-3.5 h-3.5" />
              </Link>
              {paths.map((path, index) => (
                <React.Fragment key={path}>
                  <ChevronRight className="w-3 h-3" />
                  <span className={cn(
                    "capitalize",
                    index === paths.length - 1 ? "text-slate-900 font-bold" : "hover:text-slate-600 transition-colors"
                  )}>
                    {path.replace("-", " ")}
                  </span>
                </React.Fragment>
              ))}
            </div>

            <div className="relative w-full max-w-3xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Pesquisar no sistema..." 
                className="pl-10 bg-slate-50 border-none h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#008542]/20"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

import * as React from "react";
