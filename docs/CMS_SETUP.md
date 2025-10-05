# Configuração do CMS Decap para Produção

Este documento explica como configurar o controle de acesso adequado para o CMS Decap em produção.

## Visão Geral

O projeto possui duas configurações do CMS:
- `config.yml` - Para desenvolvimento local (backend: test-repo)
- `config-production.yml` - Para produção com controle de acesso (backend: git-gateway)

## Configuração para Produção

### 1. Pré-requisitos

- Repositório Git hospedado no GitHub, GitLab ou Bitbucket
- Site hospedado em um serviço que suporte Netlify Identity ou similar
- Domínio configurado

### 2. Configuração do Git Gateway

#### Opção A: Netlify (Recomendado)

1. **Deploy no Netlify:**
   ```bash
   # Conecte seu repositório ao Netlify
   # O Netlify detectará automaticamente que é um projeto React/Vite
   ```

2. **Ativar Netlify Identity:**
   - Vá para Site Settings > Identity
   - Clique em "Enable Identity"
   - Configure as opções de registro (apenas por convite recomendado)

3. **Configurar Git Gateway:**
   - Em Identity > Services, ative "Git Gateway"
   - Isso permite que o CMS faça commits diretamente no repositório

4. **Atualizar configuração:**
   - Renomeie `config-production.yml` para `config.yml`
   - Atualize o `display_url` com seu domínio real

#### Opção B: GitHub/GitLab OAuth

1. **Criar OAuth App:**
   - GitHub: Settings > Developer settings > OAuth Apps
   - GitLab: User Settings > Applications

2. **Configurar URLs:**
   - Homepage URL: `https://seu-dominio.com.br`
   - Authorization callback URL: `https://seu-dominio.com.br/admin/`

3. **Atualizar configuração:**
   ```yaml
   backend:
     name: github # ou gitlab
     repo: seu-usuario/seu-repositorio
     branch: main
   ```

### 3. Configuração de Roles e Permissões

#### Roles Disponíveis:

1. **Administrador:**
   - Acesso total a todas as coleções
   - Pode gerenciar configurações do site
   - Pode aprovar/rejeitar conteúdo no workflow editorial

2. **Editor:**
   - Pode criar e editar projetos, notícias e serviços
   - Conteúdo passa por aprovação antes da publicação

3. **Autor:**
   - Pode criar conteúdo apenas em rascunho
   - Não pode publicar diretamente

#### Configuração no Netlify Identity:

```javascript
// Adicione roles personalizadas em Identity > Settings
{
  "roles": ["admin", "editor", "autor"]
}
```

### 4. Workflow Editorial

O sistema está configurado com `publish_mode: editorial_workflow`, que significa:

- Conteúdo criado fica em "Draft" (rascunho)
- Editores podem mover para "In Review" (em revisão)
- Administradores podem "Publish" (publicar) ou "Reject" (rejeitar)

### 5. Segurança

#### Medidas Implementadas:

1. **Autenticação obrigatória** para acessar o CMS
2. **Controle de roles** para diferentes níveis de acesso
3. **Workflow de aprovação** para conteúdo sensível
4. **Backup automático** via commits Git
5. **Histórico de versões** através do Git

#### Configurações Recomendadas:

```yaml
# Em config-production.yml
backend:
  name: git-gateway
  branch: main
  
# Configurações de segurança
publish_mode: editorial_workflow
slug:
  encoding: "ascii"
  clean_accents: true
```

### 6. Manutenção

#### Backup:
- Todo conteúdo é automaticamente versionado no Git
- Imagens são armazenadas em `public/uploads/`
- Configure backup regular das imagens

#### Monitoramento:
- Monitore logs de acesso ao CMS
- Configure alertas para mudanças importantes
- Revise periodicamente as permissões de usuário

### 7. Solução de Problemas

#### Problemas Comuns:

1. **Erro de autenticação:**
   - Verifique se o Git Gateway está ativado
   - Confirme as configurações OAuth

2. **Imagens não carregam:**
   - Verifique as permissões da pasta `public/uploads/`
   - Confirme o `public_folder` na configuração

3. **Preview não funciona:**
   - Verifique se o `display_url` está correto
   - Confirme se o site está acessível

### 8. Migração de Desenvolvimento para Produção

1. **Backup do conteúdo atual:**
   ```bash
   cp -r src/content/ backup-content/
   ```

2. **Atualizar configuração:**
   ```bash
   cp public/admin/config-production.yml public/admin/config.yml
   ```

3. **Testar em ambiente de staging primeiro**

4. **Deploy para produção**

5. **Configurar usuários e permissões**

## Contato

Para suporte técnico ou dúvidas sobre a configuração, entre em contato com a equipe de desenvolvimento.

