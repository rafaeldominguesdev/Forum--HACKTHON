"use client";

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { mockDemandas, UNIT_TO_STATE } from "@/lib/mock-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const geoUrl = "/brazil.json";

// Cores Institucionais
const STATUS_COLORS = {
  STABLE: "#008542",
  ATTENTION: "#f59e0b",
  CRITICAL: "#ef4444",
  EMPTY: "#f8fafc"
};

export function BrazilHeatmap() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Processamento de Dados (Camada de Inteligência)
  // Agrupar demandas por Estado
  const stateStats = mockDemandas.reduce((acc, demanda) => {
    if (!demanda.unidade) return acc;
    const stateSigla = UNIT_TO_STATE[demanda.unidade];
    if (!stateSigla) return acc;

    if (!acc[stateSigla]) {
      acc[stateSigla] = { count: 0, status: "Estável" };
    }

    // Considerar demandas "Não Resolvidas" para o calor do mapa
    if (["NOVA", "EM_ANALISE", "EM_ANDAMENTO"].includes(demanda.status)) {
      acc[stateSigla].count += 1;
    }

    // Lógica de Status por Volume
    if (acc[stateSigla].count >= 10) {
      acc[stateSigla].status = "Crítico";
    } else if (acc[stateSigla].count >= 2) {
      acc[stateSigla].status = "Atenção";
    }

    return acc;
  }, {} as Record<string, { count: number, status: string }>);

  // Agrupar marcadores para unidades operacionais
  const unitStats = mockDemandas.reduce((acc, demanda) => {
    if (!demanda.coordinates || !demanda.unidade) return acc;
    const key = demanda.unidade;
    if (!acc[key]) {
      acc[key] = { name: key, coordinates: demanda.coordinates, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {} as Record<string, { name: string, coordinates: [number, number], count: number }>);

  const unitsArray = Object.values(unitStats);

  if (!mounted) return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-[700px] flex items-center justify-center">
      <p className="text-slate-400 font-medium animate-pulse">Iniciando análise geográfica...</p>
    </div>
  );

  return (
    <div className="w-full relative group">
      {/* Informações Sobrepostas (Legenda Funcional) */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Visão Geográfica</h3>
        <p className="text-xs font-bold text-[#008542] tracking-[0.2em] uppercase mt-1">Status em Tempo Real</p>
        
        <div className="flex flex-col gap-3 mt-6 bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-slate-100 shadow-xl w-64 pointer-events-auto">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Legenda de Risco</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#008542] shadow-[0_0_10px_rgba(0,133,66,0.3)]" />
              <span className="text-xs font-bold text-slate-600">Estável</span>
            </div>
            <span className="text-[10px] font-black text-slate-400">0-1</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
              <span className="text-xs font-bold text-slate-600">Atenção</span>
            </div>
            <span className="text-[10px] font-black text-slate-400">2-9</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
              <span className="text-xs font-bold text-slate-600">Crítico</span>
            </div>
            <span className="text-[10px] font-black text-slate-400">10+</span>
          </div>
        </div>
      </div>

      {/* Container do Mapa (Choropleth Dinâmico) */}
      <div className="relative h-[720px] w-full bg-white rounded-[48px] border border-slate-200 shadow-[0_0_60px_-15px_rgba(0,133,66,0.2)] flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:shadow-[0_0_80px_-12px_rgba(0,133,66,0.3)]">
        <TooltipProvider>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 850,
              center: [-54, -15]
            }}
            style={{ width: "100%", height: "100%" }}
          >
            {/* Camada dos Estados (Camada Térmica) */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stats = stateStats[geo.properties?.sigla];
                  const fillColor = stats 
                    ? (stats.status === "Crítico" ? STATUS_COLORS.CRITICAL : (stats.status === "Atenção" ? STATUS_COLORS.ATTENTION : STATUS_COLORS.STABLE))
                    : STATUS_COLORS.EMPTY;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke="#ffffff"
                      strokeWidth={1}
                      className="transition-all duration-500 hover:opacity-80 cursor-default outline-none"
                    />
                  );
                })
              }
            </Geographies>

            {/* Camada de Marcadores (Unidades) */}
            {unitsArray.map(({ name, coordinates, count }) => {
              const markerSize = Math.max(6, Math.min(12, 6 + count * 2));

              return (
                <Marker key={name} coordinates={[coordinates[1], coordinates[0]] as any}>
                  <Tooltip>
                    <TooltipTrigger>
                      <g className="cursor-pointer group/marker">
                        <circle
                          r={markerSize + 4}
                          fill="rgba(255,255,255,0.4)"
                          className="animate-pulse"
                        />
                        <circle
                          r={markerSize}
                          fill="#1e293b"
                          className="stroke-white stroke-[2px] transition-transform duration-300 group-hover/marker:scale-125 shadow-2xl"
                        />
                      </g>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="p-4 bg-white border-slate-200 shadow-2xl rounded-2xl max-w-xs">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade Petrobras</p>
                        <p className="text-base font-bold text-slate-900 leading-tight">{name}</p>
                        <div className="pt-3 border-t border-slate-100 mt-3">
                          <p className="text-[10px] font-black text-slate-400 uppercase">Demandas Ativas</p>
                          <p className="text-xl font-black text-slate-900">{count}</p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </Marker>
              );
            })}
          </ComposableMap>
        </TooltipProvider>

        {/* Badge Flutuante de Insights */}
        <div className="absolute bottom-10 right-10 bg-slate-900 text-white p-6 rounded-[32px] shadow-2xl max-w-[280px] animate-in slide-in-from-bottom-5 duration-700">
           <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#008542] rounded-xl">
                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                 </svg>
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest">Resumo de Risco</h4>
           </div>
           <p className="text-xs text-slate-400 font-medium leading-relaxed">
             O estado do <span className="text-white font-bold">Rio de Janeiro</span> apresenta o maior volume de triagens (10+), necessitando de intervenção imediata.
           </p>
        </div>
      </div>
    </div>
  );
}
