/* ============================================================
   DATA - DADOS DOS PRODUTOS, CATEGORIAS, ETC
   ============================================================ */

// Dados dos Produtos
const products = [
    {
        id: 1,
        name: "Óculos GLASSES #001",
        price: 99.99,
        originalPrice: 149.99,
        category: "novos",
        image: "./assets/images/oculos-001.png",
        rating: 5,
        reviews: 28,
        description: "Óculos premium com proteção UV 400 e design moderno",
        featured: true
    },
    {
        id: 2,
        name: "Óculos GLASSES #002",
        price: 109.99,
        originalPrice: 159.99,
        category: "colecao",
        image: "./assets/images/oculos-002.png",
        rating: 4.5,
        reviews: 15,
        description: "Coleção nova com estilo vintage e conforto máximo",
        featured: true
    },
    {
        id: 3,
        name: "Óculos GLASSES #003",
        price: 119.99,
        originalPrice: 179.99,
        category: "melhores",
        image: "./assets/images/oculos-003.png",
        rating: 5,
        reviews: 42,
        description: "Nosso modelo mais vendido com acabamento premium",
        featured: true
    },
    {
        id: 4,
        name: "Óculos GLASSES #004",
        price: 89.99,
        originalPrice: 129.99,
        category: "novos",
        image: "./assets/images/oculos-004.png",
        rating: 4,
        reviews: 12,
        description: "Novo design unissex com peso reduzido",
        featured: false
    },
    {
        id: 5,
        name: "Óculos GLASSES #005",
        price: 139.99,
        originalPrice: 199.99,
        category: "colecao",
        image: "./assets/images/oculos-005.png",
        rating: 5,
        reviews: 35,
        description: "Edição limitada com acabamento dourado",
        featured: true
    },
    {
        id: 6,
        name: "Óculos GLASSES #006",
        price: 99.99,
        originalPrice: 149.99,
        category: "melhores",
        image: "./assets/images/oculos-006.png",
        rating: 4.5,
        reviews: 21,
        description: "Modelo clássico que nunca sai de moda",
        featured: false
    }
];

// Dados das Categorias
const categories = [
    {
        id: "novos",
        name: "Novos",
        description: "Últimos lançamentos"
    },
    {
        id: "colecao",
        name: "Coleção Nova",
        description: "Coleção exclusiva"
    },
    {
        id: "melhores",
        name: "Melhores Vendas",
        description: "Mais vendidos"
    }
];

// Dados de Redes Sociais
const socialLinks = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/",
        icon: "instagram",
        followers: "25K seguidores"
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/",
        icon: "tiktok",
        followers: "15K seguidores"
    },
    {
        name: "WhatsApp",
        url: "https://api.whatsapp.com/",
        icon: "whatsapp",
        followers: "Atendimento direto"
    }
];

// Dados de Depoimentos
const testimonials = [
    {
        id: 1,
        author: "Maria Silva",
        rating: 5,
        text: "Excelente qualidade! Os óculos superaram minhas expectativas. Recomendo!",
        date: "2025-02-15"
    },
    {
        id: 2,
        author: "João Santos",
        rating: 5,
        text: "Frete rápido e produto bem acondicionado. Muito satisfeito com a compra.",
        date: "2025-02-10"
    },
    {
        id: 3,
        author: "Ana Costa",
        rating: 4,
        text: "Muito bom! Só achei o preço um pouco elevado, mas a qualidade compensa.",
        date: "2025-02-08"
    },
    {
        id: 4,
        author: "Carlos Oliveira",
        rating: 5,
        text: "Os óculos GLASSES são espetaculares! Uso todos os dias. Perfeitos!",
        date: "2025-02-05"
    },
    {
        id: 5,
        author: "Lucas Ferreira",
        rating: 4,
        text: "Boa qualidade e estilo. Chegou rápido e bem embalado.",
        date: "2025-02-01"
    }
];

// Constantes da aplicação
const APP_CONFIG = {
    storeName: "GLASSES",
    currency: "BRL",
    currencySymbol: "R$",
    decimalPlaces: 2,
    freeShippingThreshold: 9999.99,
    discountPercentage: 20,
    parcelLimit: 3
};

// Funções auxiliares de dados
const DataService = {
    /**
     * Obtém todos os produtos
     */
    getAllProducts() {
        return products;
    },

    /**
     * Obtém produtos por categoria
     */
    getProductsByCategory(categoryId) {
        return products.filter(p => p.category === categoryId);
    },

    /**
     * Obtém produtos em destaque
     */
    getFeaturedProducts() {
        return products.filter(p => p.featured);
    },

    /**
     * Obtém um produto por ID
     */
    getProductById(id) {
        return products.find(p => p.id === id);
    },

    /**
     * Busca produtos por termo
     */
    searchProducts(term) {
        const lowerTerm = term.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(lowerTerm) ||
            p.description.toLowerCase().includes(lowerTerm)
        );
    },

    /**
     * Obtém todas as categorias
     */
    getCategories() {
        return categories;
    },

    /**
     * Obtém redes sociais
     */
    getSocialLinks() {
        return socialLinks;
    },

    /**
     * Obtém depoimentos
     */
    getTestimonials() {
        return testimonials;
    },

    /**
     * Calcula desconto
     */
    calculateDiscount(originalPrice, discountPercentage) {
        return originalPrice - (originalPrice * discountPercentage / 100);
    },

    /**
     * Formata moeda
     */
    formatCurrency(value) {
        return `${APP_CONFIG.currencySymbol} ${value.toFixed(APP_CONFIG.decimalPlaces).replace('.', ',')}`;
    },

    /**
     * Calcula economia
     */
    calculateSavings(price, originalPrice) {
        return originalPrice - price;
    }
};

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, categories, socialLinks, testimonials, APP_CONFIG, DataService };
}
