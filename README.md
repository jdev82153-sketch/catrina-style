# Catrina Style — Site estático

Versão estática para hospedar no **GitHub Pages**.

## Como publicar

### Opção A — Repositório `usuario.github.io`
1. Crie um repositório com nome `seu-usuario.github.io`
2. Suba os arquivos desta pasta (`index.html` e `assets/`) na branch `main`
3. Pronto — em ~1 min o site sai em `https://seu-usuario.github.io`

### Opção B — Qualquer repositório com branch `gh-pages`
1. Crie um repo (ex: `catrina-style`)
2. Suba estes arquivos na branch `main`
3. Vá em **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` → `/ (root)` → Save
4. Site fica em `https://seu-usuario.github.io/catrina-style/`

## Estrutura
- `index.html` — página única com Tailwind CDN, fontes Google e JS inline
- `assets/` — imagens (logo, novidades, seleção, clientes)

## Editar
Tudo está em `index.html`. Para trocar uma imagem, substitua o arquivo dentro de `assets/` mantendo o mesmo nome.
