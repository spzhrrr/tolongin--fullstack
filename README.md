# "Tolongin" --- Marketplace Jasa

"Tolongin" dibangun untuk mendukung sistem marketplace jasa berbasis web. Dalam sistem ini, user dapat membuat akun, login, membuat layanan jasa, melakukan booking, memberikan review, serta mengelola profil pengguna. Backend web ini dikembangkan menggunakan Node.js, Express.js, TypeScript, dan MySQL dengan menerapkan layered architecture. Tujuannya agar struktur project lebih rapi dan memudahkan pengembangan di tahap berikutnya.
Fokus utama dari project ini adalah pada proses backend dan penyediaan API. Seluruh fitur utama marketplace diproses melalui REST API yang nantinya dapat dikonsumsi oleh frontend, baik web maupun mobile.

---

# Gambaran Sistem

Terdapat beberapa proses utama dalam sistem ini:

- User dapat register dan login menggunakan JWT authentication
- Seller dapat membuat dan mengelola jasa yang ditawarkan
- Buyer dapat melakukan booking terhadap jasa
- Buyer yang telah melakukan booking dapat memberikan review
- Seller dapat mengubah status booking
- Sistem menyediakan dashboard statistik sederhana

Backend juga telah dilengkapi dengan middleware authentication, upload image, validasi ownership, serta service layer agar business logic tidak bercampur langsung dengan controller.

---

# Fitur yang Telah Diimplementasikan

## Authentication

Fitur authentication menggunakan JWT token dan bcrypt hashing.

User dapat:
- Register akun
- Login akun
- Mendapatkan data profil sendiri
- Mengupdate profil

Password user tidak disimpan dalam bentuk plain text karena telah melalui proses hashing menggunakan bcrypt.

---

## Service Marketplace

Seller dapat membuat layanan jasa seperti:
- desain logo
- editing video
- UI/UX design
- programming service
- dan lain-lain

Fitur yang tersedia pada service:
- create service
- update service
- delete service
- upload image
- filter by category
- search service

Setiap service terhubung dengan user yang membuatnya melalui foreign key `user_id`.

---

## Booking System

Buyer dapat melakukan booking terhadap suatu jasa.

Seller kemudian dapat:
- menerima booking
- menolak booking
- menyelesaikan booking

Status booking disimpan dalam database sehingga workflow transaksi dapat dilacak.

---

## Review System

User yang telah melakukan booking dapat memberikan review dan rating terhadap jasa yang digunakan.

Review terdiri dari:
- rating
- comment
- tanggal review

Review digunakan untuk menampilkan kualitas layanan dari seller.

---

## Dashboard

Backend menyediakan endpoint dashboard sederhana untuk menampilkan:
- total users
- total services
- total bookings
- total reviews

Data dashboard diambil langsung dari database menggunakan query aggregation seperti `COUNT`, `JOIN`, dan query statistik lainnya.

---

# Teknologi yang Digunakan

| Teknologi | Fungsi |
|---|---|
| Node.js | Runtime environment untuk backend |
| Express.js | Web framework untuk Node.js |
| TypeScript | Supaya penulisan kode memiliki static typing |
| MySQL | Relational database |
| JWT | Authentication mechanism |
| bcrypt | Password hashing |
| multer | Middleware untuk handle upload file |
| mysql2 | MySQL driver untuk koneksi database |
| dotenv | Mengelola environment variables |

---

# Struktur Backend

Backend ini menggunakan layered architecture.

Alur kerjanya sebagai berikut:

```text
Routes
↓
Middleware
↓
Controller
↓
Service
↓
Database
```

## Penjelasan Per Layer

### Routes
Bertugas mendefinisikan endpoint-endpoint API.

### Middleware
Menangani authentication, logging, validasi awal, dan pengecekan authorization.

### Controller
Menerima request dari client dan menyusun response yang akan dikirim kembali.

### Service
Berisi business logic dan proses interaksi dengan database.

### Database
Tempat penyimpanan seluruh data aplikasi.

Dengan pendekatan ini, kode menjadi lebih terstruktur dan tidak terjadi pencampuran tanggung jawab antar layer.

---

# Struktur Folder

```text
src/
├── config/
├── constants/
├── controllers/
├── middleware/
├── routes/
├── services/
├── utils/
├── app.ts
├── server.ts
```

---

# Database

Database yang digunakan adalah MySQL.

Berikut adalah tabel-tabel utama:

## users

Menyimpan data akun user.

Kolom utama:
- username
- email
- password (hashed)
- bio
- avatar
- location

---

## services

Menyimpan data jasa yang dibuat oleh seller.

Kolom utama:
- title
- price
- category
- image
- user_id

`user_id` merupakan foreign key yang terhubung ke tabel users.

---

## bookings

Menyimpan transaksi booking jasa.

Kolom utama:
- service_id
- buyer_id
- status

Status booking dapat berupa:
- pending
- accepted
- rejected
- completed

---

## reviews

Menyimpan rating dan review dari user.

Kolom utama:
- rating
- comment
- reviewer_id
- service_id

---

# Cara Menjalankan Project

## 1. Clone Repository

```bash
git clone https://github.com/spzhrrr/proyek-marketplace-jasa.git
```

---

## 2. Masuk ke Direktori Backend

```bash
cd backend
```

---

## 3. Install Dependency

```bash
npm install
```

---

## 4. Buat File `.env`

```env
PORT=5000

JWT_SECRET=mysecretkey

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=proyeksa_db
```

---

## 5. Jalankan Server

```bash
npm run dev
```

Apabila berhasil, server akan berjalan pada:

```text
http://localhost:5000
```

---

# Endpoint API

## User

| Method | Endpoint |
|---|---|
| POST | /api/users/register |
| POST | /api/users/login |
| GET | /api/users/me |
| PUT | /api/users/me |

---

## Services

| Method | Endpoint |
|---|---|
| GET | /api/services |
| GET | /api/services/:id |
| POST | /api/services |
| PUT | /api/services/:id |
| DELETE | /api/services/:id |

---

## Bookings

| Method | Endpoint |
|---|---|
| POST | /api/bookings/:serviceId |
| GET | /api/bookings |
| PUT | /api/bookings/:bookingId/status |

---

## Reviews

| Method | Endpoint |
|---|---|
| POST | /api/reviews/:serviceId |
| GET | /api/reviews/:serviceId |

---

# Authentication Flow

Proses login berlangsung sebagai berikut:

1. Backend memvalidasi email dan password yang dikirim oleh user
2. Apabila valid, sistem membangkitkan JWT token
3. Token dikembalikan ke frontend
4. Frontend menyimpan token
5. Untuk mengakses protected route, frontend menyertakan token dalam header Authorization

Protected route akan memverifikasi token melalui middleware authentication sebelum request diproses lebih lanjut.

---

# Upload File

Upload image ditangani menggunakan multer.

File hasil upload disimpan pada folder:

```text
/uploads
```

---

# Error Handling

Backend menerapkan centralized error handling middleware sehingga response error yang dihasilkan memiliki format yang konsisten.

Contoh response error:

```json
{
  "message": "Service not found"
}
```

---

# Pengembangan Selanjutnya

Beberapa fitur yang masih dapat dikembangkan lebih lanjut:

- Integrasi payment gateway
- Real-time chat antara buyer dan seller
- Notification system
- Penyimpanan image ke cloud storage
- Admin dashboard
- Recommendation system berdasarkan riwayat booking

---

# Kesimpulan

Project Marketplace Jasa Backend ini merupakan implementasi backend untuk marketplace jasa dengan mencakup authentication, booking system, review system, upload file, serta pengelolaan relational database.

Selain berfokus pada kelengkapan fitur, project ini juga menekankan struktur backend yang terorganisasi melalui layered architecture agar lebih mudah dikembangkan dan dipelihara pada tahap berikutnya.
