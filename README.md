# Teste Front-End Econverse

O projeto **Teste Front-End Econverse** é uma vitrine de produtos construída com **React + TypeScript + Sass**, consumindo a API de produtos do teste e reproduzindo o layout do [Figma](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1).

Diferente de vitrines montadas com bibliotecas de componentes, aqui **nenhuma lib de UI** foi usada: carrossel, modal, tabs, stepper e todos os estilos são feitos com CSS Modules + variáveis globais. O resultado atinge **100/100 no Lighthouse** (desktop) nas categorias Performance, Acessibilidade, Best Practices e SEO.

Este repositório é um [fork de EconverseAG/teste-front-end](https://github.com/EconverseAG/teste-front-end) — o teste prático para a vaga de desenvolvedor front-end na Econverse: reprodução de layout via Figma, consumo de API e boas práticas de codificação.

## Demonstração

**Web:** [econverse.nivaldoandrade.dev.br](https://econverse.nivaldoandrade.dev.br/)

## Funcionalidades

- **Carrossel de produtos**: cada vitrine exibe 4 produtos por vez (10 no total), com setas de navegação, arraste nativo (pointer events) e tabs de categoria;
- **Modal de produto**: abre ao clicar em qualquer card, renderizado em portal, com overlay, animação de entrada/saída, fechamento por `Esc`/clique fora, stepper de quantidade e trava de scroll do body;
- **Desconto simulado**: como a API não retorna preço antigo nem parcelamento, o preço riscado é calculado como `round(price × 1.1)` e o parcelamento em `2x` sem juros;
- **Header completo**: barra de benefícios, busca, ações de conta (com hover de opacidade) e menu de categorias com seleção ativa;
- **Newsletter**: formulário com validação, checkbox estilizado via CSS e feedback de sucesso;
- **Categorias**: grid com ícones traçados (potrace + svgr) e destaque de item ativo;
- **Responsivo**: layout degrada abaixo de 1100px, 800px e 640px sem quebrar o design desktop;
- **Acessibilidade/SEO**: HTML semântico (`header/main/section/article/footer`), landmarks, labels acessíveis, contraste WCAG AA e meta tags Open Graph no `index.html`.

## Arquitetura

O app é uma SPA estática (Vite build) com consumo de API via proxy: no dev o próprio Vite faz o papel de intermediário, em produção uma CloudFront Function:

```text
┌──────────────────────────────────────────────────────┐
│  Navegador (SPA)                                     │
│                                                      │
│  App.tsx                                             │
│   ├── Header            benefícios · busca · menu    │
│   ├── Hero              banner + CTA                 │
│   ├── CategoryGrid      ícones svgr + estado ativo   │
│   ├── ProductCarousel   ×3 (tabs · setas · drag)     │
│   │     └── ProductCard abre o modal no click        │
│   ├── ProductModal      portal · ESC · stepper       │
│   ├── SupportBanners / Brands / Newsletter / Footer  │
│   └── useProducts ──► productsService.list()         │
│            GET /api/teste-front-end/.../produtos.json│
└───────────────────────┬──────────────────────────────┘
                        │
       ┌────────────────┴────────────────┐
       │  dev:  proxy do Vite            │  prod: CloudFront Function
       │  (server.proxy no vite.config)  │  (strip /api → origem Econverse)
       └────────────────┬────────────────┘
                        ▼
      app.econverse.com.br/teste-front-end/.../produtos.json
```

### Fluxo de dados

```text
App (useProducts)
  → services/productsService.list()
    → fetch('/api/.../produtos.json')
      → dev: rewrite do Vite proxy
        prod: CloudFront Function (remove o prefixo /api)
        → Econverse (JSON: success + products)
      → retorno mapeado para o formato da aplicação
        (preço convertido de centavos para reais)
```

### Por que um proxy?

A API da Econverse não retorna o header `Access-Control-Allow-Origin`, então um `fetch` direto do navegador falharia por CORS. No dev o `server.proxy` do `vite.config.ts` resolve; em produção a origem `app.econverse.com.br` foi adicionada na CloudFront com uma behavior `/api*` e uma CloudFront Function que remove o prefixo. Para o navegador, a request continua same-origin.

## Pré-requisitos

- [Node.js 20 ou superior](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) (o projeto usa `yarn.lock`, não npm/pnpm)

## Passo a passo

### 1. Clone o repositório

```bash
git clone https://github.com/nivaldoandrade/econverse-teste-front.git

cd econverse-teste-front
```

### 2. Instale as dependências

```bash
yarn
```

### 3. Inicie a aplicação

```bash
yarn dev
```

- Abre em `http://localhost:5173`;
- O proxy `/api` já está configurado no `vite.config.ts`, nenhum `.env` é necessário.

## Comandos

```bash
# Dependências
yarn                    # instalar

# Desenvolvimento
yarn dev                # servidor de desenvolvimento (HMR)

# Produção
yarn build              # build em dist/ (tsc + vite build)
yarn preview            # serve o dist/ localmente

# Qualidade
yarn lint               # ESLint (max-warnings 0)
yarn lint:fix           # ESLint --fix
yarn format             # Prettier --check
yarn format:fix         # Prettier --write
```

Não há suíte de testes: `yarn lint`, `yarn format` e `yarn build` são as verificações.

## Estrutura do código

```text
src/
├── components/                 # convenção: PascalCase/ + index.tsx + module.scss
│   ├── Header/                 # benefícios, busca, ações e menu
│   ├── Hero/                   # banner principal com CTA
│   ├── CategoryGrid/           # "Compre por categoria" (ícones svgr)
│   ├── ProductCard/            # card de produto (vitrine e modal)
│   ├── ProductCarousel/        # vitrine: título, tabs, carrossel e setas
│   │   └── components/         # CarouselArrow (prev/next, disabled)
│   ├── SupportBanners/         # banners "Confira" / "Parceiros"
│   ├── Brands/                 # "Navegue por marcas"
│   ├── Newsletter/             # formulário de inscrição
│   ├── Footer/                 # rodapé completo
│   ├── ProductModal/           # modal (portal + animação + ESC)
│   └── ReactPortal/            # portal para #portal-root
├── assets/icons/               # SVGs (cat-*.svg, icon-crown.svg) via svgr
├── hooks/
│   ├── useProducts.ts          # carrega os produtos (loading/erro/sucesso)
│   ├── useModal.ts             # controla abertura/fechamento do modal
│   └── useAnimatedUnmount.ts   # animação de entrada/saída do modal
├── services/productsService/   # camada de acesso à API
├── styles/
│   ├── globals.scss            # reset, tokens (cores/fontes) e utilitários
│   └── fonts.scss              # @font-face self-hosted (Poppins, Work Sans, Outfit)
├── types/product.ts            # tipos do domínio
├── utils/formatPrice.ts        # formatação de moeda (BRL)
├── App.tsx / App.module.scss   # composição das seções
└── main.tsx                    # entry (fonts → globals → render)
```

### Convenções por componente (pasta)

- `index.tsx`: componente nomeado com `export function` (sem default export);
- `productCarousel.module.scss`: estilos com CSS Modules (classe hasheada);
- `use*.ts`: hooks de dados/comportamento quando a lógica cresce;
- Sempre em **PascalCase**, um componente por pasta.

### Regras de lint (`eslint.config.js`)

- `import/order` com grupos `[[builtin, external], internal(@/**), parent/sibling/index]`, ordenação alfabética e linha em branco entre grupos;
- `no-console` (`warn`/`error`), `@typescript-eslint/no-explicit-any: error`;
- Prettier como regra do ESLint: aspas simples, ponto e vírgula, trailing comma sempre, printWidth 100.

### Convenções de dados

- Preços chegam em centavos da API e são convertidos/formatados em `utils/formatPrice.ts` (`Intl.NumberFormat`, BRL);
- O preço antigo e o parcelamento são derivados no front (`round(price × 1.1)`, `2x` sem juros), pois a API não os fornece;
- Estado de seleção (categoria ativa, tab, modal) é React state + atributos ARIA (`aria-current`, `aria-pressed`), nunca style inline.

## Design

Layout do Figma (1440px, altura total de 4660px), tokens em `src/styles/globals.scss`:

- **Cores**: azul `#3442B5` e azul-escuro `#3019B2` (marca), amarelo `#F7CA11` (destaques), roxo `#271C47` (footer), cinzas neutros (`--gray-100` a `--gray-900`);
- **Tipografia**: Poppins (principal), Work Sans (alternada) e Outfit (display), self-hosted em `public/fonts/` (woff2, subsets latin/latin-ext) com `font-display: swap`;
- **Grid**: container de 1280px; gaps das categorias seguem o Figma (42/48px);
- **Imagens**: hero e banner de parceiros em WebP (−67%/−65% vs JPG original);
- **Ícones de categoria**: traçados via potrace a partir do raster do Figma, integrados como componentes React com `vite-plugin-svgr` e `currentColor` (cor ativa = `--blue-dark`).

## Troubleshooting

### Os produtos não carregam (cards vazios)

- A API exige proxy por CORS (`Access-Control-Allow-Origin` ausente);
- **Dev**: o `server.proxy` do `vite.config.ts` cuida disso. Se falhar, confirme que está acessando via `yarn dev` e não um servidor estático qualquer;
- **Produção (S3 + CloudFront)**: a behavior `/api*` precisa existir na distribution, com origem `app.econverse.com.br` (HTTPS only) e a CloudFront Function de rewrite associada no viewer request. Sem isso, `/api/*` cai no S3 e devolve o `index.html` (HTML no lugar do JSON);
- Diagnóstico rápido: `curl -sI https://SEU-DOMINIO/api/teste-front-end/junior/tecnologia/lista-produtos/produtos.json`. O `content-type` precisa ser `application/json`, não `text/html`.

## Tecnologias

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/);
- [Vite 8](https://vite.dev/) com [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) e [vite-plugin-svgr](https://www.npmjs.com/package/vite-plugin-svgr);
- [Sass](https://sass-lang.com/) (CSS Modules + variáveis globais);
- [ESLint 9](https://eslint.org/) (typescript-eslint + import/order + react-hooks) + [Prettier](https://prettier.io/);
- Nenhuma biblioteca de UI, state manager ou HTTP client.
