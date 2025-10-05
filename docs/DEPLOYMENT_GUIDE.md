# Guia de Deploy para Produção

Este documento fornece instruções passo a passo para fazer o deploy do site Projetisa em produção com CMS Decap configurado.

## Pré-requisitos

- [ ] Repositório Git configurado (GitHub, GitLab ou Bitbucket)
- [ ] Conta no Netlify, Vercel ou similar
- [ ] Domínio registrado (opcional, mas recomendado)

## Opção 1: Deploy no Netlify (Recomendado)

### Passo 1: Preparar o Repositório

1. **Commit todas as mudanças:**
   ```bash
   git add .
   git commit -m "Projeto refatorado e otimizado para produção"
   git push origin main
   ```

### Passo 2: Deploy no Netlify

1. **Acesse [netlify.com](https://netlify.com) e faça login**

2. **Clique em "New site from Git"**

3. **Conecte seu repositório:**
   - Escolha GitHub/GitLab/Bitbucket
   - Selecione o repositório do projeto
   - Branch: `main`

4. **Configurações de build:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

5. **Clique em "Deploy site"**

### Passo 3: Configurar Netlify Identity

1. **Vá para Site Settings > Identity**

2. **Clique em "Enable Identity"**

3. **Configurar Registration:**
   - Registration preferences: "Invite only" (recomendado)
   - External providers: GitHub (opcional)

4. **Configurar Git Gateway:**
   - Vá para Identity > Services
   - Clique em "Enable Git Gateway"

### Passo 4: Configurar o CMS para Produção

1. **Atualizar configuração do CMS:**
   ```bash
   # Renomear arquivo de configuração
   mv public/admin/config.yml public/admin/config-dev.yml
   mv public/admin/config-production.yml public/admin/config.yml
   ```

2. **Atualizar display_url no config.yml:**
   ```yaml
   display_url: https://seu-site.netlify.app
   # ou seu domínio personalizado
   ```

3. **Commit e push:**
   ```bash
   git add .
   git commit -m "Configurar CMS para produção"
   git push origin main
   ```

### Passo 5: Configurar Usuários

1. **Acessar o painel Identity:**
   - Site Settings > Identity > Users
   - Clique em "Invite users"
   - Adicione emails dos editores/administradores

2. **Configurar roles (opcional):**
   ```json
   {
     "roles": ["admin", "editor", "autor"]
   }
   ```

### Passo 6: Testar o CMS

1. **Acesse `https://seu-site.netlify.app/admin/`**
2. **Faça login com usuário convidado**
3. **Teste criação/edição de conteúdo**
4. **Verifique workflow editorial**

## Opção 2: Deploy no Vercel

### Passo 1: Preparar o Projeto

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login no Vercel:**
   ```bash
   vercel login
   ```

### Passo 2: Deploy

1. **Deploy inicial:**
   ```bash
   vercel
   ```

2. **Configurar variáveis de ambiente (se necessário):**
   ```bash
   vercel env add
   ```

### Passo 3: Configurar CMS

Para Vercel, você precisará usar uma solução alternativa como:
- Netlify Identity (mesmo em site no Vercel)
- Auth0
- Firebase Auth

## Configuração de Domínio Personalizado

### No Netlify:

1. **Site Settings > Domain management**
2. **Add custom domain**
3. **Configure DNS:**
   ```
   Type: CNAME
   Name: www
   Value: seu-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

### Certificado SSL:

- Netlify configura automaticamente Let's Encrypt
- Aguarde alguns minutos para propagação

## Configurações de Segurança

### Headers de Segurança:

Crie `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://identity.netlify.com; style-src 'self' 'unsafe-inline'

/admin/*
  X-Frame-Options: SAMEORIGIN
```

### Redirects:

Crie `public/_redirects`:
```
# Redirect admin to CMS
/admin /admin/index.html 200

# SPA fallback
/* /index.html 200
```

## Monitoramento e Manutenção

### Analytics:

1. **Google Analytics:**
   - Adicione o código de tracking
   - Configure goals para conversões

2. **Netlify Analytics:**
   - Ative nas configurações do site
   - Monitore performance e tráfego

### Backup:

1. **Conteúdo:** Automaticamente versionado no Git
2. **Imagens:** Configure backup regular da pasta uploads
3. **Configurações:** Documente todas as configurações

### Atualizações:

1. **Dependências:**
   ```bash
   npm audit
   npm update
   ```

2. **CMS Decap:**
   ```bash
   npm update decap-cms-app
   ```

## Solução de Problemas

### Build Failures:

1. **Verificar logs de build no Netlify**
2. **Testar build localmente:**
   ```bash
   npm run build
   ```

### CMS não carrega:

1. **Verificar configuração do Git Gateway**
2. **Confirmar permissões do repositório**
3. **Verificar console do browser para erros**

### Imagens não aparecem:

1. **Verificar pasta public/uploads/**
2. **Confirmar configuração media_folder**
3. **Verificar permissões de upload**

## Checklist Final

- [ ] Site carrega corretamente
- [ ] CMS acessível em /admin/
- [ ] Autenticação funcionando
- [ ] Upload de imagens funcionando
- [ ] Preview de conteúdo funcionando
- [ ] Workflow editorial funcionando
- [ ] SSL configurado
- [ ] Domínio personalizado (se aplicável)
- [ ] Analytics configurado
- [ ] Backup configurado
- [ ] Usuários convidados e testados

## Suporte

Para problemas técnicos:
1. Verifique a documentação oficial do Netlify/Vercel
2. Consulte a documentação do Decap CMS
3. Entre em contato com a equipe de desenvolvimento

