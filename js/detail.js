// Detay sayfası JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü kontrolü
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // URL'den airdrop ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const airdropId = urlParams.get('id');
    
    if (airdropId) {
        loadAirdropDetail(airdropId);
    } else {
        showError();
    }
});

// Airdrop verisi (gerçek uygulamada CMS'den gelecek)
const airdropsData = [
    {
        id: 1,
        title: 'Jupiter Airdrop',
        description: 'Solana\'nın en büyük DEX aggregator\'ı Jupiter\'den gelen airdrop fırsatı. Jupiter, Solana ekosisteminde en çok kullanılan DEX aggregator\'ıdır ve kullanıcılarına en iyi fiyatları sunar. Bu airdrop ile Jupiter\'in yeni token\'ı JUP\'yi kazanma şansınız var.',
        image: 'https://cryptologos.cc/logos/jupiter-jup-logo.png',
        status: 'active',
        endDate: '2024-02-15',
        reward: '100-500 JUP',
        requirements: [
            'Solana cüzdanı (Phantom, Solflare vb.)',
            'Jupiter DEX\'te en az 3 işlem yapmış olmak',
            'Solana ağında aktif olmak',
            'Minimum 50$ değerinde işlem yapmış olmak'
        ],
        link: 'https://jup.ag',
        category: 'DeFi',
        blockchain: 'Solana',
        estimatedValue: '$50-250'
    },
    {
        id: 2,
        title: 'Pyth Network Airdrop',
        description: 'Oracle çözümü Pyth Network\'ten gelen airdrop fırsatı. Pyth, gerçek zamanlı finansal veri sağlayıcısı olarak kripto dünyasında önemli bir rol oynamaktadır. Bu airdrop ile Pyth\'in yeni token\'ı PYTH\'yi kazanabilirsiniz.',
        image: 'https://cryptologos.cc/logos/pyth-network-pyth-logo.png',
        status: 'upcoming',
        endDate: '2024-03-01',
        reward: '50-200 PYTH',
        requirements: [
            'Pyth testnet\'ine katılmış olmak',
            'Pyth veri kullanımında bulunmuş olmak',
            'En az 1 testnet işlemi yapmış olmak',
            'Discord topluluğuna katılmış olmak'
        ],
        link: 'https://pyth.network',
        category: 'Oracle',
        blockchain: 'Multi-chain',
        estimatedValue: '$25-100'
    },
    {
        id: 3,
        title: 'LayerZero Airdrop',
        description: 'Cross-chain protokol LayerZero\'dan gelen airdrop fırsatı. LayerZero, farklı blockchain\'ler arasında veri ve varlık transferini sağlayan önemli bir protokoldür. Bu airdrop ile LayerZero\'nun yeni token\'ı ZRO\'yu kazanabilirsiniz.',
        image: 'https://cryptologos.cc/logos/layerzero-zro-logo.png',
        status: 'active',
        endDate: '2024-02-28',
        reward: '100-1000 ZRO',
        requirements: [
            'En az 3 farklı blockchain\'de LayerZero kullanımı',
            'Cross-chain işlemler yapmış olmak',
            'Minimum 100$ değerinde işlem yapmış olmak',
            'LayerZero Discord topluluğuna katılmış olmak'
        ],
        link: 'https://layerzero.network',
        category: 'Cross-chain',
        blockchain: 'Multi-chain',
        estimatedValue: '$100-1000'
    },
    {
        id: 4,
        title: 'Celestia Airdrop',
        description: 'Modüler blockchain Celestia\'dan gelen airdrop fırsatı. Celestia, blockchain\'lerin modüler yapıda geliştirilmesini sağlayan yenilikçi bir platformdur. Bu airdrop ile Celestia\'nın token\'ı TIA\'yı kazanabilirsiniz.',
        image: 'https://cryptologos.cc/logos/celestia-tia-logo.png',
        status: 'ended',
        endDate: '2024-01-15',
        reward: '500-2000 TIA',
        requirements: [
            'Celestia testnet\'ine katılmış olmak',
            'Validator olarak katılım göstermiş olmak',
            'Staking işlemleri yapmış olmak',
            'En az 1000 TIA stake etmiş olmak'
        ],
        link: 'https://celestia.org',
        category: 'Layer 1',
        blockchain: 'Celestia',
        estimatedValue: '$500-2000'
    },
    {
        id: 5,
        title: 'Manta Network Airdrop',
        description: 'Privacy-focused blockchain Manta\'dan gelen airdrop fırsatı. Manta, gizlilik odaklı DeFi çözümleri sunan önemli bir projedir. Bu airdrop ile Manta\'nın yeni token\'ı MAN\'ı kazanabilirsiniz.',
        image: 'https://cryptologos.cc/logos/manta-network-man-logo.png',
        status: 'upcoming',
        endDate: '2024-03-15',
        reward: '200-800 MAN',
        requirements: [
            'Manta testnet\'ine katılmış olmak',
            'Manta DeFi protokollerini kullanmış olmak',
            'En az 5 testnet işlemi yapmış olmak',
            'Manta Discord topluluğuna katılmış olmak'
        ],
        link: 'https://manta.network',
        category: 'Privacy',
        blockchain: 'Manta',
        estimatedValue: '$100-400'
    },
    {
        id: 6,
        title: 'Starknet Airdrop',
        description: 'Layer 2 scaling çözümü Starknet\'ten gelen airdrop fırsatı. Starknet, Ethereum\'un ölçeklenebilirlik sorunlarını çözmek için geliştirilmiş önemli bir Layer 2 çözümüdür. Bu airdrop ile Starknet\'in token\'ı STRK\'yı kazanabilirsiniz.',
        image: 'https://cryptologos.cc/logos/starknet-strk-logo.png',
        status: 'active',
        endDate: '2024-02-20',
        reward: '100-500 STRK',
        requirements: [
            'Starknet cüzdanı kullanmış olmak',
            'Starknet üzerinde işlem yapmış olmak',
            'Gas fee ödemeleri yapmış olmak',
            'En az 10 işlem yapmış olmak'
        ],
        link: 'https://starknet.io',
        category: 'Layer 2',
        blockchain: 'Starknet',
        estimatedValue: '$50-250'
    }
];

function loadAirdropDetail(airdropId) {
    // Önce CMS'den veri çekmeyi dene
    loadAirdropFromCMS(airdropId);
}

// CMS'den airdrop detayını yükle
async function loadAirdropFromCMS(airdropId) {
    try {
        let airdrop = null;
        
        // CMS entegrasyonu varsa kullan
        if (window.cmsIntegration) {
            airdrop = await window.cmsIntegration.fetchAirdrop(airdropId);
        }
        
        // CMS'den veri gelmezse yerel veriden al
        if (!airdrop) {
            airdrop = airdropsData.find(a => a.id == airdropId);
        }
        
        if (!airdrop) {
            showError();
            return;
        }
        
        displayAirdropDetail(airdrop);
        
    } catch (error) {
        console.error('CMS airdrop yükleme hatası:', error);
        
        // Hata durumunda yerel veriden al
        const airdrop = airdropsData.find(a => a.id == airdropId);
        if (airdrop) {
            displayAirdropDetail(airdrop);
        } else {
            showError();
        }
    }
}

// Airdrop detayını göster
function displayAirdropDetail(airdrop) {
    // Loading'i gizle
    document.getElementById('loading').style.display = 'none';
    document.getElementById('airdrop-detail').classList.remove('hidden');
    
    // Airdrop verilerini doldur
    document.getElementById('airdrop-title').textContent = airdrop.title;
    document.getElementById('airdrop-image').src = airdrop.image;
    document.getElementById('airdrop-image').alt = airdrop.title;
    document.getElementById('airdrop-description').textContent = airdrop.description;
    document.getElementById('breadcrumb-title').textContent = airdrop.title;
    
    // Status badge
    const statusBadge = document.getElementById('status-badge');
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
    statusBadge.className = `px-4 py-2 rounded-full text-sm font-medium ${statusColors[airdrop.status]}`;
    statusBadge.textContent = statusText[airdrop.status];
    
    // Requirements listesi
    const requirementsList = document.getElementById('requirements-list');
    requirementsList.innerHTML = '';
    airdrop.requirements.forEach(req => {
        const li = document.createElement('li');
        li.className = 'flex items-start space-x-3';
        li.innerHTML = `
            <i class="fas fa-check text-green-500 mt-1"></i>
            <span class="text-gray-700">${req}</span>
        `;
        requirementsList.appendChild(li);
    });
    
    // Sidebar bilgileri
    document.getElementById('status-text').textContent = statusText[airdrop.status];
    document.getElementById('reward-text').textContent = airdrop.reward;
    document.getElementById('end-date-text').textContent = new Date(airdrop.endDate).toLocaleDateString('tr-TR');
    
    // Countdown timer
    updateCountdown(airdrop.endDate);
    
    // Official link
    document.getElementById('official-link').href = airdrop.link;
    
    // Related airdrops
    loadRelatedAirdrops(airdrop);
    
    // Event listeners
    setupEventListeners(airdrop);
    
    // Page title güncelle
    document.title = `${airdrop.title} - AirdropHub`;
}

function updateCountdown(endDate) {
    const countdownElement = document.getElementById('countdown');
    
    function update() {
        const now = new Date().getTime();
        const end = new Date(endDate).getTime();
        const distance = end - now;
        
        if (distance < 0) {
            countdownElement.textContent = 'Sona Erdi';
            countdownElement.className = 'font-semibold text-red-600';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownElement.textContent = `${days}g ${hours}s ${minutes}d`;
        
        if (days <= 7) {
            countdownElement.className = 'font-semibold text-red-600';
        } else if (days <= 30) {
            countdownElement.className = 'font-semibold text-yellow-600';
        } else {
            countdownElement.className = 'font-semibold text-green-600';
        }
    }
    
    update();
    setInterval(update, 60000); // Her dakika güncelle
}

function loadRelatedAirdrops(currentAirdrop) {
    const relatedContainer = document.getElementById('related-airdrops');
    const related = airdropsData.filter(a => 
        a.id !== currentAirdrop.id && 
        (a.category === currentAirdrop.category || a.blockchain === currentAirdrop.blockchain)
    ).slice(0, 3);
    
    relatedContainer.innerHTML = '';
    
    related.forEach(airdrop => {
        const div = document.createElement('div');
        div.className = 'border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer';
        div.innerHTML = `
            <div class="flex items-center space-x-3">
                <img src="${airdrop.image}" alt="${airdrop.title}" class="w-10 h-10 rounded-full object-cover">
                <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-semibold text-gray-800 truncate">${airdrop.title}</h4>
                    <p class="text-xs text-gray-500">${airdrop.reward}</p>
                </div>
            </div>
        `;
        
        div.addEventListener('click', () => {
            window.location.href = `detail.html?id=${airdrop.id}`;
        });
        
        relatedContainer.appendChild(div);
    });
}

function setupEventListeners(airdrop) {
    // Share button
    document.getElementById('share-btn').addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: airdrop.title,
                text: `${airdrop.title} airdrop fırsatını kaçırmayın!`,
                url: window.location.href
            });
        } else {
            // Fallback: URL'yi kopyala
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link kopyalandı!');
            });
        }
    });
    
    // Bookmark button
    document.getElementById('bookmark-btn').addEventListener('click', () => {
        const bookmarks = JSON.parse(localStorage.getItem('airdropBookmarks') || '[]');
        const isBookmarked = bookmarks.includes(airdrop.id);
        
        if (isBookmarked) {
            const newBookmarks = bookmarks.filter(id => id !== airdrop.id);
            localStorage.setItem('airdropBookmarks', JSON.stringify(newBookmarks));
            document.getElementById('bookmark-btn').innerHTML = '<i class="fas fa-bookmark mr-2"></i>Kaydet';
            alert('Kayıtlardan kaldırıldı!');
        } else {
            bookmarks.push(airdrop.id);
            localStorage.setItem('airdropBookmarks', JSON.stringify(bookmarks));
            document.getElementById('bookmark-btn').innerHTML = '<i class="fas fa-bookmark text-primary mr-2"></i>Kaydedildi';
            alert('Kayıtlara eklendi!');
        }
    });
    
    // Bookmark durumunu kontrol et
    const bookmarks = JSON.parse(localStorage.getItem('airdropBookmarks') || '[]');
    if (bookmarks.includes(airdrop.id)) {
        document.getElementById('bookmark-btn').innerHTML = '<i class="fas fa-bookmark text-primary mr-2"></i>Kaydedildi';
    }
}

function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error-state').classList.remove('hidden');
} 