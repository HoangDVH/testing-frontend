# Pages & Co. — Tài liệu dự án Frontend

Website bookstore **frontend only** — mock data trên trình duyệt, không backend/API/database.

---

## 1. Tổng quan

**Pages & Co.** gồm: trang chủ (carousel, genre, sách nổi bật), Shop All (lọc/sắp xếp), chi tiết sách, giỏ hàng, đăng nhập/đăng ký (modal), header (nav, search, bag), footer (newsletter, links).

---

## 2. Công nghệ

| Nhóm | Công nghệ | Vai trò |
|------|-----------|---------|
| **Core** | React 19, TypeScript 6, Vite 8, React Router DOM 7 | UI, type safety, build, routing |
| **Styling** | Pure CSS, Flexbox, Grid, CSS Variables, Google Fonts (Playfair Display + Inter) | Giao diện, design tokens (`variables.css`), responsive |
| **State** | React Context, Custom Hooks, `useMemo`/`useCallback`, `useSearchParams`, `useParams` | Cart, Auth, carousel, filter URL |
| **Tooling** | ESLint, typescript-eslint, react-hooks plugin | Lint & quality |
| **Deploy** | Vercel + `vercel.json` | SPA hosting, rewrite → `index.html` |

---

## 3. Cấu trúc thư mục

```
src/
├── App.tsx, main.tsx
├── components/   Header, Footer, Layout, SignIn/SignUpModal,
│                 HeroCarousel, GenreGrid, BookSection, BookCard,
│                 Breadcrumbs, SectionHeader, PromoBanner
├── pages/        HomePage, ShopPage, ProductDetailPage, BagPage, NotFoundPage
├── context/      CartProvider, AuthProvider (+ context types)
├── hooks/        useCart, useAuth, useCarousel, useModalA11y
├── data/         siteData.ts (14 sách, genres, nav, hero)
└── styles/       variables.css, global.css
```

---

## 4. Routing

| Route | Page | Mô tả |
|-------|------|-------|
| `/` | HomePage | Trang chủ |
| `/books` | ShopPage | Danh sách sách |
| `/books?genre=...` | ShopPage | Lọc thể loại (query param) |
| `/books/:slug` | ProductDetailPage | Chi tiết sách |
| `/bag` | BagPage | Giỏ hàng |
| `*` | NotFoundPage | 404 |

**Layout:** Header + `<Outlet>` + Footer + SignInModal + SignUpModal.

---

## 5. Chức năng

### Trang chủ
- **HeroCarousel** — 3 slide, auto-play 6s, prev/next, dots, CTA link (`useCarousel`)
- **GenreGrid** — 6 genre → `/books?genre=...`
- **BookSection × 3** — Featured, Bestsellers, New Arrivals (`BookCard`)
- **PromoBanner** — CTA → `/#newsletter`

### Header
- Logo, nav links, sticky header, hamburger menu (≤1024px)
- **Search** — title/author, dropdown 5 kết quả; desktop: header bar / mobile: trong menu ☰
- **Auth** — Sign in/out (desktop header); Sign in + Create account (mobile menu)
- **Bag badge** — số item từ cart
- Mobile menu: Escape đóng, khóa scroll, scroll khi dài

### Shop All
- Filter 9 genre (`useSearchParams`), sort 5 kiểu (`useMemo`)
- Grid 14 sách, empty state, responsive 5→4→3→2 cột (mobile luôn 2/hàng)
- Filter scroll ngang ≤900px

### Chi tiết sản phẩm
- Dynamic slug (`useParams`, `getBookBySlug`), 404 nếu không tìm thấy
- Cover mock (màu), metadata (`<dl>`), add to bag, wishlist toggle (UI local)
- Related books (`getRelatedBooks`), breadcrumbs

### Giỏ hàng
- Add/remove/qty, order summary (subtotal, free shipping, total)
- Checkout: chưa login → SignInModal; đã login → message demo
- Empty state → link Shop All

### Auth (modal)
- **SignIn** — email + password, validate client-side, link Create account
- **SignUp** — name, email, password, confirm; validate + auto sign-in
- Chuyển modal (`switchToSignUp`/`switchToSignIn`), Escape + scroll lock (`useModalA11y`)

### Khác
- **BookCard** — badge, add bag (+), link detail, price/rating
- **Footer** — links (route/anchor map), newsletter validate email
- **404** — link Home & Shop
- **UX** — scroll top khi chuyển trang; hash `#newsletter` scroll tới section; menu đóng khi đổi route

---

## 6. State & Hooks

**Cart** (`CartProvider`): `addItem`, `removeItem`, `updateQuantity`, `count`, `subtotal` — không persist sau refresh.

**Auth** (`AuthProvider`): modal open/close, `signIn`, `signUp`, `signOut`, `userName` — mock, không API/JWT/session.

**Hooks:** `useCart`, `useAuth`, `useCarousel`, `useModalA11y`.

---

## 7. Dữ liệu mock (`siteData.ts`)

`catalogBooks` (14 sách), `filterCategories`, `sortOptions`, `navLinks`, `genres`, `heroSlides`, subsets homepage, `footerLinks`, `getBookBySlug()`, `getRelatedBooks()`. Interface `Book` TypeScript đầy đủ.

---

## 8. Styling & Responsive

**Tokens:** bg `#F9F4E8`, text `#2D1A12`, accent `#A04020`, gold `#C5A059`, container `1140px`.

**Breakpoints:** 1200px (grid 4 cột), 1024px (hamburger, search/auth trong menu), 900px (filter scroll), 768px (grid 2 cột), 640px (logo text ẩn).

**Kỹ thuật:** Flexbox (header, modal, bag), Grid (shop, sections), `min-width: 0`, `overflow-x: clip`.

---

## 9. Accessibility

Semantic HTML, ARIA (dialog, listbox, pressed), Escape (modal/menu), `:focus-visible`, `.sr-only`, single H1, scroll lock.

---

## 10. Deploy & Scripts

**Vercel:** Framework Vite | Build `npm run build` | Output `dist` | `vercel.json` rewrite SPA.

```bash
npm install    # cài dependency
npm run dev    # dev server (localhost:5173)
npm run build  # build → dist/
npm run preview
npm run lint
```

---

## Luồng người dùng

```
Home → Shop/Search → Product → Add to bag → Bag → Checkout
                                              ├─ chưa login → SignIn → SignUp
                                              └─ đã login → message demo
```

## Giới hạn

Không backend/payment; auth & cart mất khi refresh; cover sách mock màu; wishlist UI only; social/privacy links placeholder.

---

*Cập nhật theo codebase Pages & Co.*
