# Auditoria de tradução pt-BR

Levantamento feito rodando a aplicação (release `stable` v1.4.2, stack Docker local) com o
idioma do perfil em **Português Brasil**, varrendo tela a tela e cruzando cada string
encontrada com o código do branch `preview`.

> **Todos os apontamentos abaixo foram confirmados no branch atual**, não apenas na release
> em execução. Onde há `arquivo:linha`, o trecho foi lido e conferido.

## Resumo

Os arquivos de locale **já estão estruturalmente completos**: as 27 chaves de arquivo e todas
as chaves internas de `en/` existem em `pt-BR/`. Nenhuma chave faltando, nenhuma sobrando.

Ou seja: o que ainda aparece em inglês **não se resolve traduzindo os JSONs**. O problema está
distribuído em quatro categorias, e só uma delas é editar locale.

| Cat. | Natureza                                  | Itens                     | Onde se corrige               |
| ---- | ----------------------------------------- | ------------------------- | ----------------------------- |
| A    | Dados semeados pelo backend               | 6 estados + conteúdo demo | JSON de seed / modelo Django  |
| B    | Strings hardcoded no frontend             | 21 pontos de código       | Componentes `.tsx`            |
| C    | Chave existe, valor pt-BR ficou em inglês | 22 chaves (17 a traduzir) | `pt-BR/*.json`                |
| D    | Chave inexistente / namespace errado      | 4 chaves, 8 pontos        | `.tsx` + `accessibility.json` |

---

## Categoria A — Estados e conteúdo vêm em inglês do backend

**É isto que aparece como "não iniciado / em trabalho / concluído".** As colunas do quadro de
itens são **Backlog / Todo / In Progress / Done / Cancelled**.

Esses nomes **não passam por i18n**. São linhas na tabela `states`, criadas em inglês no momento
em que o projeto nasce. Traduzir o locale não muda nada aqui.

### Origem

| Arquivo                                                              | O que semeia                             |
| -------------------------------------------------------------------- | ---------------------------------------- |
| `apps/api/plane/db/models/state.py` (`DEFAULT_STATES`, linhas 24-62) | Estados de **todo projeto novo**         |
| `apps/api/plane/seeds/data/states.json`                              | Estados do **projeto demo**              |
| `apps/api/plane/seeds/data/issues.json`                              | Itens demo ("Welcome to Plane 👋", …)    |
| `apps/api/plane/seeds/data/cycles.json`                              | "Cycle 1: Getting Started with Plane", … |
| `apps/api/plane/seeds/data/modules.json`                             | "Core Workflow (System)", …              |
| `apps/api/plane/seeds/data/{pages,views,labels,projects}.json`       | Demais conteúdos demo                    |

### Renomeação proposta

| Grupo       | Nome atual  | Proposto                              |
| ----------- | ----------- | ------------------------------------- |
| `backlog`   | Backlog     | Backlog _(manter — termo consagrado)_ |
| `unstarted` | Todo        | A fazer                               |
| `started`   | In Progress | Em andamento                          |
| `completed` | Done        | Concluído                             |
| `cancelled` | Cancelled   | Cancelado                             |
| `triage`    | Triage      | Triagem                               |

### Duas ressalvas importantes

1. **São dados do usuário, editáveis pela UI.** Qualquer pessoa pode renomear em
   _Configurações do projeto → Estados_. Mexer no seed muda apenas o ponto de partida.
2. **Só afeta projetos criados depois da mudança.** Projetos existentes mantêm os nomes atuais;
   precisariam de uma data migration à parte, que é decisão de produto — renomear dados que o
   usuário já pode ter customizado é destrutivo e não deve ser feito automaticamente.

Como `DEFAULT_STATES` é global (não sabe o idioma de quem cria o projeto), traduzir direto no
modelo deixaria a instância inteira em português, inclusive para usuários em inglês. **A decisão
de produto precede a implementação**: ou se aceita isso numa instância mono-idioma, ou o campo
`name` passa a guardar uma chave e a tradução acontece na renderização — mudança bem maior, que
quebra a edição livre do nome pelo usuário.

---

## Categoria B — Strings hardcoded no frontend

Textos escritos direto no JSX, sem passar por `t()`. Estes são correções limpas e sem efeito
colateral.

| #   | Arquivo:linha                                                                                                                                                                     | String atual                                            | Chave a usar                                  | pt-BR                                                        |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| 1   | `apps/web/core/components/issues/header.tsx:72`                                                                                                                                   | `label="Work Items"`                                    | `common.work_items` ✅ existe                 | Itens de trabalho                                            |
| 2   | `apps/web/app/(all)/[workspaceSlug]/(projects)/browse/[workItem]/work-item-header.tsx:47`                                                                                         | `label="Work Items"`                                    | `common.work_items` ✅                        | Itens de trabalho                                            |
| 3   | `.../projects/(detail)/[projectId]/cycles/(list)/header.tsx:50`                                                                                                                   | `label="Cycles"`                                        | `common.cycles` ✅                            | Ciclos                                                       |
| 4   | `.../projects/(detail)/[projectId]/cycles/(detail)/header.tsx:144`                                                                                                                | `label="Cycles"`                                        | `common.cycles` ✅                            | Ciclos                                                       |
| 5   | `.../projects/(detail)/[projectId]/modules/(list)/header.tsx:54`                                                                                                                  | `label="Modules"`                                       | `common.modules` ✅                           | Módulos                                                      |
| 6   | `.../projects/(detail)/[projectId]/modules/(detail)/header.tsx:141`                                                                                                               | `label="Modules"`                                       | `common.modules` ✅                           | Módulos                                                      |
| 7   | `apps/web/core/components/workspace/sidebar/sidebar-menu-items.tsx:173`                                                                                                           | `{... ? "Hide" : "More"}`                               | **criar** `common.hide` / `common.more`       | Ocultar / Mais                                               |
| 8   | `apps/web/core/components/workspace/sidebar/projects-list.tsx:265`                                                                                                                | `{... ? "Hide" : "More"}`                               | **criar** `common.hide` / `common.more`       | Ocultar / Mais                                               |
| 9   | `apps/web/core/components/issues/issue-update-status.tsx:30`                                                                                                                      | `"Saving..." : "Saved"`                                 | `common.saving` ✅ + **criar** `common.saved` | Salvando… / Salvo                                            |
| 10  | `apps/web/core/components/exporter/export-modal.tsx:139`<br>`apps/web/core/components/exporter/export-form.tsx:172`<br>`apps/web/core/components/analytics/select/project.tsx:62` | `"All projects"`                                        | **criar** `common.all_projects`               | Todos os projetos                                            |
| 11  | `apps/web/core/components/common/quick-actions-helper.tsx:82`                                                                                                                     | `"Only completed cycles can be archived"`               | **criar**                                     | Apenas ciclos concluídos podem ser arquivados                |
| 12  | `apps/web/core/components/common/quick-actions-helper.tsx:107`                                                                                                                    | `"Only completed or cancelled modules can be archived"` | **criar**                                     | Apenas módulos concluídos ou cancelados podem ser arquivados |
| 13  | `apps/web/core/components/inbox/inbox-filter/root.tsx:25`<br>`apps/web/core/components/project/dropdowns/filters/member-list.tsx:105`                                             | `<span>Filters</span>`                                  | `common.filters` ✅                           | Filtros                                                      |
| 14  | `apps/web/core/components/cycles/active-cycle/productivity.tsx:69`                                                                                                                | `` `Pending work items - ${n}` ``                       | **criar** (com placeholder)                   | Itens pendentes — {count}                                    |
| 15  | `apps/web/core/components/core/sidebar/progress-chart.tsx:60`                                                                                                                     | `label: "Completion"`                                   | **criar**                                     | Conclusão                                                    |
| 16  | `.../issue-detail/issue-activity/activity/actions/default.tsx:41,45`                                                                                                              | `created the work item.`                                | **criar**                                     | criou o item de trabalho.                                    |

> O item 13 é visível lado a lado: na tela de **Ciclos** o botão aparece como "Filtros"
> (traduzido) e na de **Módulos** como "Filters" (hardcoded). Mesmo botão, dois comportamentos.

### 17. Grupos de estado renderizados crus

`apps/web/core/components/project-states/group-item.tsx:79`

```tsx
<div className="px-1 text-14 font-medium text-secondary capitalize">{groupKey}</div>
```

O slug do grupo vai direto para a tela. Em _Configurações do projeto → Estados_ lê-se
`backlog`, `unstarted`, `started`, `completed`, `cancelled` — em minúsculas, só maquiados pelo
CSS `capitalize`. O mesmo vaza no painel de progresso do ciclo ativo.

As chaves **já existem e já estão traduzidas**:

| Chave                                | pt-BR        |
| ------------------------------------ | ------------ |
| `workspace_projects.state.backlog`   | Backlog      |
| `workspace_projects.state.unstarted` | Não iniciado |
| `workspace_projects.state.started`   | Iniciado     |
| `workspace_projects.state.completed` | Concluído    |
| `workspace_projects.state.cancelled` | Cancelado    |

Correção: trocar `{groupKey}` por `{t(\`workspace_projects.state.${groupKey}\`)}`e remover o`capitalize`.

### 18. Prioridades ignoram as chaves traduzidas

`packages/constants/src/issue/common.ts:68-90` define `ISSUE_PRIORITIES` com `title` fixo em
inglês ("Urgent", "High", "Medium", "Low", "None"), e
`apps/web/core/components/dropdowns/priority.tsx` renderiza esse `title` cru nas linhas
**135, 226, 310 e 372** (e como tooltip em 85 e 260).

Enquanto isso, as chaves traduzidas existem e ficam sem uso:

| Chave                   | pt-BR                                 |
| ----------------------- | ------------------------------------- |
| `issue.priority.urgent` | Urgente                               |
| `issue.priority.high`   | Alta                                  |
| `issue.priority.medium` | Média                                 |
| `issue.priority.low`    | Baixa                                 |
| `issue.priority.none`   | ⚠️ **não existe** — criar ("Nenhuma") |

Correção: trocar `title: string` por uma chave i18n na constante e resolver com `t()` no
componente. Note que `none` precisa ser criada em `en` e em todos os locales.

---

## Categoria C — Chave existe, mas o valor pt-BR ficou em inglês

Correção direta em `packages/i18n/src/locales/pt-BR/*.json`. São 22 chaves.

### `navigation.json` — itens da barra lateral

O caso mais visível: a sidebar destoa do resto do app, que **já traduz esses mesmos conceitos**.

| Chave               | Atual (pt-BR) | Proposto           | Já traduzido assim em |
| ------------------- | ------------- | ------------------ | --------------------- |
| `sidebar.home`      | Home          | Início             | —                     |
| `sidebar.inbox`     | Inbox         | Caixa de entrada   | `notification.json`   |
| `sidebar.workspace` | Workspace     | Espaço de trabalho | `common.json:660`     |
| `sidebar.analytics` | Analytics     | Análises           | `common.json:139`     |
| `sidebar.intake`    | Intake        | Admissão           | `common.json:218`     |
| `sidebar.plane_pro` | Plane Pro     | _manter_           | nome de produto       |

### `common.json`

| Chave                   | Atual              | Proposto                                                        |
| ----------------------- | ------------------ | --------------------------------------------------------------- |
| `common.work_structure` | Work structure     | Estrutura de trabalho                                           |
| `common.execution`      | Execution          | Execução                                                        |
| `common.administration` | Administration     | Administração                                                   |
| `common.developer`      | Developer          | Desenvolvedor                                                   |
| `common.your_profile`   | Your profile       | Seu perfil                                                      |
| `common.completed_on`   | Completed on       | Concluído em                                                    |
| `compare_burndowns`     | Compare burndowns. | Compare os burndowns.                                           |
| `forum`                 | Forum              | **Fórum** — falta o acento; `power-k.json:144` já grafa "Fórum" |

> `work_structure`, `execution` e `administration` aparecem lado a lado com itens traduzidos no
> menu de _Configurações do projeto_: "Administrador", "Geral", "Membros" em português e
> "Work structure", "Execution" em inglês, na mesma coluna.

### Demais arquivos

| Arquivo            | Chave                                                           | Atual             | Proposto                                       |
| ------------------ | --------------------------------------------------------------- | ----------------- | ---------------------------------------------- |
| `auth.json`        | `auth.common.email.label`                                       | Email             | E-mail                                         |
| `automation.json`  | `automations.trigger.schedule.minute_suffix`                    | min               | min _(manter)_                                 |
| `page.json`        | `page_navigation_pane.tabs.info.label`                          | Info              | Informação _(já usado em `common.json:14`)_    |
| `power-k.json`     | `power_k.group_titles.contextual`                               | Contextual        | Contextual _(manter — igual nos dois idiomas)_ |
| `integration.json` | `gitlab_enterprise_integration.client_secret_title`             | Client Secret     | Segredo do cliente                             |
| `integration.json` | `gitlab_enterprise_integration.webhook_secret_title`            | Webhook Secret    | Segredo do webhook                             |
| `integration.json` | `oauth_bridge_integration.provider_form.audience_placeholder`   | `api://my-app-id` | _manter (placeholder técnico)_                 |
| `integration.json` | `oauth_bridge_integration.provider_form.rate_limit_placeholder` | `120/minute`      | _manter (formato técnico)_                     |

### Duas chaves vazias

`auth.sign_up.header.step.email.sub_header` e `auth.sign_in.header.step.email.sub_header` estão
vazias em pt-BR — **mas também estão vazias em `en`**. Não é falha de tradução; nada a fazer.

---

## Categoria D — Chave crua vazando na tela

`aria_labels.app_sidebar.*` **não existe em nenhum locale**. O arquivo define
`aria_labels.projects_sidebar.*`. Como a chave não resolve, o texto literal vai para o atributo
`aria-label` — leitores de tela anunciam `aria_labels.app_sidebar.close_workspace_menu`.

| Arquivo:linha                            | Chave chamada                                                                                   | Situação                              |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------- |
| `sidebar-menu-items.tsx:114,115,128,129` | `aria_labels.app_sidebar.close_workspace_menu`<br>`aria_labels.app_sidebar.open_workspace_menu` | ❌ não existe em **nenhum** namespace |
| `sidebar-menu-items.tsx:168,169`         | `aria_labels.app_sidebar.{close,open}_extended_sidebar`                                         | ⚠️ existe, mas em `projects_sidebar`  |
| `projects-list.tsx:260,261`              | `aria_labels.app_sidebar.{close,open}_extended_sidebar`                                         | ⚠️ existe, mas em `projects_sidebar`  |

Correção em dois passos:

1. Trocar `app_sidebar` → `projects_sidebar` nos 8 pontos acima.
2. Criar `open_workspace_menu` / `close_workspace_menu` em
   `en/accessibility.json` sob `aria_labels.projects_sidebar` e propagar para os 18 locales
   (pt-BR: "Abrir menu do espaço de trabalho" / "Fechar menu do espaço de trabalho").

É bug de acessibilidade, não só de tradução — vale corrigir independentemente do idioma.

---

## Ordem de execução sugerida

1. **Categoria D** — bug de acessibilidade, correção mecânica, sem decisão de produto.
2. **Categoria C** — edição pura de JSON, risco zero. Use a skill `translate` do repo, que
   carrega as regras de terminologia, formas plurais CLDR e preservação de placeholders.
3. **Categoria B** — itens 1 a 6 e 13 são substituição direta por chave existente. Os demais
   exigem criar chaves novas em `en` **e propagar para os 18 locales** (não só pt-BR), senão
   outros idiomas passam a exibir a chave crua.
4. **Categoria A** — só depois de decidir o comportamento multi-idioma. Não faça junto com o
   resto: mexe em dados, não em apresentação.

## Como reproduzir a auditoria

```bash
# subir a stack de teste
cd deployments/cli/community
docker compose -f docker-compose.yml --env-file variables.env -p plane-test up -d

# aguardar as migrations (demoram vários minutos)
docker logs -f plane-test-migrator-1

# app em http://localhost/ — trocar idioma em
# Perfil → Preferências → Idioma → Português Brasil
```

Conferência estrutural dos locales (deve sair vazio):

```bash
cd packages/i18n/src/locales
for f in en/*.json; do
  b=$(basename "$f")
  python3 -c "
import json,sys
def keys(d,p=''):
    s=set()
    for k,v in (d or {}).items():
        nk=f'{p}.{k}' if p else k
        s.add(nk)
        if isinstance(v,dict): s|=keys(v,nk)
    return s
en=keys(json.load(open('en/$b'))); pt=keys(json.load(open('pt-BR/$b')))
if en-pt: print('$b faltando:', sorted(en-pt))
if pt-en: print('$b sobrando:', sorted(pt-en))
"
done
```
