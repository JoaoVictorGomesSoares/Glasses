# 📖 GUIA DE DESENVOLVIMENTO

## 🎯 Visão Geral

Este documento fornece orientações para desenvolver e manter o projeto GLASSES Ecommerce v2.0.

## 📚 Estrutura do Projeto

```
GLASSES-ecommerce-v2/
├── index.html              # Página principal
├── src/
│   ├── css/
│   │   ├── base.css       # Reset, variáveis, normalizações
│   │   ├── components.css # Componentes reutilizáveis
│   │   └── layout.css     # Layout das seções
│   └── js/
│       ├── data.js        # Dados e utilitários
│       ├── components.js  # Renderização de componentes
│       ├── cart.js        # Carrinho de compras
│       └── main.js        # Lógica principal
├── assets/
│   ├── images/
│   ├── icons/
│   └── videos/
└── docs/
    └── GUIA_DESENVOLVIMENTO.md  # Este arquivo
```

## 🎨 Convenções de Código

### HTML
- Usar tags semânticas (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Sempre adicionar `alt` em imagens
- Usar `aria-*` attributes quando apropriado
- Classes em kebab-case: `.button-primary`
- IDs em camelCase: `#searchButton`

```html
<!-- ✅ Correto -->
<section id="products" aria-label="Seção de produtos">
    <h2 class="section-title">Nossos Produtos</h2>
    <img src="product.jpg" alt="Descrição do produto">
</section>

<!-- ❌ Incorreto -->
<div id="ProductsSection">
    <h2 class="title">Nossos Produtos</h2>
    <img src="product.jpg">
</div>
```

### CSS

#### Variáveis
Use as variáveis CSS definidas em `base.css`:

```css
/* ✅ Use variáveis -->
.button {
    background-color: var(--color-primary);
    padding: var(--space-md);
    border-radius: var(--radius-md);
    transition: all var(--transition-base);
}

/* ❌ Evite valores hardcoded -->
.button {
    background-color: #0e0e0e;
    padding: 16px;
    border-radius: 8px;
}
```

#### BEM (Block Element Modifier)
Use a metodologia BEM para nomear classes:

```css
/* Block */
.product-card { }

/* Element */
.product-card__image { }
.product-card__title { }
.product-card__price { }

/* Modifier */
.product-card--featured { }
.product-card--on-sale { }
```

#### Estrutura do CSS
```css
/* 1. Reset/Base */
* { box-sizing: border-box; }

/* 2. Variáveis */
:root { --color-primary: #0e0e0e; }

/* 3. Tipografia */
h1, h2, h3 { }
p { }

/* 4. Componentes */
.button { }
.card { }

/* 5. Layout */
.container { }
.grid { }

/* 6. Responsividade (ao final) */
@media (max-width: 768px) { }
```

### JavaScript

#### Nomenclatura
- Funções e variáveis: camelCase
- Constantes: UPPER_SNAKE_CASE
- Classes/Objetos: PascalCase

```javascript
// ✅ Correto
const maxRetries = 3;
const API_BASE_URL = 'https://api.example.com';
const userData = { name: 'João', age: 30 };

function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}

class ProductCard {
    render() { }
}

// ❌ Incorreto
const max_retries = 3;
const MaxRetries = 3;
function calculate_total() { }
```

#### Documentação
Usar JSDoc para documentar funções:

```javascript
/**
 * Adiciona um produto ao carrinho
 * @param {Object} product - O produto a adicionar
 * @param {number} product.id - ID único do produto
 * @param {string} product.name - Nome do produto
 * @param {number} quantity - Quantidade (padrão: 1)
 * @returns {Array} Array atualizado do carrinho
 * @throws {Error} Se produto inválido
 */
function addToCart(product, quantity = 1) {
    if (!product || !product.id) {
        throw new Error('Produto inválido');
    }
    // ...
}
```

#### Estilos
```javascript
// ✅ Use async/await
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// ✅ Valide inputs
function processData(input) {
    if (!input || typeof input !== 'string') {
        throw new TypeError('Input inválido');
    }
    // ...
}

// ✅ Use template literals
const message = `Olá, ${name}! Você tem ${items.length} itens.`;

// ❌ Evite var (use const/let)
var x = 10;

// ❌ Evite callbacks aninhados (use Promises/async-await)
function getData(callback) {
    fetchData(function(data) {
        processData(data, function(result) {
            callback(result);
        });
    });
}
```

## 🔄 Fluxo de Desenvolvimento

### 1. Adicionar Novo Componente

```javascript
// 1. Definir em components.js
const MyComponent = {
    render(data) {
        return `<div class="my-component">...</div>`;
    }
};

// 2. Estilizar em components.css
.my-component {
    /* estilos */
}

// 3. Usar em main.js ou outro arquivo
function renderMyComponent() {
    const html = MyComponent.render(data);
    container.innerHTML = html;
}
```

### 2. Adicionar Novo Produto

```javascript
// 1. Adicionar em data.js
const products = [
    // ... produtos existentes
    {
        id: 7,
        name: "Novo Óculos",
        price: 99.99,
        originalPrice: 149.99,
        category: "novos",
        image: "./assets/images/novo-oculos.png",
        // ...
    }
];

// 2. Dados são carregados automaticamente em renderFeaturedProducts()
```

### 3. Adicionar Nova Funcionalidade

```javascript
// 1. Criar objeto/função em arquivo apropriado
const NewFeature = {
    init() {
        // Inicializar
    },
    handle() {
        // Lógica
    }
};

// 2. Adicionar listeners em main.js
App.setupNewFeature = function() {
    NewFeature.init();
};

// 3. Chamar em App.init()
App.init = function() {
    this.setupHeader();
    this.setupNewFeature(); // ← Nova linha
};
```

## 🧪 Testes

### Manual Testing Checklist

- [ ] Carrinho adiciona/remove itens corretamente
- [ ] Cálculos de total estão corretos
- [ ] Menu mobile abre/fecha
- [ ] Busca funciona
- [ ] Modal abre/fecha
- [ ] Toast notificações aparecem
- [ ] Newsletter validação funciona
- [ ] Links navegam corretamente
- [ ] Imagens carregam
- [ ] Responsividade em mobile/tablet/desktop

### Browsers Testados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile (iOS Safari, Chrome Android)

## 🎯 Performance

### Core Web Vitals Target

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Dicas de Performance

1. **Lazy load imagens**
   ```html
   <img src="image.jpg" loading="lazy" alt="">
   ```

2. **Minificar CSS/JS em produção**
   ```bash
   # Usar ferramentas como:
   # - Minify (CSS)
   # - UglifyJS (JavaScript)
   ```

3. **Usar CDN para assets**
   - Imagens otimizadas
   - Fontes do Google Fonts

4. **Cache headers**
   - Configurar no servidor
   - Usar Service Workers

## 🔒 Segurança

### Boas Práticas

1. **Validação de Input**
   ```javascript
   if (!input.trim() || input.length < 3) {
       throw new Error('Input inválido');
   }
   ```

2. **Sanitização**
   - Nunca usar `innerHTML` com dados do usuário
   - Usar `textContent` quando possível

3. **HTTPS**
   - Sempre usar em produção

4. **Headers de Segurança**
   ```
   Content-Security-Policy
   X-Frame-Options
   X-Content-Type-Options
   Strict-Transport-Security
   ```

## 📝 Commits

Use conventional commits:

```
feat: adicionar novo componente de filtro
fix: corrigir cálculo de desconto
docs: atualizar README
style: formatar código
refactor: reorganizar estrutura de pastas
test: adicionar testes de carrinho
chore: atualizar dependências
```

## 🚀 Deployment

### Checklist Pre-Deploy

- [ ] Testes manuais passando
- [ ] CSS minificado
- [ ] JS minificado
- [ ] Imagens otimizadas
- [ ] Meta tags atualizadas
- [ ] Manifest.json configurado
- [ ] Service Worker testado
- [ ] Headers de segurança configurados
- [ ] Analytics implementado
- [ ] Documentação atualizada

### Deploy no Vercel

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Abrir site
vercel --prod
```

## 🐛 Debug

### Console Logs (remover em produção)
```javascript
console.log('Mensagem de debug');
console.warn('Aviso');
console.error('Erro');
console.table(dados);
```

### DevTools
- Elements: Inspecionar HTML
- Console: Debug JavaScript
- Network: Verificar requisições
- Performance: Analisar performance
- Application: localStorage, Service Workers

### Breakpoints
```javascript
debugger; // O código pausará aqui
```

## 📚 Recursos Úteis

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web.dev](https://web.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Última atualização**: Fevereiro 2025
