/* ============================================================
   CART - SISTEMA DE CARRINHO DE COMPRAS
   ============================================================ */

/**
 * Serviço de Carrinho de Compras
 */
const Cart = {
    // Armazenar no localStorage
    storageKey: 'glasses_cart',

    /**
     * Obter carrinho do localStorage
     */
    getCart() {
        const cart = localStorage.getItem(this.storageKey);
        return cart ? JSON.parse(cart) : [];
    },

    /**
     * Salvar carrinho no localStorage
     */
    saveCart(cart) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
        this.updateCartUI();
    },

    /**
     * Adicionar item ao carrinho
     */
    add(product, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart(cart);
        return cart;
    },

    /**
     * Remover item do carrinho
     */
    remove(productId) {
        const cart = this.getCart();
        const filtered = cart.filter(item => item.id !== productId);
        this.saveCart(filtered);
        return filtered;
    },

    /**
     * Atualizar quantidade do item
     */
    updateQuantity(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);

        if (item) {
            if (quantity <= 0) {
                return this.remove(productId);
            }
            item.quantity = quantity;
            this.saveCart(cart);
        }

        return cart;
    },

    /**
     * Limpar carrinho
     */
    clear() {
        localStorage.removeItem(this.storageKey);
        this.updateCartUI();
        return [];
    },

    /**
     * Obter total de itens
     */
    getItemCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },

    /**
     * Obter subtotal
     */
    getSubtotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    /**
     * Calcular desconto
     */
    getDiscount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => {
            const itemDiscount = (item.originalPrice - item.price) * item.quantity;
            return total + itemDiscount;
        }, 0);
    },

    /**
     * Calcular frete
     */
    getShipping() {
        const subtotal = this.getSubtotal();
        if (subtotal >= APP_CONFIG.freeShippingThreshold) {
            return 0;
        }
        return 15.00; // Taxa fixa de frete
    },

    /**
     * Calcular total
     */
    getTotal() {
        return this.getSubtotal() + this.getShipping();
    },

    /**
     * Verificar se pode parcelar
     */
    canInstall() {
        return this.getTotal() > 0 && this.getTotal() >= 50;
    },

    /**
     * Calcular parcelas
     */
    getInstallments() {
        const total = this.getTotal();
        const installments = [];

        for (let i = 1; i <= APP_CONFIG.parcelLimit; i++) {
            installments.push({
                quantity: i,
                value: total / i,
                hasInterest: false
            });
        }

        return installments;
    },

    /**
     * Atualizar UI do carrinho
     */
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const count = this.getItemCount();

        if (cartCount) {
            cartCount.textContent = count;
            cartCount.parentElement.style.display = count > 0 ? 'flex' : 'none';
        }
    },

    /**
     * Renderizar resumo do carrinho
     */
    renderSummary() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscount();
        const shipping = this.getShipping();
        const total = this.getTotal();

        return `
            <div class="card">
                <div class="card__body">
                    <h3 style="margin-bottom: 16px;">Resumo do Pedido</h3>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 12px;">
                        <span>Subtotal:</span>
                        <span>${DataService.formatCurrency(subtotal)}</span>
                    </div>
                    ${discount > 0 ? `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 12px; color: #27ae60;">
                            <span>Desconto:</span>
                            <span>-${DataService.formatCurrency(discount)}</span>
                        </div>
                    ` : ''}
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 12px;">
                        <span>Frete:</span>
                        <span>${shipping === 0 ? 'GRÁTIS' : DataService.formatCurrency(shipping)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
                        <span>Total:</span>
                        <span style="color: #ff0000;">${DataService.formatCurrency(total)}</span>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Renderizar itens do carrinho
     */
    renderItems() {
        const cart = this.getCart();

        if (cart.length === 0) {
            return '<p style="text-align: center; padding: 32px; color: #999;">Seu carrinho está vazio</p>';
        }

        return cart.map(item => `
            <div class="card" style="margin-bottom: 16px;">
                <div class="card__body" style="display: grid; grid-template-columns: 80px 1fr auto; gap: 16px; align-items: center;">
                    <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
                    <div>
                        <h4 style="margin-bottom: 8px;">${item.name}</h4>
                        <p style="color: #666; font-size: 14px;">${DataService.formatCurrency(item.price)} x ${item.quantity}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin-bottom: 8px; font-weight: bold;">${DataService.formatCurrency(item.price * item.quantity)}</p>
                        <div style="display: flex; gap: 4px; align-items: center;">
                            <button class="btn btn--sm" style="padding: 4px 8px;" onclick="Cart.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                            <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                            <button class="btn btn--sm" style="padding: 4px 8px;" onclick="Cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            <button class="btn btn--sm btn--outline" style="padding: 4px 8px; margin-left: 8px;" onclick="Cart.remove(${item.id})">Remover</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

/**
 * Gerenciador de Página de Carrinho
 */
const CartPage = {
    /**
     * Renderizar página completa do carrinho
     */
    render() {
        const cart = Cart.getCart();
        const container = document.querySelector('main');

        if (!container) return;

        const html = `
            <section style="padding: 48px 0;">
                <div class="container">
                    <h1 style="margin-bottom: 32px;">Meu Carrinho</h1>

                    <div style="display: grid; grid-template-columns: 1fr 350px; gap: 32px;">
                        <div id="cart-items">
                            ${Cart.renderItems()}
                        </div>
                        <div>
                            ${Cart.renderSummary()}
                            <button class="btn btn--primary btn--lg btn--block" style="margin-top: 16px;">
                                Prosseguir para Pagamento
                            </button>
                            <button class="btn btn--outline btn--lg btn--block" style="margin-top: 8px;">
                                Continuar Comprando
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;

        container.innerHTML = html;
    }
};

// Inicializar UI do carrinho quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    Cart.updateCartUI();

    // Botão do carrinho
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const cart = Cart.getCart();
            if (cart.length === 0) {
                Toast.create('Seu carrinho está vazio', 'warning');
            } else {
                // Redirecionar para página do carrinho ou abrir modal
                Toast.create('Carrinho aberto', 'info');
            }
        });
    }
});

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Cart, CartPage };
}
