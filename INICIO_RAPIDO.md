# 🚀 INÍCIO RÁPIDO - GLASSES v2.0

## ⚡ 5 Minutos para Começar

### 1. Abrir o Projeto
```
C:\Users\joaov\OneDrive\Documentos\GLASSES-ecommerce-v2\
```

Abra `index.html` no seu navegador favorito.

### 2. Testar Funcionalidades

#### Carrinho
- Clique em **"+ Carrinho"** em qualquer produto
- Veja aparecer uma notificação de sucesso
- O número no ícone do carrinho aumentará

#### Busca
- Clique no **ícone de lupa** (topo direito)
- Digite o nome de um produto
- Pressione **Enter**

#### Menu Mobile
- Redimensione a janela para menos de 768px
- Clique no **ícone de menu**
- Veja o menu aparecer

#### Modais
- Clique em **"Detalhes"** em qualquer produto
- Um modal aparecerá com informações

#### Filtros
- Scroll até a seção **"Nosso Catálogo"**
- Clique em **"Novos"**, **"Coleção Nova"**, **"Melhores"**
- Os produtos mudarão

---

## 📋 Checklist Inicial

- [ ] Abrir `index.html` no navegador
- [ ] Testar botões (Carrinho, Busca, Menu)
- [ ] Testar filtros do catálogo
- [ ] Testar modal de produto
- [ ] Testar newsletter
- [ ] Verificar responsividade (F12 > Responsive)

---

## 🎨 Personalizações Fáceis

### Mudar Cor Primária

Abra `src/css/base.css` e procure por:

```css
:root {
    --color-primary: #0e0e0e;  /* ← Mude para sua cor */
    --color-accent: #ff0000;    /* ← Cor de destaque */
}
```

### Adicionar Novo Produto

Abra `src/js/data.js` e adicione ao array `products`:

```javascript
{
    id: 7,
    name: "Novo Óculos",
    price: 99.99,
    originalPrice: 149.99,
    category: "novos",
    image: "./assets/images/seu-oculos.png",
    rating: 5,
    reviews: 10,
    description: "Descrição do produto",
    featured: true
}
```

### Adicionar Novo Link no Menu

Abra `index.html` e procure por `#lista-cabeçalho`:

```html
<ul class="header__links" id="nav-menu" role="navigation">
    <li><a href="#inicio" class="header__link">Início</a></li>
    <li><a href="#novo" class="header__link">Novo Link</a></li>  <!-- Adicione aqui -->
</ul>
```

### Mudar Texto do Banner

Abra `index.html` e procure por `.banner-marquee`:

```html
<div class="banner-marquee" aria-label="Promoções destacadas">
    <div class="marquee-track">
        <span class="marquee-item">📦 Seu texto aqui</span>
        <!-- Edite os spans -->
    </div>
</div>
```

---

## 🔧 Estrutura para Devs

### Adicionar Componente

1. **Criar função em `components.js`**
```javascript
const MeuComponente = {
    render(data) {
        return `<div class="meu-componente">...</div>`;
    }
};
```

2. **Estilizar em `components.css`**
```css
.meu-componente {
    /* estilos */
}
```

3. **Usar em `main.js`**
```javascript
function renderMeuComponente() {
    const html = MeuComponente.render(data);
    container.innerHTML = html;
}
```

### Adicionar Funcionalidade

1. **Criar em arquivo apropriado** (ou novo)
2. **Adicionar listeners em `main.js`**
3. **Testar no navegador**

---

## 🧪 Testes Rápidos

### Teste 1: Carrinho
```
1. Abrir página
2. Clicar "+ Carrinho"
3. ✅ Toast aparece
4. ✅ Número no ícone aumenta
```

### Teste 2: Busca
```
1. Clicar lupa
2. Digitar "óculos"
3. Pressionar Enter
4. ✅ Produtos aparecem
```

### Teste 3: Responsividade
```
1. F12 (Abrir DevTools)
2. Clicar ícone de dispositivo
3. Testar em iPhone, iPad, Galaxy
4. ✅ Tudo se adapta
```

### Teste 4: Navegação
```
1. Pressionar Tab várias vezes
2. ✅ Todos elementos focáveis
3. Pressionar Enter em links
4. ✅ Navegação funciona
```

---

## 📂 Arquivos Importantes

### Não Modificar (Mantém a estrutura)
- ✅ Você pode modificar! Apenas cuidado com sintaxe

### Modificar com Segurança
- `src/js/data.js` - Adicione seus produtos
- `src/css/base.css` - Mude cores em `:root`
- `src/css/layout.css` - Customize layouts

### Usar como Referência
- `README.md` - Guia completo
- `GUIA_DESENVOLVIMENTO.md` - Padrões de código
- `ESTRUTURA_PROJETO.txt` - Mapa visual

---

## 🎯 Próximas Ações

### Hoje (Primeiro Uso)
1. ✅ Abrir `index.html`
2. ✅ Explorar funcionalidades
3. ✅ Ler `README.md`

### Esta Semana
1. Copiar suas imagens para `assets/`
2. Atualizar dados de produtos
3. Testar em vários navegadores
4. Personalizações básicas

### Este Mês
1. Conectar com backend (opcional)
2. Implementar pagamento (opcional)
3. Deploy (Vercel, Netlify)

---

## ⚠️ Troubleshooting

### Página não abre
**Solução**: Abra `index.html` com duplo clique ou arraste para navegador

### Estilos não aparecem
**Solução**: Verifique se os arquivos CSS estão em `src/css/`

### JavaScript não funciona
**Solução**: Abra DevTools (F12 > Console) e procure por erros

### Imagens não aparecem
**Solução**: Copie suas imagens para `assets/images/`

---

## 💡 Dicas Úteis

### DevTools (F12)
- **Elements**: Ver e editar HTML
- **Console**: Testar JavaScript
- **Network**: Ver carregamento
- **Performance**: Analisar velocidade

### Atalhos Teclado
- `Ctrl+F` ou `Cmd+F` - Abrir busca
- `Tab` - Navegar entre elementos
- `Enter` - Clicar em elemento focado
- `Esc` - Fechar modal

### Teste de Responsividade
```
F12 > Ctrl+Shift+M (ou ícone de dispositivo)
Testar em:
- iPhone SE (375x667)
- iPad (768x1024)
- Desktop (1920x1080)
```

---

## 📚 Documentação

| Arquivo | Propósito |
|---------|-----------|
| `README.md` | Visão geral do projeto |
| `ENTREGA_FINAL.md` | Resumo do que foi entregue |
| `GUIA_DESENVOLVIMENTO.md` | Padrões de código |
| `CHANGELOG.md` | Histórico de mudanças |
| `RESUMO_MUDANCAS.md` | Antes vs. Depois |
| `ESTRUTURA_PROJETO.txt` | Mapa visual do projeto |

---

## 🎊 Pronto!

Você tem um ecommerce profissional, moderno e funcional!

### O que pode fazer agora:
- ✅ Adicionar/remover/editar produtos
- ✅ Personalizar cores e textos
- ✅ Adicionar novas funcionalidades
- ✅ Conectar com backend
- ✅ Deploy para internet

### Recursos:
- 📖 Leia a documentação
- 🧪 Teste tudo
- 🔍 Explore o código
- 🚀 Customize conforme precisa

---

**Aproveite seu novo GLASSES v2.0! 🚀**

Para dúvidas, consulte a documentação correspondente.
