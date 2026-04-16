"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Settings, 
  Users, 
  BarChart3, 
  MessageSquare,
  Accessibility,
  Menu,
  ChevronLeft,
  User,
  LogOut,
  CreditCard,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLayout } from "@/components/providers/LayoutProvider";

const menuItems = [
  {
    group: "Colaborador",
    items: [
      { title: "Início", href: "/", icon: LayoutDashboard },
      { title: "Minhas Demandas", href: "/demandas", icon: FileText },
      { title: "Nova Demanda", href: "/nova-demanda", icon: PlusCircle },
    ],
  },
  {
    group: "Gestão",
    items: [
      { title: "Painel Admin", href: "/admin/dashboard", icon: BarChart3 },
      { title: "Todas Demandas", href: "/admin/demandas", icon: MessageSquare },
      { title: "Equipe", href: "/admin/usuarios", icon: Users },
      { title: "Configurações", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useLayout();
  const isCollapsed = isSidebarCollapsed;
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "bg-white border-r border-slate-200 h-[calc(100vh-64px)] sticky top-16 transition-all duration-300 flex flex-col z-20",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-8 overflow-y-auto scrollbar-hide">
        {menuItems.map((section) => (
          <div key={section.group} className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                {section.group}
              </h3>
            )}
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative",
                    isActive 
                      ? "bg-slate-100 text-[#008542]" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 shrink-0 transition-colors",
                    isActive ? "text-[#008542]" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  {!isCollapsed && <span>{item.title}</span>}
                  
                  {isActive && !isCollapsed && (
                    <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-[#008542]" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Profile & Footer */}
      <div className="mt-auto border-t border-slate-100 p-3">
        <DropdownMenu>
          <DropdownMenuTrigger 
            className={cn(
              "w-full flex items-center gap-3 px-3 py-6 rounded-xl hover:bg-slate-50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 cursor-pointer",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <div className="w-9 h-9 rounded-full bg-[#008542]/10 border border-[#008542]/20 flex items-center justify-center text-[#008542] shrink-0 group-hover:scale-105 transition-transform">
              <User className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col items-start overflow-hidden text-left">
                <span className="text-sm font-bold text-slate-900 leading-none truncate w-full">Rafael Caldeira</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate w-full">Gestor de UX</span>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right" className="w-64 mb-4 rounded-2xl border-slate-200 shadow-xl p-2 animate-in slide-in-from-left-2 duration-200">
            <DropdownMenuLabel className="px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuGroup>
              <Link href="/perfil">
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer focus:bg-slate-50 focus:text-slate-900 gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-sm">Meu Perfil</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/admin/settings">
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer focus:bg-slate-50 focus:text-slate-900 gap-3">
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-sm">Configurações</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer focus:bg-slate-50 focus:text-slate-900 gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-sm">Notificações</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer focus:bg-red-50 focus:text-red-600 text-red-500 gap-3">
              <LogOut className="w-4 h-4" />
              <span className="font-black text-sm uppercase tracking-wider">Sair da Conta</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsSidebarCollapsed(!isCollapsed)}
          className="w-full justify-center text-slate-400 hover:text-slate-900 mt-2 h-8"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </aside>
  );
}
