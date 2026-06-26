// DATA PRODUK - BOT, TOP UP, FOLLOWERS, DESAIN
const produk = [
    // BOT SPACEMAN
    {
        id: 1,
        nama: 'Bot Spaceman 24 Jam',
        harga: 150000,
        emoji: '🤖',
        kategori: 'bot',
        deskripsi: 'Bot spaceman otomatis penuh 24 jam',
        specs: '24 jam, Full profit, Support 24/7'
    },
    {
        id: 2,
        nama: 'Bot Spaceman Premium',
        harga: 250000,
        emoji: '🤖',
        kategori: 'bot',
        deskripsi: 'Bot spaceman dengan fitur advanced',
        specs: 'Advanced AI, Anti-banned, Lifetime'
    },
    {
        id: 3,
        nama: 'Bot Spaceman Starter',
        harga: 75000,
        emoji: '🤖',
        kategori: 'bot',
        deskripsi: 'Bot spaceman untuk pemula',
        specs: '7 hari, Basic features, Support chat'
    },

    // TOP UP GAME
    {
        id: 4,
        nama: 'Top Up Diamond Free Fire',
        harga: 50000,
        emoji: '🎮',
        kategori: 'topup',
        deskripsi: 'Top up diamond free fire 1000 - 10000',
        specs: 'Instant, Aman, Official'
    },
    {
        id: 5,
        nama: 'Top Up UC PUBG Mobile',
        harga: 100000,
        emoji: '🎮',
        kategori: 'topup',
        deskripsi: 'Top up UC PUBG mobile 600 - 3000',
        specs: 'Real Account, Cepat, Terpercaya'
    },
    {
        id: 6,
        nama: 'Top Up Gem Mobile Legends',
        harga: 75000,
        emoji: '🎮',
        kategori: 'topup',
        deskripsi: 'Top up gem ML 250 - 2500',
        specs: 'ID Server, Instant, Support'
    },
    {
        id: 7,
        nama: 'Top Up Credit Honkai Star Rail',
        harga: 120000,
        emoji: '🎮',
        kategori: 'topup',
        deskripsi: 'Top up crystal star rail 600 - 6000',
        specs: 'Global/CN, Official, Aman'
    },

    // FOLLOWERS SOSMED
    {
        id: 8,
        nama: 'Followers Instagram 100',
        harga: 25000,
        emoji: '📱',
        kategori: 'followers',
        deskripsi: 'Tambah followers Instagram 100 orang',
        specs: 'Aktif, Organik, Aman'
    },
    {
        id: 9,
        nama: 'Followers TikTok 500',
        harga: 50000,
        emoji: '📱',
        kategori: 'followers',
        deskripsi: 'Tambah followers TikTok 500 orang',
        specs: 'Real Users, Cepat, Terjamin'
    },
    {
        id: 10,
        nama: 'Followers Instagram 1000',
        harga: 100000,
        emoji: '📱',
        kategori: 'followers',
        deskripsi: 'Tambah followers Instagram 1000 orang',
        specs: 'Organik Real, Permanent, Support'
    },
    {
        id: 11,
        nama: 'Likes TikTok 1000',
        harga: 40000,
        emoji: '📱',
        kategori: 'followers',
        deskripsi: 'Tambah likes TikTok 1000',
        specs: 'Instant, Real Engagement'
    },
    {
        id: 12,
        nama: 'Views YouTube 10k',
        harga: 75000,
        emoji: '📱',
        kategori: 'followers',
        deskripsi: 'Tambah views YouTube 10,000',
        specs: 'Real Views, Permanen, Aman'
    },

    // DESAIN PREMIUM
    {
        id: 13,
        nama: 'Desain Logo Bisnis',
        harga: 200000,
        emoji: '✨',
        kategori: 'desain',
        deskripsi: 'Desain logo profesional untuk bisnis',
        specs: '3 konsep, Unlimited revisi, Vektor'
    },
    {
        id: 14,
        nama: 'Desain Banner Sosmed',
        harga: 100000,
        emoji: '✨',
        kategori: 'desain',
        deskripsi: 'Desain banner cantik untuk Instagram/Facebook',
        specs: 'Custom design, 5 pilihan, HD'
    },
    {
        id: 15,
        nama: 'Paket Branding Lengkap',
        harga: 500000,
        emoji: '✨',
        kategori: 'desain',
        deskripsi: 'Paket lengkap: Logo + Banner + Business Card',
        specs: 'Profesional, Lengkap, Konsultasi'
    },
    {
        id: 16,
        nama: 'Desain UI/UX Aplikasi',
        harga: 1500000,
        emoji: '✨',
        kategori: 'desain',
        deskripsi: 'Desain aplikasi mobile profesional',
        specs: 'Modern design, Prototype, Figma file'
    },
    {
        id: 17,
        nama: 'Desain Website Landing Page',
        harga: 800000,
        emoji: '✨',
        kategori: 'desain',
        deskripsi: 'Desain landing page modern responsif',
        specs: 'Responsive, SEO friendly, Modern'
    }
];

// DATA KERANJANG
let keranjang = [];
let kategoriAktif = 'semua';

// FUNCTION: Tampilkan halaman
function showPage(pageName) {
    // Sembunyikan semua halaman
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Tampilkan halaman yang dipilih
    document.getElementById(pageName).style.display = 'block';

    // Jika halaman produk, tampilkan produk
    if (pageName === 'produk') {
        tampilkanProduk();
    }

    // Jika halaman keranjang, tampilkan keranjang
    if (pageName === 'keranjang') {
        tampilkanKeranjang();
    }

    // Scroll ke atas
    window.scrollTo(0, 0);
}

// FUNCTION: Filter kategori
function filterKategori(kategori) {
    kategoriAktif = kategori;
    
    // Update button aktif
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    tampilkanProduk();
}

// FUNCTION: Tampilkan semua produk
function tampilkanProduk() {
    const container = document.getElementById('produksContainer');
    container.innerHTML = '';

    let produkTampil = produk;

    // Filter berdasarkan kategori
    if (kategoriAktif !== 'semua') {
        produkTampil = produk.filter(p => p.kategori === kategoriAktif);
    }

    // Jika tidak ada produk
    if (produkTampil.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Tidak ada produk di kategori ini</p>';
        return;
    }

    produkTampil.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-header">
                <span class="product-emoji">${item.emoji}</span>
                <span class="product-category">${item.kategori.toUpperCase()}</span>
            </div>
            <div class="product-image"></div>
            <div class="product-info">
                <h3>${item.nama}</h3>
                <p>${item.deskripsi}</p>
                <div class="product-specs">📋 ${item.specs}</div>
                <div class="product-price">Rp ${item.harga.toLocaleString('id-ID')}</div>
                <button class="btn-secondary product-button" onclick="tambahKeKeranjang(${item.id})">
                    ➕ Tambah ke Keranjang
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// FUNCTION: Tambah ke keranjang
function tambahKeKeranjang(idProduk) {
    const item = produk.find(p => p.id === idProduk);
    
    // Cek apakah produk sudah ada di keranjang
    const existingItem = keranjang.find(k => k.id === idProduk);
    
    if (existingItem) {
        existingItem.jumlah++;
    } else {
        keranjang.push({
            ...item,
            jumlah: 1
        });
    }

    updateJumlahItem();
    
    // Notifikasi
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-in;
    `;
    notification.textContent = `✅ ${item.nama} ditambahkan ke keranjang!`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// FUNCTION: Tampilkan keranjang
function tampilkanKeranjang() {
    const container = document.getElementById('keranjangContainer');
    
    if (keranjang.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <p style="font-size: 48px; margin-bottom: 20px;">🛒</p>
                <p style="font-size: 18px; color: #7f8c8d;">Keranjang Anda kosong</p>
                <button class="btn-primary" style="margin-top: 20px;" onclick="showPage('produk')">
                    Lanjut Belanja
                </button>
            </div>
        `;
        return;
    }

    let html = '';
    let total = 0;

    keranjang.forEach(item => {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;

        html += `
            <div class="cart-item">
                <span class="cart-item-emoji">${item.emoji}</span>
                <div class="cart-item-info">
                    <h4>${item.nama}</h4>
                    <p>Rp ${item.harga.toLocaleString('id-ID')} × ${item.jumlah} = <strong>Rp ${subtotal.toLocaleString('id-ID')}</strong></p>
                </div>
                <div class="cart-item-buttons">
                    <button class="btn-secondary" onclick="kurangiJumlah(${item.id})">−</button>
                    <button class="btn-secondary" onclick="tambahJumlah(${item.id})">+</button>
                    <button class="btn-danger" onclick="hapusDariKeranjang(${item.id})">🗑️ Hapus</button>
                </div>
            </div>
        `;
    });

    html += `
        <div class="cart-summary">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 18px; color: #2c3e50; font-weight: 600;">Total Harga:</span>
                <h3 style="margin: 0;">Rp ${total.toLocaleString('id-ID')}</h3>
            </div>
            <button class="btn-primary" onclick="checkout()">🛍️ Lanjut ke Checkout</button>
        </div>
    `;

    container.innerHTML = html;
}

// FUNCTION: Tambah jumlah
function tambahJumlah(idProduk) {
    const item = keranjang.find(k => k.id === idProduk);
    if (item) {
        item.jumlah++;
        tampilkanKeranjang();
    }
}

// FUNCTION: Kurangi jumlah
function kurangiJumlah(idProduk) {
    const item = keranjang.find(k => k.id === idProduk);
    if (item) {
        item.jumlah--;
        if (item.jumlah <= 0) {
            hapusDariKeranjang(idProduk);
        } else {
            tampilkanKeranjang();
        }
    }
}

// FUNCTION: Hapus dari keranjang
function hapusDariKeranjang(idProduk) {
    keranjang = keranjang.filter(k => k.id !== idProduk);
    updateJumlahItem();
    tampilkanKeranjang();
}

// FUNCTION: Update jumlah item di header
function updateJumlahItem() {
    const total = keranjang.reduce((sum, item) => sum + item.jumlah, 0);
    document.getElementById('jumlahItem').textContent = total;
}

// FUNCTION: Checkout
function checkout() {
    const total = keranjang.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
    
    const pesan = `
Terima Kasih Telah Berbelanja di KenzoStore19!

📋 DETAIL PESANAN:
${keranjang.map(item => `• ${item.nama} × ${item.jumlah} = Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}`).join('\n')}

💰 TOTAL: Rp ${total.toLocaleString('id-ID')}

📞 HUBUNGI KAMI UNTUK PEMBAYARAN:
WhatsApp: +62 812-3456-7890
Email: info@kenzostore19.com

Silakan konfirmasi pesanan Anda melalui WhatsApp atau email.
    `;
    
    alert(pesan);
    keranjang = [];
    updateJumlahItem();
    showPage('home');
}

// Jalankan saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
    updateJumlahItem();
});

// CSS Animation untuk notifikasi
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
