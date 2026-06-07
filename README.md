```markdown
# 🚀 Tolongin — Fullstack Marketplace Jasa & Freelance Indonesia

**Tolongin** adalah platform marketplace yang menghubungkan pencari jasa (client) dengan penyedia jasa (freelancer) dalam satu ekosistem yang aman, transparan, dan terpercaya. Dibangun dengan arsitektur modern dan siap untuk production.

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🔍 **Hybrid Model** | Post job ATAU booking langsung — fleksibel untuk semua |
| 📋 **Jasa Lengkap** | Jasa fisik (service AC, pindahan) + digital (desain, web) |
| 💬 **Real-time Chat** | Negosiasi langsung dengan WebSocket |
| 🔒 **Escrow System** | Dana aman sampai pekerjaan selesai |
| ✅ **Verifikasi KTP** | Seller terverifikasi, anti scam |
| 💰 **Bidding System** | Seller bisa tawar harga untuk proyek |
| 📊 **Order Timeline** | Tracking pesanan real-time |
| 👑 **Admin Dashboard** | Kelola user, verifikasi, dispute |

## 🛠️ Tech Stack

### Backend
| Teknologi | Keterangan |
|-----------|------------|
| **NestJS** | Framework Node.js dengan arsitektur modular |
| **TypeScript** | Type safety dan maintainability |
| **Prisma ORM** | Database toolkit dengan auto-migration |
| **MySQL** | Database relasional |
| **JWT** | Authentication dengan refresh token di httpOnly cookie |
| **Socket.io** | WebSocket untuk real-time chat |
| **Swagger** | API documentation otomatis |

### Frontend
| Teknologi | Keterangan |
|-----------|------------|
| **Vanilla JS** | Zero-framework, ringan dan cepat |
| **Vite** | Build tool super cepat |
| **Zustand** | State management minimalis |
| **CSS Custom** | Responsive design, dark mode support |

## 📋 Prasyarat

Sebelum menjalankan aplikasi, pastikan Anda memiliki:

- **Node.js** ≥ 18.x (rekomendasi 20 LTS)
- **MySQL** ≥ 8.0 (atau MariaDB 10.6+)
- **npm** atau **pnpm** (contoh menggunakan npm)

## 🚀 Cara Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/spzhrrr/tolongin-fullstack.git
cd tolongin-fullstack
```

### 2. Setup Database MySQL

```sql
-- Login ke MySQL
mysql -u root -p

-- Buat database
CREATE DATABASE tolongin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- (Opsional) Buat user khusus
CREATE USER 'tolongin'@'localhost' IDENTIFIED BY 'tolongin123';
GRANT ALL PRIVILEGES ON tolongin.* TO 'tolongin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Setup Backend (NestJS)

```bash
cd backend

# Copy environment variables
cp .env.example .env  # atau buat file .env manual

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Jalankan migration
npx prisma migrate dev --name init

# Seed data awal (users, categories, services, jobs)
npx prisma db seed

# Jalankan development server
npm run start:dev
```

Backend akan berjalan di: **http://localhost:8001**

Swagger documentation: **http://localhost:8001/api/docs**

### 4. Setup Frontend (Vanilla JS + Vite)

```bash
cd ../frontend

# Copy environment variables
cp .env.example .env  # atau buat file .env manual

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di: **http://localhost:3000**

## 🔧 Konfigurasi Environment Variables

### Backend (`.env`)
```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/tolongin"

# JWT
JWT_SECRET="super-secret-key-min-32-chars-ubah-ini"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"

# Server
PORT=8001
NODE_ENV=development

# Mock OTP (development)
MOCK_OTP_ENABLED=true
```

### Frontend (`.env`)
```env
VITE_BACKEND_URL=http://localhost:8001
VITE_WS_URL=ws://localhost:8001/chat
```

## 🔐 Default Akun (Setelah Seed)

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@tolongin.com` | `Admin@123` |
| **User (verified)** | `andi@tolongin.com` | `User@123` |
| **User (verified)** | `sari@tolongin.com` | `User@123` |
| **User (unverified)** | `newbie@tolongin.com` | `User@123` |

> Gunakan akun `newbie` untuk menguji flow verifikasi bertahap.

## 📁 Struktur Folder

```
tolongin-fullstack/
├── backend/                      # NestJS backend
│   ├── src/
│   │   ├── modules/              # Feature modules
│   │   │   ├── auth/             # Authentication
│   │   │   ├── users/            # User management
│   │   │   ├── services/         # Service listings
│   │   │   ├── jobs/             # Job postings
│   │   │   ├── applications/     # Job applications
│   │   │   ├── orders/           # Order management
│   │   │   ├── chat/             # Real-time chat
│   │   │   ├── reviews/          # Reviews & ratings
│   │   │   ├── payments/         # Payment processing
│   │   │   ├── withdrawals/      # Seller withdrawals
│   │   │   ├── admin/            # Admin dashboard
│   │   │   └── verification/     # KYC & verification
│   │   ├── common/               # Shared guards, decorators, filters
│   │   ├── integrations/         # 3rd party services (mock)
│   │   └── main.ts               # Entry point
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── seed.ts               # Seed data
│   └── package.json
│
└── frontend/                     # Vanilla JS frontend
    ├── src/
    │   ├── app/                  # App, router, store
    │   ├── features/             # Feature-based pages
    │   │   ├── auth/             # Login, register
    │   │   ├── marketplace/      # Cari Jasa
    │   │   ├── jobs/             # Cari Kerja
    │   │   ├── orders/           # Pesanan
    │   │   ├── chat/             # Chat
    │   │   ├── profile/          # Profile & settings
    │   │   ├── dashboard/        # Buyer & seller dashboard
    │   │   ├── admin/            # Admin dashboard
    │   │   └── verification/     # KYC verification
    │   ├── shared/               # UI components, utils, API client
    │   └── styles/               # CSS
    ├── index.html
    └── package.json
```

## 🔄 Flow Aplikasi

### Buyer (Pencari Jasa)
1. Register → Login → Cari Jasa atau Post Job
2. Booking jasa langsung → Bayar (escrow) → Tracking order → Review
3. Post job → Terima lamaran → Buat order → Tracking → Review

### Seller (Penyedia Jasa)
1. Register → Verifikasi KTP (admin approve) → Buat layanan
2. Cari job → Lamar → Diterima → Kerjakan → Dapat pembayaran
3. Tarik penghasilan ke rekening bank

### Admin
1. Login → Verifikasi seller (KTP) → Kelola user/service/job → Resolve dispute

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # E2E tests
```

### Frontend Testing
```bash
cd frontend
npm run test          # Unit tests
```

## 🚢 Deployment

### Backend (Render / Railway)
1. Push kode ke GitHub
2. Hubungkan repo ke Render/Railway
3. Set root directory: `backend`
4. Build command: `npm install && npx prisma generate && npm run build`
5. Start command: `npm run start:prod`
6. Tambahkan environment variables (DATABASE_URL, JWT_SECRET, dll)

### Frontend (Netlify / Vercel)
1. Build frontend: `cd frontend && npm run build`
2. Upload folder `dist` ke Netlify
3. Set environment variable `VITE_BACKEND_URL` ke URL backend production
4. Set `VITE_WS_URL` ke WebSocket URL backend production

## 📚 API Documentation

Setelah backend running, buka Swagger UI di:
```
http://localhost:8001/api/docs
```

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b fitur-anda`)
3. Commit perubahan (`git commit -m 'Menambah fitur X'`)
4. Push ke branch (`git push origin fitur-anda`)
5. Buat Pull Request

## 📝 Lisensi

MIT License — Tolongin Indonesia. Made with ❤️ for sustainable digital economy growth.

## 📧 Kontak

- **Email**: support@tolongin.com
- **Website**: https://tolongin.com
- **GitHub**: https://github.com/spzhrrr/tolongin-fullstack

---

## 🐛 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `DATABASE_URL` not found | Buat file `.env` di folder backend |
| `Can't reach database` | Pastikan MySQL running (`sudo systemctl start mysql`) |
| Prisma migrate gagal | Hapus folder `prisma/migrations`, lalu `npx prisma migrate dev --name init` |
| Port 3000/8001 already in use | Ganti port di `.env` masing-masing |
| WebSocket connection failed | Pastikan `VITE_WS_URL` sesuai dengan endpoint backend |
| CORS error | Periksa `app.enableCors()` di `main.ts` |

---

**© 2026 Tolongin Indonesia. All rights reserved.**
```
