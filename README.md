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

## Como rodar

```bash
npm install
npm run dev
```

Servidor padrao: `http://localhost:3333`

## Endpoints iniciais

- `GET /health`
- `GET /api/v1/visitors`
- `GET /api/v1/tour-groups`
- `GET /api/v1/tour-guides`
- `GET /api/v1/admin`
- `POST /api/v1/rotation-engine/match`

## Arquitetura

- `src/config`: configuracoes globais (env, app)
- `src/shared`: HTTP base e erros compartilhados
- `src/modules`: modulos de dominio (visitors, groups, guides, admin, rotation-engine)

O modulo `rotation-engine` ja nasce separado em camadas:

- `domain`: regras de negocio puras
- `application`: servicos de orquestracao
- `http`: controllers/routes
