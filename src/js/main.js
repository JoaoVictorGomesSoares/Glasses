/* ============================================================
   MAIN - INICIALIZAÇÃO E LÓGICA PRINCIPAL DA APLICAÇÃO
   ============================================================ */

/**
 * Aplicação Principal
 */
const App = {
    /**
     * Inicializar a aplicação
     */
    init() {
        console.log('🚀 Inicializando GLASSES ecommerce...');

        // Inicializar componentes
        this.setupHeader();
        this.setupNavigation();
        this.setupSearch();
        this.setupSections();
        this.setupForm();
        this.setupAccessibility();

        console.log('✅ Aplicação inicializada com sucesso!');
    },

    /**
     * Setup do Header
     */
    setupHeader() {
        // Menu mobile toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.setAttribute('aria-expanded', !isExpanded);
                menuToggle.classList.toggle('active');
            });

            // Fechar menu ao clicar em um link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-expanded', 'false');
                    menuToggle.classList.remove('active');
                });
            });
        }

        // Sticky header effects
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
        });
    },

    /**
     * Setup da Navegação
     */
    setupNavigation() {
        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#' && href !== '#inicio') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    },

    /**
     * Setup da Busca
     */
    setupSearch() {
        const searchBtn = document.getElementById('search-btn');
        const searchBar = document.getElementById('search-bar');
        const searchClose = document.getElementById('search-close');
        const searchInput = document.getElementById('search-input');

        if (searchBtn && searchBar) {
            searchBtn.addEventListener('click', () => {
                searchBar.removeAttribute('hidden');
                searchInput.focus();
            });

            searchClose.addEventListener('click', () => {
                searchBar.setAttribute('hidden', '');
            });

            // Buscar produtos
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(searchInput.value);
                }
            });
        }
    },

    /**
     * Realizar busca de produtos
     */
    performSearch(term) {
        if (!term.trim()) {
            Toast.create('Digite um termo de busca', 'warning');
            return;
        }

        const results = DataService.searchProducts(term);

        if (results.length === 0) {
            Toast.create('Nenhum produto encontrado', 'info');
            return;
        }

        Toast.create(`${results.length} produto(s) encontrado(s)!`, 'success');

        // Renderizar resultados
        const container = document.getElementById('products-grid');
        if (container) {
            container.innerHTML = ProductCard.renderMultiple(results);
            attachProductCardListeners();
        }

        // Scroll para seção
        document.getElementById('promocoes')?.scrollIntoView({ behavior: 'smooth' });
    },

    /**
     * Setup das Seções
     */
    setupSections() {
        // Renderizar seções
        renderFeaturedProducts();
        renderCatalog('melhores');
        renderVideos();
        renderTestimonials();
        renderSocial();

        // Setup dos filtros de catálogo
        this.setupCatalogFilters();
    },

    /**
     * Setup dos filtros do catálogo
     */
    setupCatalogFilters() {
        document.querySelectorAll('.catalog-filters__btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover seleção anterior
                document.querySelectorAll('.catalog-filters__btn').forEach(b => {
                    b.setAttribute('aria-selected', 'false');
                });

                // Adicionar seleção ao botão clicado
                btn.setAttribute('aria-selected', 'true');

                // Renderizar catálogo
                const filter = btn.getAttribute('data-filter');
                renderCatalog(filter);
            });
        });
    },

    /**
     * Setup do Formulário Newsletter
     */
    setupForm() {
        const form = document.getElementById('newsletter-form');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('newsletter-name').value;
                const email = document.getElementById('newsletter-email').value;

                // Validação simples
                if (!name.trim() || !email.trim()) {
                    Toast.create('Preencha todos os campos', 'error');
                    return;
                }

                // Simular envio
                const btn = form.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Enviando...';
                btn.disabled = true;

                setTimeout(() => {
                    // Salvar dados (em produção, enviar para servidor)
                    console.log('Newsletter signup:', { name, email });

                    Toast.create('Inscrição realizada com sucesso!', 'success');
                    form.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 1500);
            });
        }
    },

    /**
     * Setup de Acessibilidade
     */
    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Esc para fechar modals
            if (e.key === 'Escape') {
                const modal = document.getElementById('product-modal');
                if (modal && !modal.hasAttribute('hidden')) {
                    modal.setAttribute('hidden', '');
                }

                const searchBar = document.getElementById('search-bar');
                if (searchBar && !searchBar.hasAttribute('hidden')) {
                    searchBar.setAttribute('hidden', '');
                }
            }

            // Ctrl/Cmd + F para busca
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                document.getElementById('search-btn').click();
            }
        });

        // Verificar suporte a prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            document.documentElement.style.scrollBehavior = 'auto';
        }
    }
};

/**
 * Lazy Loading de Imagens
 */
const LazyLoad = {
    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
};

/**
 * Analytics e Tracking
 */
const Analytics = {
    /**
     * Rastrear evento personalizado
     */
    trackEvent(eventName, eventData = {}) {
        console.log(`📊 Evento: ${eventName}`, eventData);

        // Em produção, enviar para Google Analytics, Mixpanel, etc.
        if (window.gtag) {
            gtag('event', eventName, eventData);
        }
    },

    /**
     * Rastrear visualização de página
     */
    trackPageView(pageName) {
        this.trackEvent('page_view', {
            page_title: pageName,
            page_path: window.location.pathname
        });
    },

    /**
     * Rastrear adição ao carrinho
     */
    trackAddToCart(product) {
        this.trackEvent('add_to_cart', {
            product_id: product.id,
            product_name: product.name,
            product_price: product.price
        });
    }
};

/**
 * Performance Monitoring
 */
const Performance = {
    /**
     * Medir tempo de carregamento
     */
    measureLoadTime() {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Tempo de carregamento: ${pageLoadTime}ms`);
        });
    },

    /**
     * Medir Core Web Vitals
     */
    measureWebVitals() {
        if ('web-vital' in window) {
            // Implementar medição de Web Vitals
        }
    }
};

/**
 * Service Worker (PWA)
 */
const PWA = {
    /**
     * Registrar Service Worker
     */
    register() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado com sucesso');
                })
                .catch(error => {
                    console.log('❌ Erro ao registrar Service Worker:', error);
                });
        }
    }
};

/**
 * Inicializar quando DOM está pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar aplicação
    App.init();

    // Inicializar lazy loading
    LazyLoad.init();

    // Rastrear visualização de página
    Analytics.trackPageView('Home');

    // Medir performance
    Performance.measureLoadTime();

    // Registrar Service Worker
    PWA.register();
});

/**
 * Tratamento de erros global
 */
window.addEventListener('error', (event) => {
    console.error('❌ Erro:', event.error);
    // Em produção, enviar para Sentry ou similar
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promise rejeitada não tratada:', event.reason);
    // Em produção, enviar para Sentry ou similar
});

// Logs de debug (comentar em produção)
console.log('🎨 Versão: GLASSES 2.0');
console.log('📱 User Agent:', navigator.userAgent);
console.log('🌐 URL:', window.location.href);
