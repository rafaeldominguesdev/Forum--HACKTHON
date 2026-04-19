import { Demanda, User, Resposta } from '@/types';
import { DemandaStatus, TipoBarreira, BARREIRA_LABELS } from '@/lib/constants';

// Mapeamento de Unidade para Estado (Abrangência Nacional - 27 Estados)
export const UNIT_TO_STATE: Record<string, string> = {
  "Polo Industrial de Rio Branco": "AC",
  "Terminal de Maceió": "AL",
  "Base Operacional Amapá": "AP",
  "Refinaria de Manaus (REMAN)": "AM",
  "Terminal de Madre de Deus": "BA",
  "Lubrificantes do Nordeste (LUBNOR)": "CE",
  "Sede Administrativa Brasília": "DF",
  "Terminal de Vitória": "ES",
  "Base de Distribuição Goiás": "GO",
  "Terminal de São Luís": "MA",
  "Polo de Exploração Mato Grosso": "MT",
  "Base Campo Grande": "MS",
  "Refinaria Gabriel Passos (REGAP)": "MG",
  "Polo Logístico do Pará": "PA",
  "Terminal de João Pessoa": "PB",
  "Refinaria Presidente Getúlio Vargas (REPAR)": "PR",
  "Refinaria Abreu e Lima (RNEST)": "PE",
  "Base de Teresina": "PI",
  "Sede Rio de Janeiro (EDISE)": "RJ",
  "Polo Ativo de Mossoró": "RN",
  "Refinaria Alberto Pasqualini (REFAP)": "RS",
  "Base Operacional Ji-Paraná": "RO",
  "Polo de Exploração Roraima": "RR",
  "Terminal de São Francisco do Sul": "SC",
  "Refinaria de Paulínia (REPLAN)": "SP",
  "Unidade de Processamento Carmópolis": "SE",
  "Base de Palmas": "TO",
};

const UNIT_LOCATIONS: Record<string, [number, number]> = {
  "Polo Industrial de Rio Branco": [-9.9748, -67.8076],
  "Terminal de Maceió": [-9.6658, -35.7350],
  "Base Operacional Amapá": [0.0383, -51.0694],
  "Refinaria de Manaus (REMAN)": [-3.1190, -60.0217],
  "Terminal de Madre de Deus": [-12.7408, -38.6231],
  "Lubrificantes do Nordeste (LUBNOR)": [-3.7172, -38.5283],
  "Sede Administrativa Brasília": [-15.7942, -47.8822],
  "Terminal de Vitória": [-20.3155, -40.3128],
  "Base de Distribuição Goiás": [-16.6869, -49.2648],
  "Terminal de São Luís": [-2.5307, -44.3068],
  "Polo de Exploração Mato Grosso": [-15.6010, -56.0974],
  "Base Campo Grande": [-20.4697, -54.6201],
  "Refinaria Gabriel Passos (REGAP)": [-19.9702, -44.1534],
  "Polo Logístico do Pará": [-1.4558, -48.4902],
  "Terminal de João Pessoa": [-7.1195, -34.8450],
  "Refinaria Presidente Getúlio Vargas (REPAR)": [-25.5947, -49.3875],
  "Refinaria Abreu e Lima (RNEST)": [-8.4042, -34.9667],
  "Base de Teresina": [-5.0920, -42.8034],
  "Sede Rio de Janeiro (EDISE)": [-22.9068, -43.1729],
  "Polo Ativo de Mossoró": [-5.1878, -37.3444],
  "Refinaria Alberto Pasqualini (REFAP)": [-29.9167, -51.1833],
  "Base Operacional Ji-Paraná": [-10.8775, -61.9511],
  "Polo de Exploração Roraima": [2.8235, -60.6758],
  "Terminal de São Francisco do Sul": [-26.2425, -48.6369],
  "Refinaria de Paulínia (REPLAN)": [-22.7610, -47.1539],
  "Unidade de Processamento Carmópolis": [-10.6486, -36.9856],
  "Base de Palmas": [-10.1500, -48.3333],
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Paula Souza',
    email: 'ana.souza@petrobras.com.br',
    role: 'USER',
    department: 'Recursos Humanos',
    unit: 'Sede Administrativa Brasília',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Carlos Eduardo Lima',
    email: 'carlos.lima@petrobras.com.br',
    role: 'USER',
    department: 'Tecnologia da Informação',
    unit: 'Refinaria de Paulínia (REPLAN)',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    name: 'Mariana Costa',
    email: 'mariana.costa@petrobras.com.br',
    role: 'ADMIN',
    department: 'Sustentabilidade e Acessibilidade',
    unit: 'Sede Rio de Janeiro (EDISE)',
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2023-11-01'),
  },
  {
    id: '4',
    name: 'Rafael Caldeira',
    email: 'rafael.caldeira@petrobras.com.br',
    role: 'USER',
    department: 'Design & UX',
    unit: 'Sede Rio de Janeiro (EDISE)',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
];

export const mockRespostas: Resposta[] = [
  {
    id: 'r1',
    conteudo: 'Recebemos seu relato e já acionamos a gerência de infraestrutura local. Uma equipe técnica fará o nivelamento da calçada e a instalação de piso tátil na próxima semana.',
    autor: mockUsers[2],
    isAdminResponse: true,
    demandaId: 'rj-1',
    createdAt: new Date('2024-04-02'),
    updatedAt: new Date('2024-04-02'),
  },
];

// Gerar demandas reais com efeito de Mapa de Calor
const generateMockDemandas = (): Demanda[] => {
  const situations = [
    // SERGIPE (MEMÓRIA OPERACIONAL) - AGORA EM PRIMEIRO
    {
      st: "SE", unit: "Unidade de Processamento Carmópolis", type: TipoBarreira.ARQUITETONICA,
      title: "Falha de Nivelamento em Rampa de Acesso",
      desc: "A rampa que dá acesso ao bloco administrativo possui um degrau no início do plano inclinado, dificultando o uso de cadeiras de rodas.",
      status: DemandaStatus.NOVA,
      authorIndex: 0, // Ana Paula Souza
      isMemoryTarget: true,
      fixedDate: new Date('2022-04-16T10:00:00Z') // "há cerca de 2 anos"
    },
    // SAP - SEGUNDA POSIÇÃO
    {
      st: "SP", unit: "Sede Administrativa São Paulo", type: TipoBarreira.TECNOLOGICA,
      title: "Sistema SAP Inacessível via NVDA",
      desc: "Colaboradores com deficiência visual relatam que a nova atualização do módulo de compras impossibilitou a leitura de campos críticos via NVDA.",
      status: DemandaStatus.NOVA,
      categoryName: "SISTEMAS DIGITAIS",
      integration: "ACESSIBILIDADE ERP NACIONAL",
      authorIndex: 1, // Carlos Eduardo Lima
      fixedDate: new Date('2024-04-16T21:40:00Z'),
      customAI: {
        titulo: "Adequação Portal Jurídico para NVDA",
        norma: "WCAG 2.1 AA / NR-17"
      }
    },
    // CAPACITISMO - TERCEIRA POSIÇÃO
    {
      st: "RJ", unit: "Sede Rio de Janeiro (EDISE)", type: TipoBarreira.COMUNICACIONAL,
      title: "Subestimação da minha capacidade analítica (Capacitismo)",
      desc: "Relato de comportamento recorrente onde tarefas complexas são desviadas de mim sob justificativa de 'não me sobrecarregar' devido à minha deficiência.",
      status: DemandaStatus.EM_ANDAMENTO,
      categoryName: "CULTURA E LIDERANÇA",
      authorIndex: 0, // Ana Paula Souza
      fixedDate: new Date('2024-04-16T21:35:00Z'),
      customAI: {
        titulo: "Trilha Anti-Capacitismo Lideranças 2023",
        norma: "Política de Diversidade 4.1"
      }
    },
    // RIO DE JANEIRO (RESOLVIDA) - QUARTA POSIÇÃO
    { 
      st: "RJ", unit: "Sede Rio de Janeiro (EDISE)", type: TipoBarreira.ARQUITETONICA, 
      title: "Desnível Crítico no Calçamento Externo", 
      desc: "O calçamento de pedras portuguesas na entrada principal apresenta desníveis que impossibilitam o acesso autônomo de cadeirantes.",
      status: DemandaStatus.RESOLVIDA,
      fixedDate: new Date('2024-04-15T15:00:00Z')
    },

    // RIO DE JANEIRO (OUTRAS)
    ...Array.from({ length: 17 }).map((_, i) => ({
      st: "RJ", unit: "Sede Rio de Janeiro (EDISE)", type: i % 4 === 0 ? TipoBarreira.ARQUITETONICA : TipoBarreira.COMUNICACIONAL,
      title: i % 4 === 0 ? "Piso Irregular no Estacionamento" : `Inconsistência RJ #${i + 2}`,
      desc: i % 4 === 0 ? "Área de embarque e desembarque com fissuras no asfalto." : "Barreira identificada durante auditoria de acessibilidade na sede administrativa.",
      status: DemandaStatus.EM_ANDAMENTO
    })),

    // SÃO PAULO (CRÍTICO - 12 Demandas)
    ...Array.from({ length: 12 }).map((_, i) => ({
      st: "SP", unit: "Refinaria de Paulínia (REPLAN)", type: i % 3 === 0 ? TipoBarreira.TECNOLOGICA : TipoBarreira.ARQUITETONICA,
      title: i === 0 ? "Totens de Autoatendimento sem Áudio" : (i === 1 ? "Catracas com Altura Inadequada" : `Ajuste SP #${i + 1}`),
      desc: i === 0 ? "Os novos totens de segurança na entrada não possuem saída de áudio para orientação de pessoas cegas." : "Ajuste técnico necessário para garantir acessibilidade plena.",
      status: DemandaStatus.NOVA
    })),

    // BAHIA (ATENÇÃO - 7 Demandas)
    ...Array.from({ length: 7 }).map((_, i) => ({
      st: "BA", unit: "Terminal de Madre de Deus", type: TipoBarreira.ATITUDINAL,
      title: i === 0 ? "Barreiras Comportamentais em Reuniões" : `Treinamento BA #${i + 1}`,
      desc: i === 0 ? "Relato de comentários capacitistas recorrentes em reuniões de DDR." : "Demanda de sensibilização e treinamento atitudinal.",
      status: DemandaStatus.NOVA
    })),

    // PARANÁ (ATENÇÃO - 5 Demandas)
    ...Array.from({ length: 5 }).map((_, i) => ({
      st: "PR", unit: "Refinaria Presidente Getúlio Vargas (REPAR)", type: TipoBarreira.TECNOLOGICA,
      title: i === 0 ? "Exclusão em Treinamento de Campo" : `Ajuste PR #${i + 1}`,
      desc: i === 0 ? "Funcionário PCD relatou ter sido 'poupado' de treinamento técnico crucial." : "Incompatibilidade de sistema reportada.",
      status: DemandaStatus.EM_ANALISE
    })),

    // PERNAMBUCO (ATENÇÃO - 4 Demandas)
    ...Array.from({ length: 4 }).map((_, i) => ({
      st: "PE", unit: "Refinaria Abreu e Lima (RNEST)", type: TipoBarreira.ARQUITETONICA,
      title: i === 0 ? "Banheiro Adaptado Trancado" : `Adequação PE #${i + 1}`,
      desc: i === 0 ? "O único banheiro adaptado do bloco B vive trancado." : "Melhoria na sinalização tátil.",
      status: DemandaStatus.EM_ANDAMENTO
    })),

    // ESTADOS ESTÁVEIS (1 Demanda cada)
    { st: "AM", unit: "Refinaria de Manaus (REMAN)", type: TipoBarreira.TRANSPORTE, title: "Dificuldade em Transporte Fluvial", desc: "As embarcações de transporte não possuem rampa ou elevador.", status: DemandaStatus.NOVA },
    { st: "CE", unit: "Lubrificantes do Nordeste (LUBNOR)", type: TipoBarreira.ARQUITETONICA, title: "Rampa com Inclinação Excessiva", desc: "A rampa de acesso ao refeitório está fora das normas da NBR 9050.", status: DemandaStatus.RESOLVIDA },
    { st: "RN", unit: "Polo Ativo de Mossoró", type: TipoBarreira.TECNOLOGICA, title: "Rádios sem Feedback Vibratório", desc: "Rádios de campo sem alerta vibratório.", status: DemandaStatus.NOVA },
    { st: "ES", unit: "Terminal de Vitória", type: TipoBarreira.TECNOLOGICA, title: "Catracas sem Acesso Adaptado", desc: "Catracas sem leitor biométrico em altura acessível.", status: DemandaStatus.NOVA },
    { st: "DF", unit: "Sede Administrativa Brasília", type: TipoBarreira.COMUNICACIONAL, title: "Falta de Alt Text em Informativos", desc: "Comunicados internos sem descrição de imagem.", status: DemandaStatus.EM_ANDAMENTO }
  ];

  return situations.map((s, index) => {
    const data = s as any;
    
    return {
      id: `${data.st.toLowerCase()}-${index}`,
      titulo: data.title,
      descricao: data.desc,
      status: data.status,
      prioridade: index % 3 === 0 ? 'ALTA' : (index % 2 === 0 ? 'MEDIA' : 'BAIXA'),
      categoria: { id: `c${index}`, nome: data.categoryName || (data.type.charAt(0).toUpperCase() + data.type.slice(1)) },
      tipoBarreira: { id: `b${index}`, slug: data.type, nome: BARREIRA_LABELS[data.type] },
      unidade: data.unit,
      autor: data.authorIndex !== undefined ? mockUsers[data.authorIndex] : mockUsers[index % mockUsers.length],
      iniciativaVinculada: data.integration ? {
        id: `int-${index}`,
        nome: data.integration,
        status: 'EM_EXECUCAO'
      } : undefined,
      respostas: data.status === DemandaStatus.RESOLVIDA ? [mockRespostas[0]] : [],
      votos: Math.floor(Math.random() * 30),
      createdAt: data.fixedDate ? data.fixedDate.toISOString() : new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      updatedAt: new Date().toISOString(),
      coordinates: UNIT_LOCATIONS[data.unit],
      aiAnalysis: {
        suggestedArea: data.type === TipoBarreira.ARQUITETONICA ? "Infraestrutura" : "Gente e Gestão",
        confidence: 0.85 + Math.random() * 0.15,
        isAttitudinal: data.type === TipoBarreira.ATITUDINAL,
        operacionalMemory: data.isMemoryTarget ? {
          sourceId: "rj-0",
          sourceTitle: "Desnível Crítico no Calçamento Externo",
          sourceLocation: "Rio de Janeiro (EDISE)",
          quote: "Aqui está o coração do projeto: a Memória Operacional. Quando resolvemos um problema de calçamento no Rio, o sistema estrutura a solução e a armazena. Se o mesmo padrão aparece em Sergipe, a plataforma recupera o histórico e sugere a resposta comprovada."
        } : undefined,
        solucaoHistorica: data.customAI || (data.isMemoryTarget ? {
          titulo: "Instalação de Piso Intertravado Nivelado e Rampa NBR 9050",
          norma: "ABNT NBR 9050:2020",
          link: "#"
        } : (data.type === TipoBarreira.ARQUITETONICA ? {
          titulo: "Adequação de Rampa de Acesso e Piso Tátil",
          norma: "NBR 9050",
          link: "#"
        } : (data.type === TipoBarreira.COMUNICACIONAL ? {
          titulo: "Trilha de Sensibilização em Comunicação Inclusiva",
          norma: "Informativo RH 2.0",
          link: "#"
        } : (data.type === TipoBarreira.TECNOLOGICA ? {
          titulo: "Revisão de Acessibilidade Digital e UX Inclusiva",
          norma: "WCAG 2.1 AA",
          link: "#"
        } : (data.type === TipoBarreira.ATITUDINAL ? {
          titulo: "Workshop de Cultura Inclusiva e Anti-Capacitismo",
          norma: "Política de Diversidade 4.1",
          link: "#"
        } : {
          titulo: "Implementação de Elevador e Acesso Adaptado",
          norma: "Norma Técnica 12.3",
          link: "#"
        })))))
      }
    };
  });
};


export const mockDemandas = generateMockDemandas();
