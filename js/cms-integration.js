// Headless CMS Entegrasyonu
// Bu dosya farklı CMS seçenekleri için API entegrasyonlarını içerir

class CMSIntegration {
    constructor() {
        // CMS konfigürasyonu - bu değerleri kendi CMS'inize göre güncelleyin
        this.config = {
            // Strapi için
            strapi: {
                baseUrl: 'https://your-strapi-instance.com/api',
                token: 'your-strapi-token' // Eğer authentication varsa
            },
            // Contentful için
            contentful: {
                spaceId: 'your-space-id',
                accessToken: 'your-access-token',
                environment: 'master'
            },
            // Sanity için
            sanity: {
                projectId: 'your-project-id',
                dataset: 'production',
                apiVersion: '2024-01-01'
            },
            // Netlify CMS için
            netlify: {
                baseUrl: 'https://your-site.netlify.app/.netlify/functions'
            }
        };
        
        this.currentCMS = 'strapi'; // Varsayılan CMS
    }
    
    // CMS seçimi
    setCMS(cmsType) {
        this.currentCMS = cmsType;
    }
    
    // Tüm airdropları getir
    async fetchAirdrops(filters = {}) {
        try {
            switch(this.currentCMS) {
                case 'strapi':
                    return await this.fetchFromStrapi(filters);
                case 'contentful':
                    return await this.fetchFromContentful(filters);
                case 'sanity':
                    return await this.fetchFromSanity(filters);
                case 'netlify':
                    return await this.fetchFromNetlify(filters);
                default:
                    throw new Error('Desteklenmeyen CMS türü');
            }
        } catch (error) {
            console.error('CMS veri çekme hatası:', error);
            // Hata durumunda örnek veri döndür
            return this.getFallbackData();
        }
    }
    
    // Tek airdrop getir
    async fetchAirdrop(id) {
        try {
            switch(this.currentCMS) {
                case 'strapi':
                    return await this.fetchSingleFromStrapi(id);
                case 'contentful':
                    return await this.fetchSingleFromContentful(id);
                case 'sanity':
                    return await this.fetchSingleFromSanity(id);
                case 'netlify':
                    return await this.fetchSingleFromNetlify(id);
                default:
                    throw new Error('Desteklenmeyen CMS türü');
            }
        } catch (error) {
            console.error('Tek airdrop çekme hatası:', error);
            return null;
        }
    }
    
    // Strapi entegrasyonu
    async fetchFromStrapi(filters) {
        let url = `${this.config.strapi.baseUrl}/airdrops?populate=*`;
        
        // Filtreleri ekle
        if (filters.status && filters.status !== 'all') {
            url += `&filters[status][$eq]=${filters.status}`;
        }
        if (filters.category) {
            url += `&filters[category][$eq]=${filters.category}`;
        }
        if (filters.blockchain) {
            url += `&filters[blockchain][$eq]=${filters.blockchain}`;
        }
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.config.strapi.token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('Strapi API hatası');
        
        const data = await response.json();
        return this.transformStrapiData(data.data);
    }
    
    async fetchSingleFromStrapi(id) {
        const response = await fetch(`${this.config.strapi.baseUrl}/airdrops/${id}?populate=*`, {
            headers: {
                'Authorization': `Bearer ${this.config.strapi.token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('Strapi API hatası');
        
        const data = await response.json();
        return this.transformStrapiData([data.data])[0];
    }
    
    // Contentful entegrasyonu
    async fetchFromContentful(filters) {
        let query = `content_type=airdrop`;
        
        if (filters.status && filters.status !== 'all') {
            query += `&fields.status=${filters.status}`;
        }
        if (filters.category) {
            query += `&fields.category=${filters.category}`;
        }
        if (filters.blockchain) {
            query += `&fields.blockchain=${filters.blockchain}`;
        }
        
        const url = `https://cdn.contentful.com/spaces/${this.config.contentful.spaceId}/environments/${this.config.contentful.environment}/entries?${query}&access_token=${this.config.contentful.accessToken}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Contentful API hatası');
        
        const data = await response.json();
        return this.transformContentfulData(data.items);
    }
    
    async fetchSingleFromContentful(id) {
        const url = `https://cdn.contentful.com/spaces/${this.config.contentful.spaceId}/environments/${this.config.contentful.environment}/entries/${id}?access_token=${this.config.contentful.accessToken}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Contentful API hatası');
        
        const data = await response.json();
        return this.transformContentfulData([data])[0];
    }
    
    // Sanity entegrasyonu
    async fetchFromSanity(filters) {
        let query = `*[_type == "airdrop"`;
        
        if (filters.status && filters.status !== 'all') {
            query += ` && status == "${filters.status}"`;
        }
        if (filters.category) {
            query += ` && category == "${filters.category}"`;
        }
        if (filters.blockchain) {
            query += ` && blockchain == "${filters.blockchain}"`;
        }
        
        query += `] | order(createdAt desc)`;
        
        const url = `https://${this.config.sanity.projectId}.api.sanity.io/v${this.config.sanity.apiVersion}/data/query/${this.config.sanity.dataset}?query=${encodeURIComponent(query)}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Sanity API hatası');
        
        const data = await response.json();
        return this.transformSanityData(data.result);
    }
    
    async fetchSingleFromSanity(id) {
        const query = `*[_type == "airdrop" && _id == "${id}"][0]`;
        const url = `https://${this.config.sanity.projectId}.api.sanity.io/v${this.config.sanity.apiVersion}/data/query/${this.config.sanity.dataset}?query=${encodeURIComponent(query)}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Sanity API hatası');
        
        const data = await response.json();
        return this.transformSanityData([data.result])[0];
    }
    
    // Netlify CMS entegrasyonu
    async fetchFromNetlify(filters) {
        const url = `${this.config.netlify.baseUrl}/get-airdrops`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        });
        
        if (!response.ok) throw new Error('Netlify CMS API hatası');
        
        const data = await response.json();
        return data;
    }
    
    async fetchSingleFromNetlify(id) {
        const url = `${this.config.netlify.baseUrl}/get-airdrop`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        
        if (!response.ok) throw new Error('Netlify CMS API hatası');
        
        const data = await response.json();
        return data;
    }
    
    // Veri dönüşümleri
    transformStrapiData(data) {
        return data.map(item => ({
            id: item.id,
            title: item.attributes.title,
            description: item.attributes.description,
            image: item.attributes.image?.data?.attributes?.url || item.attributes.image,
            status: item.attributes.status,
            endDate: item.attributes.endDate,
            reward: item.attributes.reward,
            requirements: item.attributes.requirements || [],
            link: item.attributes.link,
            category: item.attributes.category,
            blockchain: item.attributes.blockchain,
            estimatedValue: item.attributes.estimatedValue,
            createdAt: item.attributes.createdAt
        }));
    }
    
    transformContentfulData(data) {
        return data.map(item => ({
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description,
            image: item.fields.image?.fields?.file?.url || item.fields.image,
            status: item.fields.status,
            endDate: item.fields.endDate,
            reward: item.fields.reward,
            requirements: item.fields.requirements || [],
            link: item.fields.link,
            category: item.fields.category,
            blockchain: item.fields.blockchain,
            estimatedValue: item.fields.estimatedValue,
            createdAt: item.sys.createdAt
        }));
    }
    
    transformSanityData(data) {
        return data.map(item => ({
            id: item._id,
            title: item.title,
            description: item.description,
            image: item.image?.asset?.url || item.image,
            status: item.status,
            endDate: item.endDate,
            reward: item.reward,
            requirements: item.requirements || [],
            link: item.link,
            category: item.category,
            blockchain: item.blockchain,
            estimatedValue: item.estimatedValue,
            createdAt: item.createdAt
        }));
    }
    
    // Fallback veri (CMS çalışmazsa)
    getFallbackData() {
        return [
            {
                id: 1,
                title: 'Jupiter Airdrop',
                description: 'Solana\'nın en büyük DEX aggregator\'ından airdrop fırsatı',
                image: 'https://cryptologos.cc/logos/jupiter-jup-logo.png',
                status: 'active',
                endDate: '2024-02-15',
                reward: '100-500 JUP',
                requirements: ['Solana cüzdanı', 'Jupiter kullanımı'],
                link: 'https://jup.ag',
                category: 'DeFi',
                blockchain: 'Solana',
                estimatedValue: '$50-250'
            },
            {
                id: 2,
                title: 'Pyth Network Airdrop',
                description: 'Oracle çözümü Pyth Network\'ten airdrop',
                image: 'https://cryptologos.cc/logos/pyth-network-pyth-logo.png',
                status: 'upcoming',
                endDate: '2024-03-01',
                reward: '50-200 PYTH',
                requirements: ['Pyth kullanımı', 'Testnet katılımı'],
                link: 'https://pyth.network',
                category: 'Oracle',
                blockchain: 'Multi-chain',
                estimatedValue: '$25-100'
            }
        ];
    }
}

// Global CMS instance
window.cmsIntegration = new CMSIntegration();

// Kullanım örneği:
// window.cmsIntegration.setCMS('strapi'); // CMS türünü seç
// const airdrops = await window.cmsIntegration.fetchAirdrops({ status: 'active' });
// const airdrop = await window.cmsIntegration.fetchAirdrop(1); 