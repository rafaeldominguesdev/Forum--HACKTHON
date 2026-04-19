"use client";

import { Demanda } from "@/types";
import { DemandRow } from "./DemandRow";
import { Button } from "@/components/ui/button";
import { Network, Sparkles, X, LayoutGrid } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DemandFeedProps {
  data: Demanda[];
  isAdmin?: boolean;
}

export function DemandFeed({ data, isAdmin = false }: DemandFeedProps) {
  const [isGrouped, setIsGrouped] = useState(false);

  const groupedDemands = useMemo(() => {
    if (!isGrouped) return null;
    
    return data.reduce((acc, current) => {
      const groupKey = current.tipoBarreira.nome;
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(current);
      return acc;
    }, {} as Record<string, Demanda[]>);
  }, [data, isGrouped]);

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
    <div className="relative flex flex-col gap-4">
      {/* Botão flutuante para desfazer agrupamento */}
      <AnimatePresence>
        {isGrouped && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-50 pointer-events-auto"
          >
            <Button 
              onClick={() => setIsGrouped(false)}
              className="bg-slate-900 hover:bg-slate-800 text-white shadow-2xl rounded-full px-6 py-6 h-auto flex items-center gap-3 group border-2 border-white/10"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-bold text-sm uppercase tracking-widest">Desfazer Agrupamento</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {isAdmin && data.length > 0 && !isGrouped && (
        <motion.div 
          layout
          className="bg-[#008542]/5 border-2 border-[#008542]/20 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="bg-[#008542] text-white p-2.5 rounded-xl shadow-sm">
               <Network className="w-5 h-5 animate-pulse" />
            </div>
            <div>
               <h4 className="text-[13px] font-black tracking-widest uppercase text-[#008542]">Agrupamento Inteligente Disponível</h4>
               <p className="text-xs text-[#008542]/80 mt-0.5 font-bold">A inteligência de dados identificou padrões recorrentes.</p>
            </div>
          </div>
          <Button 
            onClick={() => setIsGrouped(true)}
            className="bg-[#008542] hover:bg-[#006e36] text-white text-xs font-black uppercase tracking-widest px-6 shadow-md shadow-[#008542]/20 border-b-4 border-[#005a2d] active:border-b-0 active:translate-y-1 transition-all"
          >
             <Sparkles className="w-4 h-4 mr-2" />
             Ativar Agrupamento
          </Button>
        </motion.div>
      )}
      
      <div className="flex flex-col gap-6">
        {isGrouped && groupedDemands ? (
          Object.entries(groupedDemands).map(([groupName, items]) => (
            <motion.div 
              key={groupName} 
              layout
              className="space-y-4"
            >
              <div className="flex items-center gap-3 px-1">
                <div className="h-px flex-1 bg-slate-200" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 flex items-center gap-2">
                  <LayoutGrid className="w-3 h-3" />
                  {groupName} <span className="text-primary opacity-50">({items.length})</span>
                </h3>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="flex flex-col gap-4">
                {items.map((demanda) => (
                  <motion.div key={demanda.id} layout>
                    <DemandRow demanda={demanda} isAdmin={isAdmin} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col gap-4">
            {data.map((demanda) => (
              <motion.div 
                key={demanda.id} 
                layout
              >
                <DemandRow demanda={demanda} isAdmin={isAdmin} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
