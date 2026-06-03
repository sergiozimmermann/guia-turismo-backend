# Guia Turismo Backend API Documentation

## Visão geral
Este documento descreve a API do backend atual do projeto Guia Turismo.
Ele foi gerado a partir do código em `src/` e inclui todos os endpoints disponíveis, os modelos de dados e as regras de autenticação necessárias para que o frontend implemente as telas.

## Base URL
- Local de desenvolvimento: `http://localhost:5000/api/v1`
- Prefixo de API configurado em `src/config/env.js` via `API_PREFIX`

## Endpoints públicos úteis
- `GET /health` — status do serviço
- `GET /docs` — documentação Swagger automática

## Autenticação
- O sistema usa JWT gerado pelos endpoints de login / registro de usuário.
- Cabeçalho HTTP obrigatório para rotas protegidas:
  - `Authorization: Bearer <token>`
- Valores de role possíveis no token:
  - `visitor`
  - `guide`
  - `admin`

## Modelos principais
### User
```json
{
  "id": "uuid",
  "email": "string",
  "name": "string",
  "role": "visitor|guide|admin",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### TourGuide
```json
{
  "id": "uuid",
  "cnpj": "string",
  "legalRepresentativeCpf": "string",
  "name": "string",
  "email": "string | null",
  "phone": "string | null",
  "licenseNumber": "string | null",
  "languages": "string | null",
  "address": "string | null",
  "active": true,
  "userId": "uuid | null"
}
```

### TourGroup
```json
{
  "id": "uuid",
  "contractorName": "string",
  "contractorDocument": "string",
  "passport": "string | null",
  "address": "string",
  "nationality": "string | null",
  "contactPerson": "string",
  "transportType": "string",
  "transportModel": "string",
  "transportColor": "string",
  "licensePlate": "string",
  "driverName": "string",
  "driverContact": "string",
  "language": "string",
  "destination": "string",
  "serviceDate": "datetime",
  "meetingPoint": "string",
  "departureTime": "string",
  "returnEstimate": "string",
  "accommodation": "string",
  "dayTrip": true,
  "arrivalDate": "datetime",
  "returnDate": "datetime",
  "passengerCount": 0,
  "profile": "string",
  "status": "pending|guide_linked",
  "guideId": "uuid | null"
}
```

### TourGuideAvailability item
```json
{
  "id": "uuid",
  "dayOfWeek": "monday|tuesday|wednesday|thursday|friday|saturday|sunday",
  "startTime": "HH:mm",
  "endTime": "HH:mm",
  "active": true
}
```

## Endpoints de usuários
### POST /users/register
Cria um usuário com role `visitor` por padrão.

#### Request
```json
{
  "email": "email@example.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

#### Response
```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "email@example.com",
    "name": "Nome do Usuário",
    "role": "visitor",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### POST /users/login
Autentica um usuário existente.

#### Request
```json
{
  "email": "email@example.com",
  "password": "senha123"
}
```

#### Response
```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "email@example.com",
    "name": "Nome do Usuário",
    "role": "visitor",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### GET /users/me
Retorna os dados do usuário autenticado.

#### Autorização
- `Authorization: Bearer <token>`

#### Response
```json
{
  "id": "uuid",
  "email": "email@example.com",
  "name": "Nome do Usuário",
  "role": "visitor",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### GET /users
Status do módulo de usuários.

#### Response
```json
{
  "module": "users",
  "message": "Users module is ready"
}
```

## Endpoints de administração
### GET /admin
Status do módulo de administração.

#### Response
```json
{
  "module": "admin",
  "message": "Admin module is ready"
}
```

### POST /admin/tour-guides
Cria um guia de turismo e gera token seguro para ativação de acesso.

#### Autorização
- `Authorization: Bearer <token>`
- Role: `admin`

#### Request
```json
{
  "cnpj": "12345678000199",
  "legalRepresentativeCpf": "12345678901",
  "name": "Empresa Guia",
  "email": "guia@example.com",
  "phone": "(XX) XXXXX-XXXX",
  "licenseNumber": "12345",
  "languages": "português, inglês",
  "address": "Rua Exemplo, 123",
  "active": true
}
```

#### Response
```json
{
  "tourGuide": {
    "id": "uuid",
    "cnpj": "12345678000199",
    "legalRepresentativeCpf": "12345678901",
    "name": "Empresa Guia",
    "email": "guia@example.com",
    "phone": "(XX) XXXXX-XXXX",
    "licenseNumber": "12345",
    "languages": "português, inglês",
    "address": "Rua Exemplo, 123",
    "active": true,
    "createdAt": "datetime",
    "updatedAt": "datetime"
  },
  "token": "tokenId.tokenSecret"
}
```

### POST /admin/tour-groups/:tourGroupId/assign-guide
Vincula um guia a um grupo de turistas.

#### Autorização
- `Authorization: Bearer <token>`
- Role: `admin`

#### Request
```json
{
  "guideId": "uuid"
}
```

#### Response
Retorna o grupo atualizado.

## Endpoints de tour guides
### POST /tour-guides/claim-access
Permite que um guia registre seu usuário de acesso a partir do token recebido do admin.

#### Request
```json
{
  "token": "tokenId.tokenSecret",
  "password": "senha123",
  "email": "guia@example.com"
}
```

- `email` é necessário se o cadastro do guia não tiver `email` definido no momento da criação.
- O token expira após `TOUR_GUIDE_TOKEN_EXPIRES_IN_HOURS` horas (padrão 24h).

#### Response
```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "guia@example.com",
    "name": "Nome Guia",
    "role": "guide",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### GET /tour-guides
Lista todos os guias cadastrados.

#### Autorização
- `Authorization: Bearer <token>`
- Role: `admin`

#### Response
```json
{
  "tourGuides": [
    {
      "id": "uuid",
      "cnpj": "...",
      "legalRepresentativeCpf": "...",
      "name": "...",
      "email": "...",
      "phone": "...",
      "licenseNumber": "...",
      "languages": "...",
      "address": "...",
      "active": true,
      "userId": "uuid | null",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ]
}
```

### GET /tour-guides/:guideId/schedule
Retorna a grade de disponibilidade de um guia.

#### Autorização
- `Authorization: Bearer <token>`
- Role: `admin` ou `guide`

#### Observação
- Usuários com role `guide` podem acessar apenas seu próprio `guideId`.

#### Response
```json
{
  "guideId": "uuid",
  "schedule": [
    {
      "id": "uuid",
      "dayOfWeek": "monday",
      "startTime": "08:00",
      "endTime": "12:00",
      "active": true,
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ]
}
```

### PUT /tour-guides/:guideId/schedule
Atualiza a grade de horários de um guia.

#### Autorização
- `Authorization: Bearer <token>`
- Role: `admin` ou `guide`

#### Request
```json
{
  "schedule": [
    {
      "dayOfWeek": "monday",
      "startTime": "08:00",
      "endTime": "12:00",
      "active": true
    }
  ]
}
```

#### Response
Mesma estrutura de `GET /tour-guides/:guideId/schedule`.

### GET /tour-guides/status
Status do módulo de guias.

#### Response
```json
{
  "module": "tour-guides",
  "message": "Tour guides module is ready"
}
```

## Endpoints de tour groups
### POST /tour-groups/register
Registra um novo grupo de turistas.

#### Request
```json
{
  "contractorName": "Nome Contratante",
  "contractorDocument": "12345678900",
  "address": "Rua ...",
  "contactPerson": "Nome Contato",
  "transportType": "ônibus",
  "transportModel": "Modelo",
  "transportColor": "Cor",
  "licensePlate": "ABC-1234",
  "driverName": "Motorista",
  "driverContact": "(XX) XXXXX-XXXX",
  "language": "Português",
  "destination": "Local",
  "serviceDate": "2026-06-10T00:00:00.000Z",
  "meetingPoint": "Ponto de encontro",
  "departureTime": "08:00",
  "returnEstimate": "17:00",
  "accommodation": "Hotel",
  "dayTrip": false,
  "arrivalDate": "2026-06-10T00:00:00.000Z",
  "returnDate": "2026-06-15T00:00:00.000Z",
  "passengerCount": 20,
  "profile": "Perfil do grupo"
}
```

#### Response
Retorna o objeto do `TourGroup` criado.

### GET /tour-groups
Lista todos os grupos de turistas.

#### Autorização
- `Authorization: Bearer <token>`
- Role: `admin`

#### Response
```json
{
  "tourGroups": [
    {
      "id": "uuid",
      "contractorName": "...",
      "contractorDocument": "...",
      "address": "...",
      "contactPerson": "...",
      "transportType": "...",
      "transportModel": "...",
      "transportColor": "...",
      "licensePlate": "...",
      "driverName": "...",
      "driverContact": "...",
      "language": "...",
      "destination": "...",
      "serviceDate": "datetime",
      "meetingPoint": "...",
      "departureTime": "...",
      "returnEstimate": "...",
      "accommodation": "...",
      "dayTrip": false,
      "arrivalDate": "datetime",
      "returnDate": "datetime",
      "passengerCount": 20,
      "profile": "...",
      "status": "pending",
      "guideId": null
    }
  ]
}
```

### GET /tour-groups/status
Status do módulo de grupos.

#### Response
```json
{
  "module": "tour-groups",
  "message": "Tour groups module is ready"
}
```

## Endpoints de rotation engine
### GET /rotation-engine/queue
Retorna a fila de guias registrada no mecanismo de rotação.

#### Response
```json
{
  "guides": [
    { "id": "guide-1", "name": "Guia 01" },
    { "id": "guide-2", "name": "Guia 02" }
  ]
}
```

### POST /rotation-engine/queue/guides
Adiciona um guia na fila de rotação.

#### Request
```json
{
  "id": "uuid",
  "name": "Nome do Guia"
}
```

#### Response
```json
{
  "message": "Guide added to rotation queue",
  "guide": {
    "id": "uuid",
    "name": "Nome do Guia"
  }
}
```

### POST /rotation-engine/match
Solicita um guia para um grupo, usando a política round-robin.

#### Request
```json
{
  "groupId": "uuid",
  "groupName": "Nome do Grupo",
  "requestedAt": "2026-06-03T12:00:00.000Z"
}
```

#### Response
```json
{
  "group": {
    "id": "uuid",
    "name": "Nome do Grupo",
    "requestedAt": "datetime"
  },
  "guide": {
    "id": "guide-1",
    "name": "Guia 01"
  },
  "matchedAt": "datetime",
  "policy": "round-robin"
}
```

## Observações para o frontend
- Os endpoints `admin` e `tour-groups` listagem exigem role `admin`.
- `tour-guides/claim-access` é a única rota que aceita token de ativação e não requer JWT.
- As respostas de login e registro devolvem o objeto `user` e o `token` JWT.
- O frontend deve usar `/users/me` para recuperar o perfil atual após o login.
- As rotas de status (`/status`) ajudam a verificar que os módulos estão ativos.
- A documentação Swagger está disponível em `/docs` quando o backend estiver em execução.

## Variáveis de ambiente importantes
- `NODE_ENV`
- `PORT`
- `API_PREFIX`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `TOUR_GUIDE_TOKEN_EXPIRES_IN_HOURS`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`

---

> Este documento cobre o backend atual conforme o código em `src/`. Caso o frontend precise de rotas adicionais, posso expandir com mais telas e fluxos específicos.
