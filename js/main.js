// Ana JavaScript dosyası
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü kontrolü
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Sayfa içi linkler için smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Mobil menüyü kapat
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Hero animasyonları
    initHeroAnimations();
    
    // Destekçileri yükle
    loadSupporters();
    
    // Airdropları yükle
    loadAirdropsFromCMS();
    
    // Filtre butonları
    initFilterButtons();
});

// Hero animasyonları
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroHighlight = document.querySelector('.hero-highlight');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    // Başlangıç animasyonu
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
    }, 300);
    
    // Highlight animasyonu
    setInterval(() => {
        heroHighlight.style.color = heroHighlight.style.color === 'rgb(245, 158, 11)' ? '#FCD34D' : '#F59E0B';
    }, 2000);
}

// Destekçiler verisi ve yükleme
const supporters = [
    {
        name: 'Binance',
        logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
        url: 'https://binance.com'
    },
    {
        name: 'Coinbase',
        logo: 'https://cryptologos.cc/logos/coinbase-coin-logo.png',
        url: 'https://coinbase.com'
    },
    {
        name: 'Ethereum',
        logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        url: 'https://ethereum.org'
    },
    {
        name: 'Polygon',
        logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
        url: 'https://polygon.technology'
    },
    {
        name: 'Solana',
        logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
        url: 'https://solana.com'
    },
    {
        name: 'Cardano',
        logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
        url: 'https://cardano.org'
    }
];

function loadSupporters() {
    const supportersGrid = document.getElementById('supporters-grid');
    
    supporters.forEach((supporter, index) => {
        const supporterCard = document.createElement('div');
        supporterCard.className = 'supporter-card bg-white rounded-lg shadow-md p-4 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer';
        supporterCard.style.opacity = '0';
        supporterCard.style.transform = 'translateY(20px)';
        
        supporterCard.innerHTML = `
            <img src="${supporter.logo}" alt="${supporter.name}" class="w-16 h-16 mx-auto mb-3 object-contain">
            <h3 class="text-sm font-semibold text-gray-800">${supporter.name}</h3>
        `;
        
        supporterCard.addEventListener('click', () => {
            window.open(supporter.url, '_blank');
        });
        
        supportersGrid.appendChild(supporterCard);
        
        // Animasyonlu giriş
        setTimeout(() => {
            supporterCard.style.opacity = '1';
            supporterCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Airdrop verisi (Headless CMS'den gelecek)
let airdrops = [
    {
        id: 1,
        title: 'Jupiter Airdrop',
        description: 'Solana\'nın en büyük DEX aggregator\'ından airdrop fırsatı',
        image: 'https://cryptologos.cc/logos/jupiter-jup-logo.png',
        status: 'active',
        endDate: '2024-02-15',
        reward: '100-500 JUP',
        requirements: ['Solana cüzdanı', 'Jupiter kullanımı'],
        link: 'https://jup.ag'
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
        link: 'https://pyth.network'
    },
    {
        id: 3,
        title: 'LayerZero Airdrop',
        description: 'Cross-chain protokol LayerZero\'dan airdrop',
        image: 'https://cryptologos.cc/logos/layerzero-zro-logo.png',
        status: 'active',
        endDate: '2024-02-28',
        reward: '100-1000 ZRO',
        requirements: ['Cross-chain işlemler', 'LayerZero kullanımı'],
        link: 'https://layerzero.network'
    },
    {
        id: 4,
        title: 'Celestia Airdrop',
        description: 'Modüler blockchain Celestia\'dan airdrop',
        image: 'https://cryptologos.cc/logos/celestia-tia-logo.png',
        status: 'ended',
        endDate: '2024-01-15',
        reward: '500-2000 TIA',
        requirements: ['Staking', 'Validator katılımı'],
        link: 'https://celestia.org'
    },
    {
        id: 5,
        title: 'Manta Network Airdrop',
        description: 'Privacy-focused blockchain Manta\'dan airdrop',
        image: 'https://cryptologos.cc/logos/manta-network-man-logo.png',
        status: 'upcoming',
        endDate: '2024-03-15',
        reward: '200-800 MAN',
        requirements: ['Testnet katılımı', 'Manta kullanımı'],
        link: 'https://manta.network'
    },
    {
        id: 6,
        title: 'Starknet Airdrop',
        description: 'Layer 2 scaling çözümü Starknet\'ten airdrop',
        image: 'https://cryptologos.cc/logos/starknet-strk-logo.png',
        status: 'active',
        endDate: '2024-02-20',
        reward: '100-500 STRK',
        requirements: ['Starknet kullanımı', 'Gas fee ödemeleri'],
        link: 'https://starknet.io'
    }
];

function loadAirdrops(filter = 'all') {
    const airdropsGrid = document.getElementById('airdrops-grid');
    airdropsGrid.innerHTML = '';
    
    const filteredAirdrops = filter === 'all' ? airdrops : airdrops.filter(airdrop => airdrop.status === filter);
    
    filteredAirdrops.forEach((airdrop, index) => {
        const airdropCard = document.createElement('div');
        airdropCard.className = 'airdrop-card bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer';
        airdropCard.style.opacity = '0';
        airdropCard.style.transform = 'translateY(20px)';
        
        const statusColors = {
            active: 'bg-green-100 text-green-800',
            upcoming: 'bg-blue-100 text-blue-800',
            ended: 'bg-gray-100 text-gray-800'
        };
        
        const statusText = {
            active: 'Aktif',
            upcoming: 'Yakında',
            ended: 'Sona Eren'
        };
        
        airdropCard.innerHTML = `
            <div class="relative">
                <img src="${airdrop.image}" alt="${airdrop.title}" class="w-full h-48 object-cover">
                <div class="absolute top-4 right-4">
                    <span class="px-3 py-1 rounded-full text-xs font-medium ${statusColors[airdrop.status]}">
                        ${statusText[airdrop.status]}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${airdrop.title}</h3>
                <p class="text-gray-600 mb-4">${airdrop.description}</p>
                <div class="space-y-2 mb-4">
                    <div class="flex items-center text-sm">
                        <i class="fas fa-gift text-accent mr-2"></i>
                        <span class="font-medium">${airdrop.reward}</span>
                    </div>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-calendar text-gray-500 mr-2"></i>
                        <span>Bitiş: ${new Date(airdrop.endDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                </div>
                <div class="mb-4">
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Gereksinimler:</h4>
                    <ul class="text-sm text-gray-600">
                        ${airdrop.requirements.map(req => `<li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>${req}</li>`).join('')}
                    </ul>
                </div>
                <button class="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg transition-colors">
                    Detayları Gör
                </button>
            </div>
        `;
        
        airdropCard.addEventListener('click', () => {
            window.location.href = `detail.html?id=${airdrop.id}`;
        });
        
        airdropsGrid.appendChild(airdropCard);
        
        // Animasyonlu giriş
        setTimeout(() => {
            airdropCard.style.opacity = '1';
            airdropCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Aktif buton stilini güncelle
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            button.classList.add('active', 'bg-primary', 'text-white');
            button.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Airdropları filtrele
            const filter = button.getAttribute('data-filter');
            loadAirdrops(filter);
        });
    });
}

// CMS'den airdrop verilerini yükle
async function loadAirdropsFromCMS() {
    try {
        // CMS entegrasyonu varsa kullan, yoksa örnek veri
        if (window.cmsIntegration) {
            const cmsData = await window.cmsIntegration.fetchAirdrops();
            airdrops = cmsData;
        }
        loadAirdrops();
    } catch (error) {
        console.error('CMS veri yükleme hatası:', error);
        // Hata durumunda mevcut örnek veriyi kullan
        loadAirdrops();
    }
}

// Headless CMS entegrasyonu için API fonksiyonları
async function fetchAirdropsFromCMS() {
    try {
        // Burada gerçek CMS API endpoint'inizi kullanacaksınız
        // Örnek: const response = await fetch('https://your-cms-api.com/airdrops');
        // const data = await response.json();
        // airdrops = data;
        // loadAirdrops();
        
        console.log('CMS\'den airdrop verileri çekildi');
    } catch (error) {
        console.error('CMS veri çekme hatası:', error);
    }
}

// Sayfa yüklendiğinde CMS verilerini çek
// fetchAirdropsFromCMS(); 