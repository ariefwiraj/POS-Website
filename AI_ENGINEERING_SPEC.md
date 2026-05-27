# 17. SYSTEM ARCHITECTURE

## Architecture Style

Menggunakan:
- Frontend + Backend as Service (BaaS)

Frontend:
- Next.js 15 App Router

Backend:
- Supabase

Database:
- PostgreSQL

Authentication:
- Supabase Auth

Storage:
- Supabase Storage

Realtime:
- Supabase Realtime

---

## Application Structure

Menggunakan feature-based architecture.

```txt
src/
 ├── app/
 ├── components/
 ├── features/
 ├── lib/
 ├── services/
 ├── hooks/
 ├── stores/
 ├── types/
 ├── validations/
 └── utils/
```

---

## Feature Structure

```txt
features/
 └── products/
      ├── components/
      ├── hooks/
      ├── services/
      ├── types/
      └── validations/
```

---

## Component Rules

- Gunakan Server Component sebagai default
- Gunakan Client Component hanya jika interaktif
- Hindari prop drilling
- Gunakan reusable UI component

---

## Data Fetching Rules

- Semua database query melalui service layer
- Jangan query langsung di component
- Gunakan server action atau route handler

---

# 18. ENGINEERING RULES

## General Rules

- Gunakan TypeScript strict mode
- Hindari penggunaan any
- Gunakan functional component
- Gunakan async/await
- Gunakan named export

---

## Form Rules

Semua form menggunakan:
- React Hook Form
- Zod validation

---

## State Management

Gunakan Zustand hanya untuk:
- cart
- POS cart
- UI state

Jangan gunakan Zustand untuk:
- server data
- authentication

---

## Naming Convention

### Components
PascalCase

Contoh:
- ProductCard.tsx

### Hooks
camelCase dengan prefix use

Contoh:
- useCart.ts

### Services
camelCase dengan suffix Service

Contoh:
- productService.ts

---

## Styling Rules

- Gunakan Tailwind utility class
- Jangan gunakan inline CSS
- Gunakan shadcn/ui sebagai base component

---

## Error Handling

- Semua async process wajib menggunakan try/catch
- Tampilkan error message yang user-friendly

---

# 19. DATABASE RULES

## General Rules

- Semua table menggunakan uuid
- Semua table memiliki created_at
- Gunakan foreign key
- Gunakan cascade delete jika diperlukan

---

## Product Rules

- stock tidak boleh negatif
- price harus lebih besar dari 0
- slug harus unique

---

## Order Rules

- invoice_number harus unique
- order_status menggunakan enum
- payment_status menggunakan enum

---

## Enum Values

### payment_status

- pending
- waiting_verification
- paid
- rejected

---

### order_status

- pending
- diproses
- dikirim
- selesai
- dibatalkan

---

# 20. STOCK MANAGEMENT RULES

## Stock Update Rules

Stok produk harus otomatis berkurang ketika:
- order berhasil diverifikasi
- transaksi POS berhasil dibuat

---

## Stock Validation

- Tidak boleh checkout jika stok kosong
- Tidak boleh input quantity melebihi stok

---

## Realtime Sync

Perubahan stok harus realtime antara:
- website ecommerce
- POS
- dashboard admin

Menggunakan Supabase Realtime.

---

## Failed Transaction

Jika pembayaran ditolak:
- stok dikembalikan

---

# 21. AUTHORIZATION RULES

## Customer Access

Customer hanya dapat:
- melihat produk
- membuat order
- melihat order milik sendiri

---

## Admin Access

Admin dapat:
- mengelola produk
- mengelola kategori
- memverifikasi pembayaran
- mengelola transaksi

---

## Protected Routes

Dashboard admin wajib protected route.

Unauthorized user harus diarahkan ke halaman login.

---

# 22. API SPECIFICATION

## Products

```http
GET /api/products
GET /api/products/:slug
```

---

## Cart

Menggunakan client-side state.

---

## Orders

```http
POST /api/orders
GET /api/orders/:id
```

---

## Payment

```http
POST /api/payment/upload-proof
```

---

## POS

```http
POST /api/pos/transactions
```

---

## Admin

```http
PATCH /api/admin/orders/:id/status
PATCH /api/admin/orders/:id/payment
```

---

# 23. UI/UX RULES

## Loading State

Semua page wajib memiliki:
- loading skeleton
- disabled button saat submit

---

## Empty State

Semua list wajib memiliki:
- empty state message

---

## Error State

Semua form wajib menampilkan:
- validation error
- server error

---

## Responsive Rules

Mobile-first design.

Breakpoint:
- mobile
- tablet
- desktop

---

## Dashboard Layout

Desktop:
- sidebar kiri
- top navbar

Mobile:
- bottom navigation
- drawer menu

---

# 24. FILE UPLOAD RULES

## Product Images

- format:
  - jpg
  - png
  - webp

- max size:
  - 2MB

---

## Payment Proof

- wajib image
- max size 3MB

---

## Storage

Semua file disimpan di Supabase Storage.

---

# 25. IMPLEMENTATION PRIORITY

## STEP 1

- Setup Next.js
- Setup Tailwind
- Setup Supabase
- Setup authentication

---

## STEP 2

- Database schema
- Product CRUD
- Category CRUD

---

## STEP 3

- Product catalog
- Product detail
- Cart system

---

## STEP 4

- Checkout
- Order system
- Upload payment proof

---

## STEP 5

- POS system
- POS transaction
- Stock sync

---

## STEP 6

- Admin dashboard
- Reports
- Low stock notification

---

# 26. AI AGENT INSTRUCTIONS

## Development Goal

Bangun sistem MVP yang:
- sederhana
- maintainable
- scalable
- mobile friendly

---

## Priority

Prioritaskan:
1. functionality
2. simplicity
3. consistency
4. maintainability

Jangan over-engineering.

---

## Avoid

- jangan membuat microservices
- jangan membuat complex abstraction
- jangan membuat custom ORM
- jangan membuat architecture enterprise-level

---

## Preferred Approach

- gunakan Supabase secara langsung
- gunakan reusable component
- gunakan simple CRUD pattern
- gunakan clean folder structure

---

## Additional Rules

- DO NOT CREATE UNUSED FILES
- DO NOT DUPLICATE COMPONENTS
- REUSE EXISTING COMPONENTS WHEN POSSIBLE
- KEEP IMPLEMENTATION SIMPLE
- DO NOT CREATE PREMATURE OPTIMIZATION
