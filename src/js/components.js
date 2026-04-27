/* ============================================================
   COMPONENTS - RENDERIZAÇÃO DE COMPONENTES REUTILIZÁVEIS
   ============================================================ */

/**
 * Componente para renderizar um card de produto
 */
const ProductCard = {
    render(product) {
        const discount = product.originalPrice - product.price;
        const discountPercentage = Math.round((discount / product.originalPrice) * 100);

        return `
            <a href="#" class="product-card" data-product-id="${product.id}">
                <div class="product-card__image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" width="280" height="280">
                    ${discountPercentage > 0 ? `<span class="product-card__badge">-${discountPercentage}%</span>` : ''}
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__name">${product.name}</h3>
                    <div class="product-card__price">
                        <span style="text-decoration: line-through; color: #999; font-size: 14px; font-weight: normal;">
                            ${DataService.formatCurrency(product.originalPrice)}
                        </span>
                        <br>
                        <span>${DataService.formatCurrency(product.price)}</span>
                    </div>
                    <p class="product-card__description">${product.description}</p>
                    <div class="product-card__footer">
                        <button class="btn btn--sm btn--primary product-card__btn add-to-cart-btn" 
                                data-product-id="${product.id}" 
                                aria-label="Adicionar ${product.name} ao carrinho">
                            + Carrinho
                        </button>
                        <button class="btn btn--sm btn--outline product-card__btn view-product-btn" 
                                data-product-id="${product.id}"
                                aria-label="Ver detalhes de ${product.name}">
                            Detalhes
                        </button>
                    </div>
                </div>
            </a>
        `;
    },

    renderMultiple(products) {
        return products.map(product => this.render(product)).join('');
    }
};

/**
 * Componente para renderizar um card de vídeo
 */
const VideoCard = {
    render(videoId, productId) {
        const product = DataService.getProductById(productId);
        return `
            <div class="video-card" data-video-id="${videoId}" data-product-id="${productId}">
                <img src="./assets/images/video-thumb-${productId}.png" alt="${product.name}" class="video-card__thumb" loading="lazy">
                <div class="video-card__play"></div>
            </div>
        `;
    },

    renderMultiple(videos) {
        return videos.map((v, i) => this.render(i + 1, v)).join('');
    }
};

/**
 * Componente para renderizar um card de depoimento
 */
const TestimonialCard = {
    renderStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? '⭐' : '☆';
        }
        return stars;
    },

    render(testimonial) {
        const date = new Date(testimonial.date).toLocaleDateString('pt-BR');
        return `
            <div class="testimonial-card">
                <div class="testimonial-stars">${this.renderStars(testimonial.rating)}</div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">— ${testimonial.author}</div>
                <div style="font-size: 12px; color: #999; margin-top: 8px;">${date}</div>
            </div>
        `;
    },

    renderMultiple(testimonials) {
        return testimonials.map(t => this.render(t)).join('');
    }
};

/**
 * Componente para renderizar um card de rede social
 */
const SocialCard = {
    render(social) {
        return `
            <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-card" 
               aria-label="Visitar ${social.name}">
                
                    
                <img src="assets/icons/${social.name}.png" alt="Instagram">
                <h3>${social.name}</h3>
                <p>${social.followers}</p>
            </a>
        `;
    },

    renderMultiple(socials) {
        return socials.map(s => this.render(s)).join('');
    }
};

/**
 * Componente para Modal de Produto
 */
const ProductModal = {
    render(product) {
        const discount = product.originalPrice - product.price;
        const discountPercentage = Math.round((discount / product.originalPrice) * 100);

        return `
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
                    <div>
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
                    </div>
                    <div>
                        <h2 style="margin-bottom: 16px;">${product.name}</h2>
                        <div style="margin-bottom: 16px;">
                            <span style="font-size: 24px; font-weight: bold; color: #ff0000;">
                                ${DataService.formatCurrency(product.price)}
                            </span>
                            <span style="text-decoration: line-through; color: #999; margin-left: 16px;">
                                ${DataService.formatCurrency(product.originalPrice)}
                            </span>
                            ${discountPercentage > 0 ? `<span style="background: #ff0000; color: white; padding: 4px 12px; border-radius: 4px; margin-left: 16px; font-weight: bold;">-${discountPercentage}%</span>` : ''}
                        </div>
                        <p style="margin-bottom: 24px; color: #666; line-height: 1.6;">
                            ${product.description}
                        </p>
                        <div style="background: #f0f0f0; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                            <h4 style="margin-bottom: 12px;">Benefícios:</h4>
                            <ul style="margin: 0; padding-left: 20px;">
                                <li>✓ Proteção UV 400</li>
                                <li>✓ Design Premium</li>
                                <li>✓ Conforto Máximo</li>
                                <li>✓ Garantia 1 Ano</li>
                            </ul>
                        </div>
                        <button class="btn btn--primary btn--lg btn--block add-to-cart-btn" data-product-id="${product.id}">
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};

/**
 * Componente para Toast/Notificação
 */
const Toast = {
    create(message, type = 'success', duration = 3000) {
        const toastContainer = document.getElementById('toast-container') || this.createContainer();
        
        const toast = document.createElement('div');
        toast.className = `alert alert--${type}`;
        toast.setAttribute('role', 'status');
        toast.innerHTML = `
            <div class="alert__icon">${this.getIcon(type)}</div>
            <div class="alert__content">
                <div class="alert__title">${this.getTitle(type)}</div>
                <p>${message}</p>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Remover após o tempo especificado
        setTimeout(() => {
            toast.remove();
        }, duration);

        return toast;
    },

    createContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1200;
            max-width: 400px;
        `;
        document.body.appendChild(container);
        return container;
    },

    getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || '•';
    },

    getTitle(type) {
        const titles = {
            success: 'Sucesso!',
            error: 'Erro!',
            warning: 'Aviso!',
            info: 'Informação'
        };
        return titles[type] || 'Notificação';
    }
};

/**
 * Componente para Loading
 */
const Loading = {
    show(container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div class="spinner"></div>
                <p style="margin-top: 16px; color: #666;">Carregando...</p>
            </div>
        `;
    },

    hide() {
        const spinner = document.querySelector('.spinner');
        if (spinner) {
            spinner.closest('div').remove();
        }
    }
};

/**
 * Renderizar Produtos em Destaque
 */
function renderFeaturedProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;

    const featured = DataService.getFeaturedProducts();
    container.innerHTML = ProductCard.renderMultiple(featured);

    // Adicionar event listeners
    attachProductCardListeners();
}

/**
 * Renderizar Catálogo
 */
function renderCatalog(categoryId = 'melhores') {
    const container = document.getElementById('catalog-grid');
    if (!container) return;

    Loading.show(container);

    // Simular carregamento
    setTimeout(() => {
        const products = DataService.getProductsByCategory(categoryId);
        container.innerHTML = ProductCard.renderMultiple(products);
        attachProductCardListeners();
    }, 300);
}

/**
 * Renderizar Vídeos
 */
function renderVideos() {
    const container = document.getElementById('videos-grid');
    if (!container) return;

    const videos = [1, 2, 3, 4];
    container.innerHTML = VideoCard.renderMultiple(videos);

    // Adicionar event listeners
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            Toast.create('Vídeo do produto abriu em modal', 'info');
        });
    });
}

/**
 * Renderizar Depoimentos
 */
function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;

    const testimonials = DataService.getTestimonials();
    container.innerHTML = TestimonialCard.renderMultiple(testimonials);
}

/**
 * Renderizar Redes Sociais
 */
function renderSocial() {
    const container = document.getElementById('social-grid');
    if (!container) return;

    const socials = DataService.getSocialLinks();
    container.innerHTML = SocialCard.renderMultiple(socials);
}

/**
 * Anexar listeners aos cards de produto
 */
function attachProductCardListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(btn.getAttribute('data-product-id'));
            const product = DataService.getProductById(productId);
            Cart.add(product);
            Toast.create(`${product.name} adicionado ao carrinho!`, 'success');
        });
    });

    // View details buttons
    document.querySelectorAll('.view-product-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(btn.getAttribute('data-product-id'));
            const product = DataService.getProductById(productId);
            showProductModal(product);
        });
    });
}

/**
 * Mostrar modal de produto
 */
function showProductModal(product) {
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = ProductModal.render(product);
    modal.removeAttribute('hidden');

    // Event listeners do modal
    const closeBtn = modal.querySelector('.modal__close');
    closeBtn.addEventListener('click', () => {
        modal.setAttribute('hidden', '');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.setAttribute('hidden', '');
        }
    });

    // Anexar listener ao botão de adicionar
    const addBtn = modalBody.querySelector('.add-to-cart-btn');
    if (addBtn) {
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Cart.add(product);
            Toast.create(`${product.name} adicionado ao carrinho!`, 'success');
            modal.setAttribute('hidden', '');
        });
    }
}

// Exportar componentes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProductCard,
        VideoCard,
        TestimonialCard,
        SocialCard,
        Toast,
        Loading,
        renderFeaturedProducts,
        renderCatalog,
        renderVideos,
        renderTestimonials,
        renderSocial
    };
}
