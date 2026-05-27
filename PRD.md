# PRODUCT REQUIREMENT DOCUMENT (PRD)
# Sistem E-Commerce + POS Toko Sembako

Version: 1.0
Status: MVP Planning
Target Platform: Web Responsive (Desktop + Mobile)

---

# 1. PRODUCT OVERVIEW

Sistem ini merupakan platform terintegrasi untuk toko sembako yang terdiri dari:

1. Website E-Commerce
2. POS (Point of Sale / Kasir)
3. Admin Dashboard

Website dapat diakses melalui:
- Desktop
- Mobile browser
- Tablet

Sistem dirancang untuk:
- mempermudah penjualan online,
- membantu pencatatan transaksi toko,
- sinkronisasi stok realtime,
- dan mempermudah operasional toko harian.

---

# 2. PRODUCT GOALS

## Goals MVP

- Memiliki website toko online sederhana
- Memiliki sistem POS sederhana
- Sinkronisasi stok realtime
- Mendukung pembayaran manual dan QRIS
- Memiliki dashboard admin sederhana
- Mobile friendly
- Mudah digunakan owner toko

---

# 3. TARGET USERS

## 1. Customer

Pengguna yang membeli produk melalui website.

### Customer Goals
- Mencari produk
- Membeli produk
- Upload bukti pembayaran
- Melihat status pesanan

---

## 2. Owner/Admin

Pengelola toko.

### Owner Goals
- Mengelola produk
- Mengelola stok
- Mengelola pesanan
- Mengelola transaksi POS
- Melihat laporan sederhana

---

# 4. MVP FEATURES

# A. E-COMMERCE FEATURES

## Authentication

### Customer
- Register
- Login
- Logout

### Admin
- Login admin

---

## Homepage

### Features
- Banner promo
- Produk terbaru
- Produk populer
- Kategori produk

---

## Product Catalog

### Features
- List produk
- Search produk
- Filter kategori
- Detail produk
- Informasi stok
- Informasi harga

---

## Shopping Cart

### Features
- Tambah produk ke cart
- Update quantity
- Hapus item
- Hitung subtotal otomatis

---

## Checkout

### Input Customer
- Nama
- Nomor WhatsApp
- Alamat
- Catatan pesanan

### Payment Methods
- Transfer bank manual
- E-wallet manual
- QRIS statis

---

## Payment Verification

### Features
- Upload bukti pembayaran
- Status pembayaran
- Verifikasi manual oleh admin

---

## Order System

### Features
- Generate invoice otomatis
- Tracking status pesanan

### Order Status
- Pending
- Menunggu Verifikasi
- Diproses
- Dikirim
- Selesai
- Ditolak

---

## Customer Order History

### Features
- Riwayat pesanan
- Detail invoice
- Detail pembayaran

---

## Digital Invoice

### Features
- Tampilan invoice digital
- Print invoice
- Download PDF

---

## WhatsApp Integration

### Features
- Tombol hubungi admin
- Tombol konfirmasi pembayaran

---

# B. POS FEATURES

## POS Dashboard

### Features
- Tampilan kasir sederhana
- Responsive desktop & mobile

---

## Product Search

### Features
- Search produk cepat
- Pilih produk langsung

---

## POS Cart

### Features
- Tambah produk
- Ubah quantity
- Hapus item

---

## POS Transaction

### Features
- Hitung total otomatis
- Pilih metode pembayaran

### Payment Methods
- Cash
- Transfer
- QRIS

---

## POS Receipt

### Features
- Generate invoice POS
- Struk digital
- Print struk
- Download PDF

---

## POS History

### Features
- Riwayat transaksi POS

---

## Stock Sync

### Features
- Pengurangan stok otomatis setelah transaksi POS
- Sinkron dengan e-commerce

---

# C. ADMIN DASHBOARD FEATURES

## Dashboard Statistics

### Features
- Total transaksi hari ini
- Total order
- Total pendapatan
- Produk hampir habis

---

## Product Management

### Features
- Tambah produk
- Edit produk
- Hapus produk
- Upload gambar
- Kelola harga
- Kelola stok
- Kelola kategori

---

## Category Management

### Features
- Tambah kategori
- Edit kategori
- Hapus kategori

---

## Order Management

### Features
- Melihat order masuk
- Verifikasi pembayaran
- Update status order

---

## Payment Management

### Features
- Kelola rekening bank
- Kelola e-wallet
- Upload QRIS

---

## Transaction Reports

### Features
- Riwayat transaksi e-commerce
- Riwayat transaksi POS

---

## Stock Management

### Features
- Sinkron stok realtime
- Notifikasi stok hampir habis

---

# 5. NON-MVP FEATURES (FUTURE)

## Future Features
- Barcode scanner
- Thermal printer integration
- Payment gateway otomatis
- Ongkir otomatis
- Multi toko
- Multi gudang
- Loyalty point
- Promo voucher
- Marketplace integration
- PWA offline mode
- Akuntansi kompleks

---

# 6. APPLICATION FLOW

# A. CUSTOMER FLOW

## Browse Product

Customer membuka website.

↓

Melihat homepage.

↓

Search atau memilih kategori produk.

↓

Membuka detail produk.

↓

Tambah produk ke cart.

---

## Checkout Flow

Customer membuka cart.

↓

Checkout.

↓

Mengisi:
- nama
- WhatsApp
- alamat
- catatan

↓

Memilih metode pembayaran.

↓

Sistem membuat invoice otomatis.

↓

Customer upload bukti pembayaran.

↓

Status:
"Menunggu Verifikasi"

↓

Admin memverifikasi pembayaran.

↓

Status:
"Diproses"

↓

Pesanan dikirim.

↓

Status:
"Selesai"

---

# B. POS FLOW

Admin membuka halaman POS.

↓

Search produk.

↓

Tambah produk ke cart POS.

↓

Input quantity.

↓

Sistem menghitung total otomatis.

↓

Pilih metode pembayaran.

↓

Simpan transaksi.

↓

Stok otomatis berkurang.

↓

Generate struk digital.

↓

Print atau download PDF.

---

# C. ADMIN FLOW

Admin login.

↓

Masuk dashboard.

↓

Melihat:
- order masuk
- transaksi hari ini
- stok hampir habis

↓

Mengelola:
- produk
- kategori
- pembayaran
- transaksi
- stok

---

# 7. ROLE & ACCESS

| Role | Access |
|---|---|
| Customer | Belanja online |
| Admin | Full dashboard access |
| Owner | Full system access |

---

# 8. TECH STACK

# Frontend

## Framework
- Next.js 15

## Language
- TypeScript 5

## Styling
- Tailwind CSS v4

## UI Components
- shadcn/ui

## Animation
- Framer Motion v12

## State Management
- Zustand

## Form Validation
- Zod
- React Hook Form

---

# Backend & Database

## Backend Service
- Supabase

## Database
- PostgreSQL (Supabase Database)

## Authentication
- Supabase Auth

## File Storage
- Supabase Storage

## Realtime
- Supabase Realtime

---

# Deployment

## Frontend Hosting
- Vercel

## Backend
- Supabase Cloud

---

# 9. WHY NO ORM

Menggunakan Supabase langsung tanpa ORM dipilih karena:

- Lebih sederhana untuk MVP
- Mengurangi kompleksitas development
- Supabase client sudah cukup powerful
- Dokumentasi Supabase lengkap
- Query lebih cepat diimplementasikan
- Cocok untuk skala toko awal

---

# 10. DATABASE STRUCTURE (MVP)

# users

| Field | Type |
|---|---|
| id | uuid |
| name | text |
| email | text |
| role | text |
| phone | text |
| created_at | timestamp |

---

# categories

| Field | Type |
|---|---|
| id | uuid |
| name | text |
| created_at | timestamp |

---

# products

| Field | Type |
|---|---|
| id | uuid |
| category_id | uuid |
| name | text |
| slug | text |
| description | text |
| price | integer |
| stock | integer |
| image_url | text |
| is_active | boolean |
| created_at | timestamp |

---

# orders

| Field | Type |
|---|---|
| id | uuid |
| invoice_number | text |
| user_id | uuid |
| customer_name | text |
| phone | text |
| address | text |
| total_price | integer |
| payment_method | text |
| payment_status | text |
| order_status | text |
| payment_proof | text |
| created_at | timestamp |

---

# order_items

| Field | Type |
|---|---|
| id | uuid |
| order_id | uuid |
| product_id | uuid |
| quantity | integer |
| price | integer |

---

# pos_transactions

| Field | Type |
|---|---|
| id | uuid |
| invoice_number | text |
| total_price | integer |
| payment_method | text |
| created_at | timestamp |

---

# pos_transaction_items

| Field | Type |
|---|---|
| id | uuid |
| pos_transaction_id | uuid |
| product_id | uuid |
| quantity | integer |
| price | integer |

---

# payment_settings

| Field | Type |
|---|---|
| id | uuid |
| bank_name | text |
| account_number | text |
| account_name | text |
| qris_image | text |

---

# 11. RESPONSIVE DESIGN STRATEGY

## Mobile First

UI dibuat mobile-first karena:
- owner kemungkinan sering menggunakan HP,
- customer mayoritas menggunakan mobile.

---

## Desktop Optimization

Desktop digunakan untuk:
- dashboard admin,
- POS,
- manajemen produk.

---

# 12. UI/UX DIRECTION

## Design Style
- Clean
- Modern
- Minimalis
- Cepat digunakan
- Tidak terlalu kompleks

---

## Color Direction

Recommended palette:
- #355872
- #7AAACE
- #9CD5FF
- #F7F8F0

---

# 13. SECURITY (MVP)

## Security Features
- Supabase Auth
- Row Level Security (RLS)
- Protected admin routes
- File upload validation
- Basic rate limiting

---

# 14. MVP DEVELOPMENT PRIORITY

# PHASE 1 — CORE

## E-Commerce
- Authentication
- Product catalog
- Cart
- Checkout
- Upload payment proof
- Order history

## POS
- Search product
- POS cart
- Save transaction
- Digital receipt

## Admin
- Product management
- Order management
- Stock management

---

# PHASE 2 — IMPROVEMENT

- Dashboard analytics
- PDF invoice
- Print receipt
- WhatsApp integration
- Low stock notification

---

# 15. SUCCESS METRICS

## MVP Success

- Website berjalan stabil
- POS berjalan stabil
- Sinkron stok berjalan baik
- Order dapat diproses dengan mudah
- Owner dapat mengelola toko lebih efisien

---

# 16. FINAL SUMMARY

Sistem ini merupakan platform toko sembako modern berbasis web yang menggabungkan:

- e-commerce,
- POS,
- dashboard admin,
- dan sinkronisasi stok realtime.

MVP difokuskan pada:
- kesederhanaan,
- kemudahan penggunaan,
- dan operasional toko harian.

Sistem dirancang agar scalable sehingga di masa depan dapat ditambahkan:
- barcode,
- payment gateway,
- thermal printer,
- dan fitur retail yang lebih kompleks.

---
