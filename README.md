# Acessível Hub 🚀
**Desenvolvedor e Líder de Projeto:** [Rafael Domingues](https://github.com/rafaeldominguesdev)

Este projeto foi desenvolvido como solução para o **Grand Prix SENAI de Inovação**, focado no desafio proposto pela **Petrobras** sobre a descentralização das ações de acessibilidade interna.

---

## 👨‍💻 Liderança e Visão de Solução
Como líder e desenvolvedor principal deste projeto, meu foco foi transformar uma série de iniciativas isoladas (RH, TI, Saúde e Engenharia) em um **ecossistema único e inteligente**. 

A estratégia foi baseada em:
1.  **Diagnóstico de Causa Raiz:** Identifiquei que o problema não era a falta de programas, mas a falta de um "Hub" que centralizasse e orquestrasse essas ações.
2.  **Organização de Fluxo:** Estruturei o sistema para que a Inteligência Artificial atuasse como um braço direito do gestor, automatizando a triagem e sugerindo caminhos com base em dados reais.
3.  **Mentoria Técnica:** Coordenei a resolução de bugs críticos de infraestrutura e runtime para garantir que o projeto estivesse pronto para escala em menos de 24h.

---

## 🛠️ Desafios Técnicos Superados (Deep Dive)

Abaixo, detalho os problemas reais que resolvi para colocar esta plataforma de pé:

### ⚙️ 1. Recuperação de Infraestrutura e Ambiente
O projeto enfrentava conflitos de dependências entre **React 19** e bibliotecas de geolocalização legadas. 
*   **Solução:** Implementei uma estratégia de instalação via `--legacy-peer-deps` e atualizei o ambiente local para **Node.js v24 (LTS)**, garantindo estabilidade no build.
*   **Segurança:** Configurei as políticas de execução do PowerShell para permitir automação via scripts e otimizei o cache do `next` para evitar erros de compilação.

### 💧 2. Resolução de Hydration Mismatch (Next.js)
Um dos bugs mais complexos foi o erro de "Hydration failed" causado pelo cálculo de tempo relativo (ex: "há 2 minutos") que divergia entre o servidor e o cliente.
*   **Solução:** Desenvolvi um componente customizado `RelativeTime` que utiliza `useEffect` para garantir que o tempo seja renderizado apenas após a montagem do componente no cliente, eliminando avisos de erro e melhorando a performance de renderização.

### 🧩 3. Correção de Tipagem e Componentes UI
Corrigi erros de tipagem estrutural na Sidebar e em componentes do Radix UI onde propriedades conflitantes impediam o build de produção. Garanti que o TypeScript estivesse 100% limpo para facilitar manutenções futuras.

---

## 💡 A Solução Estratégica
A plataforma não é apenas um portal de relatos; é um **Monitor Inteligente de Gestão**:
*   **IA de Roteamento:** Lê o relato e envia em segundos para o e-mail/Teams da área responsável (fim do jogo de empurra).
*   **Clustering (Agrupamento):** Se 10 pessoas reclamam do mesmo elevador em unidades diferentes, a IA agrupa esses pedidos em um "Cluster", permitindo que o gestor resolva a causa raiz de uma vez só.
*   **Mapa de Calor (Heatmap):** Visibilidade geográfica em tempo real de onde estão as maiores barreiras de acessibilidade da Petrobras.

---

## 🧪 Stack Técnica
*   **Framework:** Next.js 16 (Turbopack)
*   **Frontend:** React 19, Tailwind CSS, Framer Motion
*   **Linguagem:** TypeScript
*   **Design System:** Base UI & Lucide React
*   **Inteligência:** NLP para Triagem e Clustering de Dados

---

## 📈 Impacto de Negócio (Lean Canvas)
Toda a lógica de negócio foi documentada via **Lean Canvas**, focando em:
*   **Métrica de Ouro:** Redução do tempo de encaminhamento (TTR) de 24 horas para menos de 1 minuto.
*   **Vantagem Competitiva:** Único sistema que correlaciona falhas sistêmicas entre diferentes unidades físicas.

---
**Contato:** [rafadominguesdev@gmail.com](mailto:rafadominguesdev@gmail.com)
