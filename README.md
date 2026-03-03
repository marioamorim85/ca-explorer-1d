# CA Explorer 1D

**Interactive explorer for Elementary Cellular Automata — Wolfram's 256 rules**

> Developed for *Introduction to Network Science* · PhD in Computer Science · Universidade Lusófona de Lisboa
> Supervisor: **Prof. Dr. Manuel Pita** · Author: **Mário Amorim**

---

## English

### What is this?

Elementary Cellular Automata (ECA) are the simplest class of one-dimensional cellular automata, first systematically studied by Stephen Wolfram in the 1980s. A row of binary cells evolves over discrete time steps: each cell's next state is determined solely by itself and its two immediate neighbours — a neighbourhood of 3 cells yielding 2³ = 8 possible patterns. Defining an output bit for each pattern produces an 8-bit number, giving exactly **256 possible rules** (Rule 0 through Rule 255).

Despite their simplicity, ECAs exhibit remarkable behavioural diversity. Wolfram classified all 256 rules into four qualitative classes — from uniform fixed-point attractors (Class I) to systems capable of universal computation (Class IV, exemplified by Rule 110).

This tool lets you explore all 256 rules interactively, observe their space-time diagrams, and study how local binary interactions give rise to global computational behaviour.

### Features

- **Rule editor** — select any rule (0–255) via numeric input or slider; toggle individual output bits directly on the 8 neighbourhood patterns
- **Space-time diagram** — canvas-based rendering of up to 200 generations across up to 201 cells
- **Two simulation modes** — *Generate All* (instant full diagram) and *Animate* (generation-by-generation with scan-line effect)
- **Famous rules** — one-click presets for Rules 0, 30, 45, 73, 90, 110, 184, 255, colour-coded by Wolfram class
- **Theory panel** — built-in reference covering the grid model, neighbourhood encoding, Wolfram numbering, and the four behavioural classes
- **Advanced concepts** — density classification task, domains and particles, space-time information flow
- **Bilingual** — full English / Portuguese interface

### Getting Started

```bash
npm install
npm run dev      # development server (Vite HMR)
npm run build    # production build → dist/
npm run preview  # preview production build locally
```

### Scientific Background

| Rule | Wolfram Class | Notable property |
|------|--------------|-----------------|
| 0, 255 | I | Uniform fixed-point attractor |
| 90, 184 | II | Periodic / Sierpiński triangle; traffic flow model |
| 30, 45 | III | Pseudo-random chaos; used in Mathematica's random number generator |
| 110 | IV | Turing-complete — proven capable of universal computation |

Wolfram's numbering scheme interprets the 8 output bits as a binary integer. For example, Rule 30 outputs `00011110₂ = 30₁₀`.

### References

- Wolfram, S. (2002). *A New Kind of Science*. Wolfram Media.
- Cenek, M., Marques-Pita, M. & Mitchell, M. *"Automatic Identification of Information-Processing Structures in Cellular Automata"*. Preprint submitted to *Physica D: Nonlinear Phenomena*.
- Cenek, M. (2011). *"Information Processing in Two-Dimensional Cellular Automata"*. PhD Dissertation, Portland State University. [Open Access ↗](https://pdxscholar.library.pdx.edu/open_access_etds/275/)

### Tech Stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 19 |
| Language | TypeScript 5.7 (strict) |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3.4 + custom CSS design system |
| Icons | Lucide React |
| Fonts | Syne · IBM Plex Sans · JetBrains Mono |

---

## Português

### O que é isto?

Os Autómatos Celulares Elementares (ACE) são a classe mais simples de autómatos celulares unidimensionais, sistematicamente estudados por Stephen Wolfram nos anos 1980. Uma fila de células binárias evolui em passos de tempo discretos: o estado seguinte de cada célula é determinado apenas por si própria e pelos dois vizinhos imediatos — uma vizinhança de 3 células que produz 2³ = 8 padrões possíveis. Ao definir um bit de saída para cada padrão obtém-se um número de 8 bits, o que dá exactamente **256 regras possíveis** (Regra 0 a Regra 255).

Apesar da sua simplicidade, os ACE exibem uma diversidade comportamental notável. Wolfram classificou as 256 regras em quatro classes qualitativas — desde atractores fixos uniformes (Classe I) até sistemas capazes de computação universal (Classe IV, exemplificada pela Regra 110).

Esta ferramenta permite explorar as 256 regras de forma interactiva, observar os respectivos diagramas espaço-tempo, e estudar como interacções binárias locais dão origem a comportamento computacional global.

### Funcionalidades

- **Editor de regra** — selecciona qualquer regra (0–255) por input numérico ou slider; alterna bits de saída directamente nos 8 padrões de vizinhança
- **Diagrama espaço-tempo** — renderização em canvas com até 200 gerações e até 201 células
- **Dois modos de simulação** — *Gerar Tudo* (diagrama completo instantâneo) e *Animar* (geração a geração com efeito de scan-line)
- **Regras famosas** — atalhos para as Regras 0, 30, 45, 73, 90, 110, 184, 255, com código de cores por classe de Wolfram
- **Painel de teoria** — referência integrada sobre o modelo de grelha, codificação da vizinhança, numeração de Wolfram e as quatro classes comportamentais
- **Conceitos avançados** — tarefa de classificação de densidade, domínios e partículas, fluxo de informação no espaço-tempo
- **Bilingue** — interface completa em inglês e português

### Arranque Rápido

```bash
npm install
npm run dev      # servidor de desenvolvimento (Vite HMR)
npm run build    # build de produção → dist/
npm run preview  # pré-visualização do build de produção
```

### Contexto Científico

| Regra | Classe de Wolfram | Propriedade notável |
|-------|------------------|---------------------|
| 0, 255 | I | Atractor fixo uniforme |
| 90, 184 | II | Periódica / triângulo de Sierpiński; modelo de tráfego |
| 30, 45 | III | Caos pseudo-aleatório; usado no gerador de números aleatórios do Mathematica |
| 110 | IV | Turing-completa — capacidade de computação universal demonstrada |

O esquema de numeração de Wolfram interpreta os 8 bits de saída como um inteiro binário. Por exemplo, a Regra 30 produz `00011110₂ = 30₁₀`.

### Referências

- Wolfram, S. (2002). *A New Kind of Science*. Wolfram Media.
- Cenek, M., Marques-Pita, M. & Mitchell, M. *"Automatic Identification of Information-Processing Structures in Cellular Automata"*. Preprint submetido a *Physica D: Nonlinear Phenomena*.
- Cenek, M. (2011). *"Information Processing in Two-Dimensional Cellular Automata"*. Dissertação de Doutoramento, Portland State University. [Acesso Aberto ↗](https://pdxscholar.library.pdx.edu/open_access_etds/275/)

### Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| Framework UI | React 19 |
| Linguagem | TypeScript 5.7 (strict) |
| Build | Vite 6 |
| Estilos | Tailwind CSS 3.4 + sistema de design CSS personalizado |
| Ícones | Lucide React |
| Tipografia | Syne · IBM Plex Sans · JetBrains Mono |
