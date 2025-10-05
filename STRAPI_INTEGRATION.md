# Integração com Strapi - Documentação

## 📋 Visão Geral

Este documento descreve a integração do frontend React com o CMS Strapi para o projeto Projetisa.

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` ou `.env.local` na raiz do projeto frontend (`frontend/`) com o seguinte conteúdo. Note que para o Vite, as variáveis precisam começar com o prefixo `VITE_`.

```env
# Configuração da API do Strapi
VITE_STRAPI_API_URL=http://localhost:1337

# Configuração de desenvolvimento
VITE_ENV=development

# Configuração de debug (opcional)
VITE_DEBUG_API=true
```

### Inicialização do Strapi

1. Inicie o servidor Strapi: `npm run develop`
2. Acesse o painel admin: `http://localhost:1337/admin`
3. Crie o usuário administrador
4. Configure os Content Types conforme especificado

## 📊 Content Types Esperados

### 1. Projects (projects)
```json
{
  "title": "string",
  "slug": "string",
  "summary": "text",
  "content": "richtext",
  "coverImage": "media",
  "gallery": "media (multiple)",
  "relatedLinks": "component (repeatable)"
}
```

### 2. Services (services)
```json
{
  "title": "string",
  "slug": "string",
  "shortDescription": "text",
  "description": "richtext",
  "coverImage": "media"
}
```

### 3. News (news)
```json
{
  "title": "string",
  "slug": "string",
  "summary": "text",
  "content": "richtext",
  "featuredImage": "media",
  "category": "string",
  "tags": "json",
  "relatedLinks": "component (repeatable)"
}
```

### 4. Team Members (team-members)
```json
{
  "name": "string",
  "position": "string",
  "bio": "text",
  "photo": "media"
}
```

### 5. Locations (locations)
```json
{
  "name": "string",
  "description": "text",
  "address": "string",
  "phone": "string",
  "email": "string",
  "image": "media",
  "services": "json"
}
```

### 6. FAQ Items (faq-items)
```json
{
  "question": "string",
  "answer": "richtext",
  "category": "string"
}
```

### 7. Feedback Videos (feedback-videos)
```json
{
  "title": "string",
  "videoUrl": "string",
  "thumbnail": "media",
  "clientName": "string"
}
```

### 8. About Page (about-page) - Single Type
```json
{
  "pageBuilder": "dynamiczone",
  "ctaTitle": "string",
  "ctaSubtitle": "text",
  "ctaButtonText": "string",
  "ctaButtonLink": "string",
  "showDefaultCTA": "boolean"
}
```

## 🧩 Dynamic Zone Components

### sections.hero
```json
{
  "title": "string",
  "subtitle": "text",
  "backgroundImage": "media",
  "textColor": "string",
  "backgroundColor": "string"
}
```

### sections.content
```json
{
  "title": "string",
  "content": "richtext",
  "image": "media",
  "layout": "enumeration (text-only, text-image, cards)",
  "backgroundColor": "enumeration (white, gray)",
  "cards": "component (repeatable)",
  "stats": "component (repeatable)"
}
```

### sections.team-grid
```json
{
  "title": "string",
  "subtitle": "text",
  "teamMembers": "relation (team-members)"
}
```

### sections.location-grid
```json
{
  "title": "string",
  "subtitle": "text",
  "locations": "relation (locations)"
}
```

## 🔌 API Endpoints

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/projects` | GET | Lista todos os projetos |
| `/api/projects?filters[slug][$eq]={slug}` | GET | Busca projeto por slug |
| `/api/services` | GET | Lista todos os serviços |
| `/api/services?filters[slug][$eq]={slug}` | GET | Busca serviço por slug |
| `/api/news` | GET | Lista todas as notícias |
| `/api/news?filters[slug][$eq]={slug}` | GET | Busca notícia por slug |
| `/api/team-members` | GET | Lista membros da equipe |
| `/api/locations` | GET | Lista localizações |
| `/api/faq-items` | GET | Lista itens de FAQ |
| `/api/feedback-videos` | GET | Lista vídeos de feedback |
| `/api/about-page?populate=deep` | GET | Dados da página Sobre |

## 🛠️ Ferramentas de Desenvolvimento

### Teste da API
Execute no console do navegador:
```javascript
// Testar todos os endpoints
testApiIntegration()

// Testar endpoint específico
testEndpoint('projects')
```

### Monitor de Status
O componente `ApiStatus` aparece no canto inferior direito em modo de desenvolvimento, mostrando o status de todos os endpoints.

### Debug
Ative o debug da API definindo `VITE_DEBUG_API=true` no arquivo `.env`.

## 📁 Estrutura de Arquivos

```
src/
├── services/
│   └── api.js                 # Módulo central da API
├── hooks/
│   └── useApi.js             # Hooks para consumo da API
├── components/
│   ├── common/
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   ├── sections/             # Componentes Dynamic Zone
│   │   ├── DynamicHero.jsx
│   │   ├── ContentSection.jsx
│   │   ├── TeamGrid.jsx
│   │   ├── LocationGrid.jsx
│   │   └── DynamicZoneRenderer.jsx
│   └── dev/
│       └── ApiStatus.jsx     # Monitor de desenvolvimento
├── utils/
│   ├── testApi.js           # Utilitários de teste
│   └── mediaUtils.js        # Utilitários de mídia (sem TinaCMS)
└── pages/
    ├── Home/
    │   └── index.jsx        # Página Home (agora sem TinaCMS)
    ├── Projetos/
    │   ├── index.jsx        # Lista de projetos
    │   └── ProjetoDetail.jsx # Detalhes do projeto
    ├── Services/
    │   ├── index.jsx        # Lista de serviços
    │   └── ServiceDetail.jsx # Detalhes do serviço
    ├── Noticias/
    │   ├── index.jsx        # Lista de notícias
    │   └── NoticiaDetail.jsx # Detalhes da notícia
    └── About/
        └── index.jsx        # Página Sobre com Dynamic Zone
```

## 🚀 Comandos Úteis

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm start

# Construir para produção
npm run build

# Testar build de produção
npm run serve
```

## ⚠️ Notas Importantes

1. **Permissões**: Certifique-se de que as permissões da API estão configuradas para acesso público nos endpoints necessários.

2. **Populate**: Use `?populate=*` ou `?populate=deep` para carregar relações e mídias.

3. **Slugs**: Todos os content types devem ter um campo `slug` único para roteamento.

4. **Imagens**: As URLs das imagens são processadas pela função `getStrapiImageUrl()`.

5. **Rich Text**: O conteúdo rich text é processado pela função `extractTextFromRichText()` e renderizado com `ReactMarkdown`.

## 🐛 Solução de Problemas

### Erro de CORS
Adicione o domínio do frontend nas configurações de CORS do Strapi.

### Erro 404 na API
Verifique se o Strapi está rodando e se os Content Types foram criados.

### Imagens não carregam
Verifique as permissões de upload e se as imagens estão sendo populadas corretamente.

### Dynamic Zone não renderiza
Verifique se os componentes estão mapeados corretamente no `DynamicZoneRenderer.jsx`.
