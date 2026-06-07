# 🚀 Tolongin — Fullstack Marketplace Jasa & Freelance Indonesia

**Tolongin** adalah platform marketplace yang menghubungkan pencari jasa (client) dengan penyedia jasa (freelancer) dalam satu ekosistem yang aman, transparan, dan terpercaya. Dibangun dengan arsitektur modern dan siap untuk production.

## ✨ Fitur Utama

- 🔍 Hybrid Model - Post job ATAU booking langsung
- 📋 Jasa Lengkap - Fisik (service AC, pindahan) + Digital (desain, web)
- 💬 Real-time Chat - Negosiasi langsung dengan WebSocket
- 🔒 Escrow System - Dana aman sampai pekerjaan selesai
- ✅ Verifikasi KTP - Seller terverifikasi, anti scam
- 💰 Bidding System - Seller bisa tawar harga untuk proyek
- 📊 Order Timeline - Tracking pesanan real-time
- 👑 Admin Dashboard - Kelola user, verifikasi, dispute

## 🛠️ Tech Stack

### Backend
- NestJS - Framework Node.js dengan arsitektur modular
- TypeScript - Type safety dan maintainability
- Prisma ORM - Database toolkit dengan auto-migration
- MySQL - Database relasional
- JWT - Authentication dengan refresh token di httpOnly cookie
- Socket.io - WebSocket untuk real-time chat
- Swagger - API documentation otomatis

### Frontend
- Vanilla JS - Zero-framework, ringan dan cepat
- Vite - Build tool super cepat
- Zustand - State management minimalis
- CSS Custom - Responsive design

## 📋 Prasyarat

- Node.js ≥ 18.x (rekomendasi 20 LTS)
- MySQL ≥ 8.0 (atau MariaDB 10.6+)
- npm atau pnpm (contoh menggunakan npm)

## 🚀 Cara Menjalankan

### 1. Clone Repository

git clone https://github.com/spzhrrr/tolongin-fullstack.git
cd tolongin-fullstack

### 2. Setup Database MySQL

CREATE DATABASE tolongin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

### 3. Setup Backend (NestJS)

cd backend

cp .env.example .env

npm install

npx prisma generate

npx prisma migrate dev --name init

npx prisma db seed

npm run start:dev

Backend berjalan di: http://localhost:8001

Swagger documentation: http://localhost:8001/api/docs

### 4. Setup Frontend (Vanilla JS + Vite)

cd ../frontend

cp .env.example .env

npm install

npm run dev

Frontend berjalan di: http://localhost:3000

## 🔧 Konfigurasi Environment Variables

### Backend (.env)

DATABASE_URL="mysql://root:password@localhost:3306/tolongin"
JWT_SECRET="super-secret-key-min-32-chars-ubah-ini"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"
PORT=8001
NODE_ENV=development
MOCK_OTP_ENABLED=true

### Frontend (.env)

VITE_BACKEND_URL=http://localhost:8001
VITE_WS_URL=ws://localhost:8001/chat

## 🔐 Default Akun (Setelah Seed)

Role: Admin | Email: admin@tolongin.com | Password: Admin@123

Role: User (verified) | Email: andi@tolongin.com | Password: User@123

Role: User (verified) | Email: sari@tolongin.com | Password: User@123

Role: User (unverified) | Email: newbie@tolongin.com | Password: User@123

## 📁 Struktur Folder

tolongin-fullstack/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── services/
│   │   │   ├── jobs/
│   │   │   ├── applications/
│   │   │   ├── orders/
│   │   │   ├── chat/
│   │   │   ├── reviews/
│   │   │   ├── payments/
│   │   │   ├── withdrawals/
│   │   │   ├── admin/
│   │   │   └── verification/
│   │   ├── common/
│   │   ├── integrations/
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── features/
    │   │   ├── auth/
    │   │   ├── marketplace/
    │   │   ├── jobs/
    │   │   ├── orders/
    │   │   ├── chat/
    │   │   ├── profile/
    │   │   ├── dashboard/
    │   │   ├── admin/
    │   │   └── verification/
    │   ├── shared/
    │   └── styles/
    ├── index.html
    └── package.json

## 🔄 Flow Aplikasi

Buyer (Pencari Jasa):
Register → Login → Cari Jasa atau Post Job → Booking → Bayar → Tracking → Review

Seller (Penyedia Jasa):
Register → Verifikasi KTP → Buat layanan → Cari job → Lamar → Diterima → Kerjakan → Tarik penghasilan

Admin:
Login → Verifikasi seller → Kelola user/service/job → Resolve dispute

## 🧪 Testing

cd backend
npm run test

cd ../frontend
npm run test

## 🚢 Deployment

### Backend (Render / Railway)

1. Push kode ke GitHub
2. Hubungkan repo ke Render
3. Set root directory: backend
4. Build: npm install && npx prisma generate && npm run build
5. Start: npm run start:prod
6. Tambahkan environment variables

### Frontend (Netlify / Vercel)

1. Build frontend: cd frontend && npm run build
2. Upload folder dist ke Netlify
3. Set VITE_BACKEND_URL ke URL backend production

## 📚 API Documentation

http://localhost:8001/api/docs

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📝 Lisensi

MIT License — Tolongin Indonesia

## 📧 Kontak

Email: support@tolongin.com
GitHub: https://github.com/spzhrrr/tolongin-fullstack

## 🐛 Troubleshooting

Masalah: DATABASE_URL not found
Solusi: Buat file .env di folder backend

Masalah: Prisma migrate gagal
Solusi: Hapus folder prisma/migrations, lalu npx prisma migrate dev --name init

Masalah: Port already in use
Solusi: Ganti port di .env

Masalah: WebSocket connection failed
Solusi: Pastikan VITE_WS_URL sesuai dengan endpoint backend

---

© 2026 Tolongin Indonesia. All rights reserved.
