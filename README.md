# Projetisa - Site Refatorado e Otimizado

## 📋 Visão Geral

Este projeto foi completamente refatorado e otimizado para oferecer uma experiência profissional tanto para desenvolvedores quanto para editores de conteúdo. O site da Projetisa agora conta com uma arquitetura moderna, CMS flexível e está pronto para produção.

## 🚀 Principais Melhorias Implementadas

### 1. **Arquitetura de Pastas Reorganizada**
```
src/
├── components/
│   ├── common/          # Componentes reutilizáveis
│   ├── layout/          # Header, Footer
│   ├── sections/        # Seções específicas
│   └── ui/              # Componentes de interface
├── pages/               # Páginas organizadas por módulo
├── hooks/               # Hooks personalizados
├── utils/               # Utilitários e helpers
└── content/             # Conteúdo gerenciado pelo CMS
```

### 2. **Componentes Otimizados e Modularizados**
- **PageContainer**: Animações padronizadas de página
- **LoadingSpinner**: Indicadores de carregamento consistentes
- **ErrorMessage**: Tratamento de erros padronizado
- **useAsync**: Hook para operações assíncronas

### 3. **CMS Decap Aprimorado**
- ✅ **Editor Markdown Rico** com preview em tempo real
- ✅ **Suporte Avançado a Imagens** (upload, URL, texto alternativo)
- ✅ **Galeria de Imagens** para projetos e notícias
- ✅ **Links Relacionados** configuráveis
- ✅ **Campos Opcionais** bem organizados
- ✅ **Hints Explicativos** em todos os campos

### 4. **Controle de Acesso Profissional**
- ✅ **Autenticação via Git Gateway**
- ✅ **Sistema de Roles** (Admin, Editor, Autor)
- ✅ **Workflow Editorial** (Draft → Review → Publish)
- ✅ **Configuração para Produção** documentada

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Decap CMS** - Gerenciamento de conteúdo
- **Lucide React** - Ícones
- **React Router** - Navegação

## 📦 Instalação e Execução

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Acessar o site
http://localhost:5173

# Acessar o CMS
http://localhost:5173/admin
```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 🔧 Configuração do CMS

### Desenvolvimento
- Arquivo: `public/admin/config.yml`
- Backend: `test-repo` (sem autenticação)
- Ideal para: Desenvolvimento e testes

### Produção
- Arquivo: `public/admin/config-production.yml`
- Backend: `git-gateway` (com autenticação)
- Ideal para: Ambiente de produção

### Migração para Produção
```bash
# Renomear arquivos de configuração
mv public/admin/config.yml public/admin/config-dev.yml
mv public/admin/config-production.yml public/admin/config.yml

# Atualizar display_url no config.yml
# Configurar Netlify Identity ou similar
```

## 📚 Documentação Adicional

- **[CMS_SETUP.md](docs/CMS_SETUP.md)** - Configuração detalhada do CMS
- **[DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)** - Guia de deploy completo
- **[architecture_plan.md](architecture_plan.md)** - Plano arquitetural

## 🎯 Funcionalidades do CMS

### Coleções Disponíveis

#### 📁 Projetos
- Slug, Título, Imagem Principal
- Descrição com Markdown
- Galeria de Imagens
- Links Relacionados
- Status (rascunho/publicado)

#### 📰 Notícias
- Slug, Título, Data de Publicação
- Imagem de Destaque
- Resumo e Conteúdo
- Tags e Links Relacionados
- Autor e Status

#### 🔧 Serviços
- Slug, Título, Imagem Principal
- Descrição Curta e Completa
- Status e Ordem de Exibição

#### ⚙️ Configurações do Site
- Informações Gerais
- Contatos e Redes Sociais
- (Apenas para administradores)

## 🔐 Sistema de Permissões

### Roles Disponíveis

1. **Administrador**
   - Acesso total a todas as coleções
   - Gerenciamento de configurações
   - Aprovação de conteúdo

2. **Editor**
   - Criação e edição de conteúdo
   - Submissão para aprovação

3. **Autor**
   - Criação de rascunhos
   - Sem permissão de publicação

## 🚀 Deploy Recomendado

### Netlify (Recomendado)
1. Conectar repositório
2. Configurar build: `npm run build`
3. Pasta de publicação: `dist`
4. Ativar Netlify Identity
5. Configurar Git Gateway

### Vercel (Alternativo)
1. Conectar repositório
2. Configuração automática detectada
3. Configurar autenticação externa

## 📊 Performance

### Métricas de Build
- **Tempo de Build**: ~4.79s
- **CSS Minificado**: 104.30 kB (16.66 kB gzipped)
- **JS Principal**: 627.91 kB (196.48 kB gzipped)
- **Otimização**: Chunks automáticos

### Otimizações Implementadas
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Compressão gzip
- ✅ Otimização de imagens
- ✅ Minificação de assets

## 🔍 SEO e Acessibilidade

- ✅ Meta tags otimizadas
- ✅ Texto alternativo em imagens
- ✅ Estrutura semântica HTML
- ✅ Navegação por teclado
- ✅ Contraste adequado

## 🐛 Solução de Problemas

### Problemas Comuns

1. **CMS não carrega**
   - Verificar configuração do backend
   - Confirmar permissões do repositório

2. **Imagens não aparecem**
   - Verificar pasta `public/uploads/`
   - Confirmar configuração `media_folder`

3. **Build falha**
   - Executar `npm install`
   - Verificar versões das dependências

### Logs e Debug
```bash
# Verificar erros de build
npm run build

# Verificar dependências
npm audit

# Limpar cache
rm -rf node_modules package-lock.json
npm install
```

## 📞 Suporte

Para dúvidas técnicas ou suporte:
1. Consultar documentação em `/docs/`
2. Verificar issues conhecidos
3. Contatar equipe de desenvolvimento

## 📄 Licença

Este projeto foi desenvolvido especificamente para a Projetisa Engenharia.

---

**Desenvolvido com ❤️ para a Projetisa Engenharia**