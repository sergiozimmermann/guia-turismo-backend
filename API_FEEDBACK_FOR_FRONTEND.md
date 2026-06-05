**Resumo**
- **Status:** Implementado conjunto inicial de funcionalidades administrativas e de guia conforme pedido pelo time de frontend.
- **Atualizado:** rotas, serviços e documentação Swagger para `commissions`, `discipline`, `tour-guides` (adesão e schedule), `tour-groups`, `users` e `admin`.

**Implementado (endpoints principais)**
- **Autenticação:** `POST /users/register`, `POST /users/login`, `GET /users/me` (JWT)
- **Tour Guides:**
  - `POST /tour-guides/claim-access` — ativação de acesso via token (guide)
  - `GET /tour-guides` — listar (admin)
  - `GET /tour-guides/:guideId/schedule` — obter schedule (admin, guide)
  - `PUT /tour-guides/:guideId/schedule` — atualizar schedule (admin, guide)
  - `PUT /tour-guides/:guideId` — atualizar dados do guia (admin)
  - `DELETE /tour-guides/:guideId` — remover guia (admin)
  - `POST /tour-guides/:guideId/adhesion` — registrar adesão (admin)
  - `GET /tour-guides/:guideId/adhesion` — consultar adesões (admin, guide)
  - `PUT /tour-guides/adhesion/:adhesionId/payment` — registrar pagamento (admin)
- **Tour Groups:** `POST /tour-groups` (register), `GET /tour-groups` (admin)
- **Admin:** `POST /admin/tour-guides` — criação de tour guide (admin)
- **Commissions:**
  - `POST /commissions/setup` (admin)
  - `GET /commissions` (admin)
  - `PUT /commissions/:commissionId` (admin)
  - `GET /commissions/guide/:guideId` (admin)
- **Discipline:**
  - `POST /discipline/warnings` (admin)
  - `GET /discipline/warnings` (admin)
  - `DELETE /discipline/warnings/:warningId` (admin)
  - `POST /discipline/penalties` (admin)
  - `GET /discipline/penalties` (admin)
  - `PUT /discipline/penalties/:penaltyId` (admin)
  - `DELETE /discipline/penalties/:penaltyId` (admin)

**Observações técnicas e instruções de deploy/teste**
- Banco/Prisma: A `schema.prisma` foi atualizada com novos models (`TourGuideAdhesion`, `Commission`, `Contact`, `EmergencyContact`, `Feedback`, `Warning`, `Penalty`). É necessário rodar as migrations e gerar o client antes de executar a API:

```bash
npx prisma generate
npx prisma migrate dev --name add-admin-modules
npm run seed # se houver script de seed (opcional)
```

- Autenticação: todas rotas protegidas requerem header `Authorization: Bearer <token>` (JWT). Roles suportadas: `visitor` (user), `guide`, `admin`.
- Token de ativação de guia: o fluxo `POST /tour-guides/claim-access` valida `token` e `tokenCreatedAt` (expiração definida via `tourGuideTokenExpiresInHours` em `src/config/env.js`).
- Exclusão de guia atualmente executa `prisma.tourGuide.delete` (hard delete). Sugestão: avaliar soft-delete para preservar histórico.

**Payloads de exemplo**
- Criar comissão (admin):

```json
{
  "guideId": "<guide-id>",
  "guideName": "Nome do Guia",
  "percentage": 7.5,
  "effectiveDate": "2026-06-04T00:00:00.000Z"
}
```

- Reivindicar acesso de guia:

```json
{
  "token": "<token-enviado-pelo-admin>",
  "password": "novaSenha123",
  "email": "guia@example.com"
}
```

**Itens pendentes / recomendado para próxima sprint**
- Implementar endpoints para `Contact`, `EmergencyContact` e `Feedback` (criar/listar/atualizar/remover).  
- Revisar comportamento de exclusão de `TourGuide` e dependências (soft-delete vs cascade).  
- Adicionar testes automatizados (unit/integration) para fluxos críticos (claim-access, adesão, schedule).  
- Rodar migração em ambiente de staging e validar com frontend (URLs, CORS, API base path).

**Arquivos relevantes**
- `src/shared/http/api-router.js` — novos routers registrados (`/commissions`, `/discipline`).
- `src/shared/docs/swagger.js` — Swagger atualizado para incluir novos endpoints.
- `prisma/schema.prisma` — modelos adicionados.

Se quiser, gero também um Postman collection ou exemplos `curl` para todos os endpoints implementados — quer que eu gere isso agora?  

---
Arquivo gerado automaticamente pelo agente; entregue ao time de frontend como resumo técnico.
