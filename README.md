# Backend - Guias de Turismo BC

Estrutura inicial do backend em Node.js para suportar:

- Atendimento de requisições de visitantes
- Atendimento de grupos de turistas
- Atendimento de guias de turismo
- Atendimento administrativo
- Motor de rodizio e vinculacao guia <-> grupo

## Requisitos

- Node.js 20+
- npm 10+
- Docker + Docker Compose

## Configuracao

1. Instale dependencias:

```bash
npm install
```

2. Configure ambiente:

```bash
cp .env.example .env
```

## Banco PostgreSQL (Docker)

Subir banco dev (PostgreSQL 16 Alpine):

```bash
npm run db:up
```

Parar banco:

```bash
npm run db:down
```

Ver logs:

```bash
npm run db:logs
```

## Prisma

Gerar client:

```bash
npm run prisma:generate
```

Criar/aplicar migration de desenvolvimento:

```bash
npm run prisma:migrate:dev
```

Abrir Prisma Studio:

```bash
npm run prisma:studio
```

## Rodar API

```bash
npm run dev
```

Servidor padrao: `http://localhost:5000`

## Endpoints iniciais

- `GET /health`
- `GET /api/v1/visitors`
- `GET /api/v1/tour-groups`
- `GET /api/v1/tour-guides`
- `GET /api/v1/admin`
- `GET /api/v1/rotation-engine/queue`
- `POST /api/v1/rotation-engine/queue/guides`
- `POST /api/v1/rotation-engine/match`

## Arquitetura

- `src/config`: configuracoes globais (env, prisma)
- `src/shared`: HTTP base e erros compartilhados
- `src/modules`: modulos de dominio (visitors, groups, guides, admin, rotation-engine)
