# Acessível Hub 🚀

![Status](https://img.shields.io/badge/Status-Produção-success)
![Next.js](https://img.shields.io/badge/Next.js-16.0%20(Turbo)-black)
![React](https://img.shields.io/badge/React-19.0-blue)
![License](https://img.shields.io/badge/License-MIT-orange)

## 📋 Descrição do Projeto

O **Acessível Hub** é uma plataforma corporativa inteligente projetada para unificar e orquestrar ações de acessibilidade em grandes organizações. Desenvolvido como solução estratégica para o **Grand Prix SENAI de Inovação** (Desafio Petrobras), o sistema resolve a fragmentação histórica entre departamentos como RH, TI, Saúde e Infraestrutura, transformando silos isolados em um ecossistema de inclusão ágil e orientado por dados.

O Hub atua como o ponto central de inteligência, eliminando processos reativos e garantindo que cada barreira de acessibilidade reportada seja endereçada à área correta em tempo recorde.

---

## ✨ Funcionalidades Principais

*   **Triagem Inteligente via IA:** Utiliza Processamento de Linguagem Natural (NLP) para analisar relatos e rotear demandas automaticamente para os responsáveis, eliminando falhas de comunicação.
*   **Motor de Semantic Clustering:** Agrupa automaticamente demandas similares de diferentes unidades para identificar falhas sistêmicas e permitir a resolução da causa raiz.
*   **Painel de Visibilidade Analítica:** Dashboards executivos que oferecem uma visão holística do status de acessibilidade da companhia em tempo real.
*   **Mapa de Calor (Heatmap):** Visualização geoespacial das maiores barreiras de acessibilidade, permitindo priorização de investimentos e intervenções físicas.
*   **Gestão Transversal de Fluxos:** Conexão direta entre o colaborador PcD e as áreas de suporte (Engenharia, TI, SMS), reduzindo drasticamente o tempo de resposta.

---

## 🏗️ Arquitetura e Visão Geral

O sistema foi arquitetado com foco em **escalabilidade e alta performance**, utilizando uma abordagem de "Hub-and-Spoke":

1.  **Camada de Captura:** Interface ultra-acessível para entrada de dados e relatos de usuários.
2.  **Motor de Inteligência:** Uma camada de serviço que processa a semântica dos relatos, realiza o agrupamento por clusters de similaridade e determina o roteamento.
3.  **Camada de Visualização:** Processamento de dados geoespaciais e renderização de indicadores de performance (KPIs) de acessibilidade.

A decisão de utilizar **Next.js 16 (Turbo)** e **React 19** garante uma experiência de usuário fluida, com carregamento otimizado e uma fundação técnica de vanguarda preparada para futuras integrações corporativas.

---

## 🛠️ Tecnologias Utilizadas

*   **Frontend:** [React 19](https://react.dev/) e [Next.js 16](https://nextjs.org/) (App Router & Turbopack).
*   **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/) para design responsivo e acessível.
*   **Animações:** [Framer Motion](https://www.framer.com/motion/) para micro-interações fluidas.
*   **Componentes de UI:** [Radix UI](https://www.radix-ui.com/) e [Base UI](https://base-ui.com/) para garantia de acessibilidade (WAI-ARIA).
*   **Visualização de Dados:** [D3-geo](https://d3js.org/d3-geo) e [React Simple Maps](https://www.react-simple-maps.io/).
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/) para robustez e tipagem estática.

---

## 🚀 Instalação e Execução

### Pré-requisitos
*   Node.js v20+ (Recomendado: v24 LTS)
*   npm ou yarn

### Passos para execução local

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/rafaeldominguesdev/Forum--hackthon.git
    cd Forum--hackthon/grandprix
    ```

2.  **Instalação de Dependências:**
    Como utilizamos tecnologias de vanguarda (React 19), utilize o parâmetro `--legacy-peer-deps` se necessário:
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Executar em Desenvolvimento:**
    ```bash
    npm run dev
    ```
    Acesse a plataforma em: `http://localhost:7777`

---

## 💡 Valor de Negócio e Impacto

*   **Redução de TTR (Time to Response):** Transformação do tempo médio de encaminhamento de 24 horas para menos de 1 minuto.
*   **Eficiência Organizacional:** Redução de custos operacionais através da automação de triagem e remoção de silos.
*   **Conformidade e ESG:** Fortalecimento da cultura de inclusão e garantia de conformidade com normas de acessibilidade e sustentabilidade social.

---

## 🧪 Estratégia de Testes

O projeto adota uma abordagem de testes focada em estabilidade de runtime e consistência de UI, garantindo que as complexas interações de dados geoespaciais e IA funcionem perfeitamente em diferentes resoluções.

Para executar os linters:
```bash
npm run lint
```

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## ✉️ Contato e Autor

**Rafael Domingues** - Líder de Projeto e Desenvolvedor Principal  
📧 [rafadominguesdev@gmail.com](mailto:rafadominguesdev@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/rafaeldominguesdev/) | [GitHub](https://github.com/rafaeldominguesdev)

---
*Desenvolvido para o Grand Prix SENAI de Inovação - Desafio Petrobras.*

