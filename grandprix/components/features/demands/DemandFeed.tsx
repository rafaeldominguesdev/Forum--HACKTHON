"use client";

import { Demanda } from "@/types";
import { DemandRow } from "./DemandRow";
import { Button } from "@/components/ui/button";
import { Network, Sparkles } from "lucide-react";

interface DemandFeedProps {
  data: Demanda[];
  isAdmin?: boolean;
}

export function DemandFeed({ data, isAdmin = false }: DemandFeedProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900">Nenhum relato encontrado</h3>
        <p className="text-sm text-slate-500 max-w-xs mx-auto mt-1">
          Não há demandas registradas que correspondam aos filtros selecionados no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {isAdmin && data.length > 0 && (
        <div className="bg-[#008542]/5 border-2 border-[#008542]/20 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#008542] text-white p-2.5 rounded-xl shadow-sm">
               <Network className="w-5 h-5" />
            </div>
            <div>
               <h4 className="text-[13px] font-black tracking-widest uppercase text-[#008542]">Agrupamento Inteligente</h4>
               <p className="text-xs text-[#008542]/80 mt-0.5 font-bold">A IA encontrou tickets convergentes neste núcleo.</p>
            </div>
          </div>
          <Button className="bg-[#008542] hover:bg-[#006e36] text-white text-xs font-black uppercase tracking-widest px-6 shadow-md shadow-[#008542]/20">
             <Sparkles className="w-4 h-4 mr-2" />
             Criar Iniciativa Automática
          </Button>
        </div>
      )}
      
      {data.map((demanda) => (
        <DemandRow key={demanda.id} demanda={demanda} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
