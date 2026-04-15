import { Demanda, User, Resposta } from '@/types';
import { DemandaStatus, TipoBarreira } from '@/lib/constants';

// Mapeamento de Unidade para Estado (Sigla para combinar com GeoJSON)
export const UNIT_TO_STATE: Record<string, string> = {
  "EDISE - Rio de Janeiro": "RJ",
  "Refinaria REPLAN": "SP",
  "RPBC - Cubatão": "SP",
  "REGAP - Betim": "MG",
  "RLAM - Mataripe": "BA",
  "LUBNOR - Fortaleza": "CE",
  "CENPES - Rio": "RJ",
};

const UNIT_LOCATIONS: Record<string, [number, number]> = {
  "EDISE - Rio de Janeiro": [-22.9068, -43.1729],
  "Refinaria REPLAN": [-22.7610, -47.1539],
  "RPBC - Cubatão": [-23.8906, -46.4258],
  "REGAP - Betim": [-19.9702, -44.1534],
  "RLAM - Mataripe": [-12.6953, -38.5632],
  "LUBNOR - Fortaleza": [-3.7166, -38.4831],
  "CENPES - Rio": [-22.8596, -43.2323],
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Paula Souza',
    email: 'ana.souza@petrobras.com.br',
    role: 'USER',
    department: 'Recursos Humanos',
    unit: 'Sede Rio de Janeiro (EDISE)',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Carlos Eduardo Lima',
    email: 'carlos.lima@petrobras.com.br',
    role: 'USER',
    department: 'Tecnologia da Informação',
    unit: 'Refinaria REPLAN',
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
];

export const mockRespostas: Resposta[] = [
  {
    id: 'r1',
    conteudo: 'Prezada Ana, seu relato foi recebido pela Gerência de Infraestrutura. Uma equipe técnica foi enviada ao local para realizar o nivelamento da rampa e instalar o corrimão conforme as normas de acessibilidade (ABNT NBR 9050).',
    autor: mockUsers[2],
    isAdminResponse: true,
    demandaId: '1',
    createdAt: new Date('2024-04-02'),
    updatedAt: new Date('2024-04-02'),
  },
];

// Gerar demandas extras para simular o mapa de calor funcional
const generateMockDemandas = (): Demanda[] => {
  const base: Demanda[] = [
    {
      id: '1',
      titulo: 'Rampa de acesso ao Prédio B sem corrimão',
      descricao: 'A rampa de acesso principal ao Bloco B está sem corrimão bilateral.',
      status: DemandaStatus.EM_ANDAMENTO,
      prioridade: 'ALTA',
      categoria: { id: 'c1', nome: 'Infraestrutura' },
      tipoBarreira: { id: 'b1', slug: TipoBarreira.ARQUITETONICA, nome: 'Arquitetônica' },
      unidade: 'EDISE - Rio de Janeiro',
      autor: mockUsers[0],
      respostas: mockRespostas,
      votos: 12,
      createdAt: '2024-04-01T10:00:00Z',
      updatedAt: '2024-04-03T14:30:00Z',
      coordinates: UNIT_LOCATIONS["EDISE - Rio de Janeiro"],
    },
    {
      id: '2',
      titulo: 'Ponto Eletrônico Inacessível para Baixa Visão',
      descricao: 'O software de registro de jornada não possui contraste adequado.',
      status: DemandaStatus.EM_ANDAMENTO,
      prioridade: 'URGENTE',
      categoria: { id: 'c2', nome: 'Digital' },
      tipoBarreira: { id: 'b2', slug: TipoBarreira.TECNOLOGICA, nome: 'Tecnológica' },
      unidade: 'Refinaria REPLAN',
      autor: mockUsers[1],
      respostas: [],
      votos: 28,
      createdAt: '2024-04-05T08:15:00Z',
      updatedAt: '2024-04-05T08:15:00Z',
      coordinates: UNIT_LOCATIONS["Refinaria REPLAN"],
    },
    {
      id: '3',
      titulo: 'Ausência de Intérprete de Libras em Treinamentos',
      descricao: 'Treinamentos de SMS sem suporte de intérprete.',
      status: DemandaStatus.EM_ANDAMENTO,
      prioridade: 'ALTA',
      categoria: { id: 'c3', nome: 'Comunicação' },
      tipoBarreira: { id: 'b3', slug: TipoBarreira.COMUNICACIONAL, nome: 'Comunicacional' },
      unidade: 'RLAM - Mataripe',
      autor: mockUsers[2],
      respostas: [],
      votos: 5,
      createdAt: '2024-04-10T09:00:00Z',
      updatedAt: '2024-04-10T09:00:00Z',
      coordinates: UNIT_LOCATIONS["RLAM - Mataripe"],
    },
  ];

  // Injetar mais 12 demandas EM_ANDAMENTO no RJ para torná-lo CRÍTICO (10+)
  for (let i = 4; i <= 15; i++) {
    base.push({
      id: String(i),
      titulo: `Demanda Técnica #${i} - Acessibilidade`,
      descricao: 'Melhoria técnica necessária em unidade operacional.',
      status: DemandaStatus.EM_ANDAMENTO,
      prioridade: i % 2 === 0 ? 'MEDIA' : 'ALTA',
      categoria: { id: 'c1', nome: 'Infraestrutura' },
      tipoBarreira: { id: 'b1', slug: TipoBarreira.ARQUITETONICA, nome: 'Arquitetônica' },
      unidade: 'EDISE - Rio de Janeiro',
      autor: mockUsers[0],
      respostas: [],
      votos: Math.floor(Math.random() * 10),
      createdAt: '2024-04-12T10:00:00Z',
      updatedAt: '2024-04-12T10:00:00Z',
      coordinates: UNIT_LOCATIONS["EDISE - Rio de Janeiro"],
    });
  }

  // Injetar mais 4 demandas em SP para torná-lo ATENÇÃO (2-9)
  for (let i = 16; i <= 20; i++) {
    base.push({
      id: String(i),
      titulo: `Ajuste SP #${i}`,
      descricao: 'Ajuste de acessibilidade na refinaria.',
      status: DemandaStatus.EM_ANDAMENTO,
      prioridade: 'MEDIA',
      categoria: { id: 'c2', nome: 'Digital' },
      tipoBarreira: { id: 'b2', slug: TipoBarreira.TECNOLOGICA, nome: 'Tecnológica' },
      unidade: 'RPBC - Cubatão',
      autor: mockUsers[1],
      respostas: [],
      votos: 2,
      createdAt: '2024-04-14T08:00:00Z',
      updatedAt: '2024-04-14T08:00:00Z',
      coordinates: UNIT_LOCATIONS["RPBC - Cubatão"],
    });
  }

  return base;
};

export const mockDemandas = generateMockDemandas();
