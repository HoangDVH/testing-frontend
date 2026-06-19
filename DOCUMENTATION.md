# Pages & Co. — Tài liệu dự án Frontend

Tài liệu mô tả chi tiết toàn bộ chức năng đã triển khai và công nghệ tương ứng cho website bookstore **Pages & Co.**

> **Phạm vi:** Frontend only — không có backend, database hay API thật. Dữ liệu sách và xác thực người dùng được mô phỏng hoàn toàn trên trình duyệt.

---

## Mục lục

1. [Tổng quan](#1-tổng-quan)
2. [Công nghệ sử dụng](#2-công-nghệ-sử-dụng)
3. [Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
4. [Routing & các trang](#4-routing--các-trang)
5. [Chức năng chi tiết](#5-chức-năng-chi-tiết)
6. [Quản lý state](#6-quản-lý-state)
7. [Dữ liệu mock](#7-dữ-liệu-mock)
8. [Styling & Responsive](#8-styling--responsive)
9. [Accessibility & UX](#9-accessibility--ux)
10. [Deploy (Vercel)](#10-deploy-vercel)
11. [Scripts & lệnh chạy](#11-scripts--lệnh-chạy)

---

## 1. Tổng quan

**Pages & Co.** là website bán sách trực tuyến (online bookstore) gồm:

- Trang chủ giới thiệu, carousel, genre, sách nổi bật
- Trang danh sách sách (Shop All) với lọc và sắp xếp
- Trang chi tiết sản phẩm
- Giỏ hàng (Bag)
- Đăng nhập / đăng ký (modal, frontend mock)
- Header có tìm kiếm, navigation, giỏ hàng
- Footer có newsletter và liên kết

---

## 2. Công nghệ sử dụng

### 2.1 Core

| Công nghệ | Phiên bản | Vai trò |
|-----------|-----------|---------|
| **React** | 19.x | UI library, component-based architecture |
| **TypeScript** | 6.x | Type safety, interface cho Book, Cart, Auth |
| **Vite** | 8.x | Dev server, bundler, HMR, production build |
| **React Router DOM** | 7.x | Client-side routing, nested routes, URL params, search params |

### 2.2 Styling

| Công nghệ | Vai trò |
|-----------|---------|
| **Pure CSS** | Toàn bộ giao diện — không dùng Tailwind, Bootstrap hay CSS-in-JS |
| **CSS Flexbox** | Header, toolbar, card layout, modal, footer grid |
| **CSS Grid** | Lưới sách, genre cards, book sections |
| **CSS Variables** | Design tokens (`variables.css`): màu, font, spacing, shadow |
| **Google Fonts** | Playfair Display (heading) + Inter (body) |
| **`clamp()`** | Typography responsive trên tiêu đề |

### 2.3 State & Logic

| Công nghệ / Pattern | Vai trò |
|---------------------|---------|
| **React Context API** | Cart state, Auth state toàn app |
| **Custom Hooks** | `useCart`, `useAuth`, `useCarousel`, `useModalA11y` |
| **`useMemo` / `useCallback`** | Tối ưu cart subtotal, sort/filter books |
| **`useSearchParams`** | Filter genre qua URL `?genre=Fiction` |
| **`useParams`** | Slug sách trên trang chi tiết `/books/:slug` |

### 2.4 Tooling

| Công nghệ | Vai trò |
|-----------|---------|
| **ESLint** | Lint code, React Hooks rules |
| **typescript-eslint** | TypeScript lint rules |
| **eslint-plugin-react-hooks** | Kiểm tra hooks |
| **eslint-plugin-react-refresh** | HMR compatibility |

### 2.5 Deploy

| Công nghệ | Vai trò |
|-----------|---------|
| **Vercel** | Hosting static SPA |
| **`vercel.json`** | Rewrite tất cả route về `index.html` (SPA fallback) |

---

## 3. Cấu trúc thư mục

```
testing-testingfrontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.tsx                 # Router + Providers
│   ├── main.tsx                # Entry point
│   ├── index.css               # Import global styles
│   ├── components/             # UI components tái sử dụng
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Layout/
│   │   ├── SignInModal/
│   │   ├── SignUpModal/
│   │   ├── HeroCarousel/
│   │   ├── GenreGrid/
│   │   ├── BookSection/
│   │   ├── BookCard/
│   │   ├── Breadcrumbs/
│   │   ├── SectionHeader/
│   │   └── PromoBanner/
│   ├── pages/                  # Route pages
│   │   ├── HomePage/
│   │   ├── ShopPage/
│   │   ├── ProductDetailPage/
│   │   ├── BagPage/
│   │   └── NotFoundPage/
│   ├── context/                # React Context providers
│   │   ├── CartProvider.tsx
│   │   ├── cartContext.ts
│   │   ├── AuthProvider.tsx
│   │   └── authContext.ts
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useAuth.ts
│   │   ├── useCarousel.ts
│   │   └── useModalA11y.ts
│   ├── data/
│   │   └── siteData.ts         # Mock data: books, genres, nav, hero
│   └── styles/
│       ├── variables.css       # Design tokens
│       └── global.css          # Reset, container, utilities
├── vercel.json                 # SPA rewrite cho deploy
├── vite.config.ts
├── tsconfig.app.json
├── package.json
└── DOCUMENTATION.md            # File này
```

---

## 4. Routing & các trang

| Route | Component | Mô tả |
|-------|-----------|-------|
| `/` | `HomePage` | Trang chủ |
| `/books` | `ShopPage` | Danh sách tất cả sách |
| `/books?genre=Fiction` | `ShopPage` | Lọc theo thể loại (query param) |
| `/books/:slug` | `ProductDetailPage` | Chi tiết sách theo slug |
| `/bag` | `BagPage` | Giỏ hàng |
| `*` (404) | `NotFoundPage` | Trang không tồn tại |

**Layout chung** (`Layout.tsx`): Header + `<main><Outlet /></main>` + Footer + SignInModal + SignUpModal.

**Công nghệ:** `BrowserRouter`, nested `Route`, `Outlet`, `Link`, `useNavigate`, `useParams`, `useSearchParams`, `useLocation`.

---

## 5. Chức năng chi tiết

### 5.1 Trang chủ (`HomePage`)

| Thành phần | Chức năng | Công nghệ |
|------------|-----------|-----------|
| **HeroCarousel** | 3 slide quảng cáo, tự chuyển 6s, nút prev/next, dots | `useCarousel` hook, CSS transition opacity, `Link` CTA |
| **GenreGrid** | 6 thẻ genre, click → `/books?genre=...` | CSS Grid, `Link`, gradient inline style |
| **BookSection × 3** | Featured, Bestsellers, New Arrivals | `BookCard`, CSS Grid 5/4 cột |
| **PromoBanner** | CTA "Join free" → `/#newsletter` | `Link`, Flexbox |

**Tương tác Hero Carousel:**
- Auto-play mỗi 6 giây
- Nút mũi tên trái/phải
- Dots navigation
- Slide không active dùng `<p>` thay `<h1>` (a11y)

---

### 5.2 Header

| Chức năng | Chi tiết | Công nghệ |
|-----------|----------|-----------|
| **Logo** | Link về `/` | `Link`, sticky header |
| **Navigation** | Home, Shop All, Fiction, Mystery, Children, Poetry | `navLinks` từ `siteData`, hamburger menu ≤1024px |
| **Tìm kiếm** | Tìm theo title/author, dropdown 5 kết quả | Controlled input, filter array, `useNavigate` |
| **Search responsive** | Desktop: ô search trên header; Mobile: search trong menu ☰ | 2 instance `SearchField`, shared state, CSS `display` toggle |
| **Sign in / Sign out** | Desktop: nút header; Mobile: trong menu | `AuthContext`, conditional render |
| **Create account** | Chỉ hiện trong menu mobile | `switchToSignUp()` |
| **Bag badge** | Hiển thị số lượng item trong giỏ | `useCart().count`, `Link` → `/bag` |
| **Mobile menu** | Escape đóng, khóa scroll body, scroll menu nếu dài | `useEffect`, `overflow: hidden`, `max-height` |

---

### 5.3 Shop All (`ShopPage`)

| Chức năng | Chi tiết | Công nghệ |
|-----------|----------|-----------|
| **Breadcrumbs** | Home → Books | `Breadcrumbs` component, `Link` |
| **Filter genre** | 9 category: All, Fiction, Mystery, Sci-Fi, Non-fiction, Poetry, Children, Biography, Romance | `useSearchParams`, `filterCategories`, button `aria-pressed` |
| **Sort** | Featured, Price ↑↓, Rating, Newest | `<select>`, `useMemo`, `sortBooks()` |
| **Book grid** | 14 sách, link tới detail | CSS Grid responsive, `BookCard linkToDetail` |
| **Empty state** | "No books match this filter" | Conditional render |
| **Responsive grid** | 5→4→3→2 cột (mobile luôn 2 sản phẩm/hàng) | Media queries `@media` |
| **Filter scroll mobile** | Thanh filter scroll ngang ≤900px | `overflow-x: auto`, `min-width: 0` |

---

### 5.4 Chi tiết sản phẩm (`ProductDetailPage`)

| Chức năng | Chi tiết | Công nghệ |
|-----------|----------|-----------|
| **Dynamic route** | `/books/the-lighthouse-keeper` | `useParams<{ slug }>`, `getBookBySlug()` |
| **Not found** | Slug không hợp lệ → trang lỗi | Conditional render, `Link` back |
| **Cover mock** | Màu nền + title/author (không có ảnh thật) | Inline `backgroundColor`, CSS |
| **Metadata** | Format, Pages, Year, Publisher, Language, ISBN | `<dl>` semantic HTML |
| **Add to bag** | Thêm sách vào giỏ | `useCart().addItem(bookId)` |
| **Wishlist toggle** | Bật/tắt trạng thái (local UI only) | `useState`, `aria-pressed`, SVG heart |
| **Related books** | 2 sách liên quan | `getRelatedBooks()` — map cứng hoặc cùng genre |
| **Breadcrumbs** | Home → Books → [Title] | `Breadcrumbs` |

---

### 5.5 Giỏ hàng (`BagPage`)

| Chức năng | Chi tiết | Công nghệ |
|-----------|----------|-----------|
| **Cart items** | Hiển thị sách đã thêm, cover mock, title link | `useCart().items` + join `catalogBooks` |
| **Quantity** | Tăng/giảm số lượng | `updateQuantity()` — xóa item nếu qty ≤ 0 |
| **Remove** | Xóa sách khỏi giỏ | `removeItem(bookId)` |
| **Order summary** | Subtotal, Shipping (Free), Total | `useMemo` subtotal trong `CartProvider` |
| **Checkout** | Chưa login → mở SignInModal; Đã login → message demo | `useAuth`, derived state `checkoutMessage` |
| **Empty bag** | Link "Shop all books →" | Conditional render, `Link` |
| **Responsive** | 2 cột desktop → stack mobile | CSS Grid / Flexbox media queries |

---

### 5.6 Đăng nhập (`SignInModal`)

| Chức năng | Chi tiết | Công nghệ |
|-----------|----------|-----------|
| **Modal overlay** | Backdrop click đóng, nút × | Fixed position, `role="dialog"`, `aria-modal` |
| **Form** | Email + Password | Controlled inputs, `noValidate` |
| **Validation** | Email regex, password ≥ 6 ký tự | Client-side trong `AuthProvider.signIn()` |
| **Success** | Đóng modal, `isSignedIn = true`, lấy tên từ email | Context state |
| **Create account link** | Chuyển sang SignUpModal | `switchToSignUp()` |
| **A11y modal** | Escape đóng, khóa scroll body | `useModalA11y` hook |

---

### 5.7 Đăng ký (`SignUpModal`)

| Chức năng | Chi tiết | Công nghệ |
|-----------|----------|-----------|
| **Form fields** | Full name, Email, Password, Confirm password | Controlled inputs |
| **Validation** | Tên ≥ 2 ký tự, email hợp lệ, password ≥ 6, confirm khớp | `signUp()` trong `AuthProvider` |
| **Success** | Lưu `userName`, auto sign-in, đóng modal | Context state |
| **Sign in link** | Chuyển về SignInModal | `switchToSignIn()` |
| **CSS** | Tái sử dụng `SignInModal.css` | Shared stylesheet, modifier `--tall` |

---

### 5.8 Footer

| Chức năng | Chi tiết | Công nghệ |
|-----------|----------|-----------|
| **Brand & social** | Logo text, mô tả, icon social (placeholder) | Semantic `<footer>`, CSS Grid |
| **Shop / About / Help links** | Map tới route thật hoặc anchor | `Link`, `footerRouteMap` object |
| **Newsletter** | Email validation, success/error message | Form `onSubmit`, regex, `useState` |
| **Anchor `#newsletter`** | Hero/Promo CTA scroll tới đây | `Layout` hash scroll `useEffect` |

---

### 5.9 BookCard (component dùng chung)

| Chức năng | Chi tiết | Công nghệ |
|-----------|----------|-----------|
| **Cover mock** | Màu + title/author | Inline style |
| **Badge** | BESTSELLER / NEW | Conditional CSS modifier |
| **Add to bag (+)** | Hover hiện nút, không trigger link | `e.stopPropagation()`, `useCart` |
| **Link to detail** | Optional prop `linkToDetail` | `Link` wrap cover + title |
| **Price & rating** | Giá gốc gạch ngang nếu có `originalPrice` | CSS, `formatPrice()` |

---

### 5.10 Trang 404 (`NotFoundPage`)

| Chức năng | Công nghệ |
|-----------|-----------|
| Hiển thị khi URL không khớp route | Catch-all `path="*"` |
| Link về Home và Shop | `Link` |

---

### 5.11 Scroll & Navigation UX

| Chức năng | Công nghệ |
|-----------|-----------|
| Chuyển trang → scroll lên đầu | `Layout` + `useLocation`, `window.scrollTo` |
| Link hash `/#newsletter` → scroll tới section | `document.getElementById`, `scrollIntoView` |
| Mobile menu đóng khi đổi trang | `Header key={location.pathname}` remount |

---

## 6. Quản lý state

### 6.1 Cart (`CartProvider`)

```typescript
interface CartItem {
  bookId: string;
  quantity: number;
}
```

| API | Mô tả |
|-----|-------|
| `addItem(bookId)` | Thêm mới qty=1 hoặc tăng qty nếu đã có |
| `removeItem(bookId)` | Xóa item |
| `updateQuantity(bookId, qty)` | Cập nhật; qty ≤ 0 thì xóa |
| `count` | Tổng số lượng (derived) |
| `subtotal` | Tổng tiền từ `catalogBooks` (derived) |

**Công nghệ:** React Context, `useState`, `useMemo`, `useCallback`.

**Lưu ý:** State mất khi refresh trang (không persist localStorage).

---

### 6.2 Auth (`AuthProvider`)

| State / API | Mô tả |
|-------------|-------|
| `isSignInOpen` / `isSignUpOpen` | Trạng thái modal |
| `isSignedIn` | Đã đăng nhập (mock) |
| `userName` | Tên hiển thị header |
| `openSignIn`, `closeSignIn`, `openSignUp`, `closeSignUp` | Điều khiển modal |
| `switchToSignUp`, `switchToSignIn` | Chuyển modal (đóng modal kia) |
| `signIn(email, password)` | Validate → signed in |
| `signUp(name, email, password, confirm)` | Validate → signed in |
| `signOut()` | Reset auth state |

**Công nghệ:** React Context, `useCallback`.

**Lưu ý:** Không gọi API, không JWT, không lưu session.

---

### 6.3 Custom Hooks

| Hook | File | Mô tả |
|------|------|-------|
| `useCart()` | `hooks/useCart.ts` | Truy cập CartContext, throw nếu thiếu provider |
| `useAuth()` | `hooks/useAuth.ts` | Truy cập AuthContext |
| `useCarousel(total, autoPlayMs)` | `hooks/useCarousel.ts` | Index slide, next/prev/goTo, auto interval |
| `useModalA11y(isOpen, onClose)` | `hooks/useModalA11y.ts` | Escape key + body scroll lock |

---

## 7. Dữ liệu mock

**File:** `src/data/siteData.ts`

| Export | Nội dung |
|--------|----------|
| `catalogBooks` | 14 cuốn sách (id, slug, title, author, price, genre, …) |
| `filterCategories` | 9 thể loại lọc |
| `sortOptions` | 5 tùy chọn sắp xếp |
| `navLinks` | 6 link header |
| `genres` | 6 genre cards homepage |
| `heroSlides` | 3 slide carousel |
| `featuredBooks`, `bestsellerBooks`, `newArrivalBooks` | Subset cho homepage |
| `footerLinks` | Link footer theo nhóm |
| `getBookBySlug(slug)` | Tìm sách theo slug |
| `getRelatedBooks(slug)` | Sách liên quan |

**Interface `Book`:** TypeScript interface đầy đủ field optional (description, pages, isbn, …).

---

## 8. Styling & Responsive

### 8.1 Design tokens (`variables.css`)

| Token | Giá trị | Dùng cho |
|-------|---------|----------|
| `--color-bg` | `#F9F4E8` | Nền chính |
| `--color-text` | `#2D1A12` | Chữ chính |
| `--color-accent` | `#A04020` | CTA, link accent |
| `--color-gold` | `#C5A059` | Badge, sao rating |
| `--font-serif` | Playfair Display | Tiêu đề |
| `--font-sans` | Inter | Body text |
| `--container-max` | `1140px` | Max width container |

### 8.2 Breakpoints chính

| Breakpoint | Thay đổi |
|------------|----------|
| **1024px** | Hamburger menu, search chuyển vào menu, auth trong menu |
| **900px** | Shop filter scroll ngang, toolbar stack |
| **768px** | Shop grid 2 cột, header gap nhỏ hơn |
| **640px** | Ẩn logo text, bag compact |
| **480px** | Shop gap nhỏ hơn |
| **1200px** | Shop grid 4 cột (desktop 5 cột) |

### 8.3 Layout kỹ thuật

- **Flexbox:** Header actions, modal form, book card meta, bag item row
- **Grid:** Shop page, book sections, genre grid, footer
- **`min-width: 0`:** Tránh overflow grid/flex trên mobile
- **`overflow-x: clip`:** Chặn scroll ngang shop page

---

## 9. Accessibility & UX

| Tính năng | Triển khai |
|-----------|------------|
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<dl>` |
| ARIA | `aria-label`, `aria-modal`, `aria-pressed`, `role="dialog"`, `role="listbox"` |
| Keyboard | Escape đóng modal & mobile menu |
| Focus | `:focus-visible` trên links, buttons |
| Screen reader | `.sr-only` cho label ẩn newsletter |
| Single H1 | Product detail & hero carousel chỉ 1 H1 visible |
| Scroll lock | Modal và mobile menu khóa body scroll |

---

## 10. Deploy (Vercel)

**File `vercel.json`:**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Đảm bảo React Router hoạt động khi refresh `/books`, `/bag`, v.v.

**Cấu hình Vercel:**

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## 11. Scripts & lệnh chạy

```bash
# Cài dependency
npm install

# Chạy dev (http://localhost:5173)
npm run dev

# Build production → thư mục dist/
npm run build

# Preview bản build
npm run preview

# Kiểm tra lint
npm run lint
```

---

## Phụ lục: Luồng người dùng chính

```
Trang chủ → Browse genre / Shop All
         → Tìm kiếm header → Chi tiết sách
         → Add to bag → Bag → Checkout
                              ├─ Chưa login → SignInModal
                              │              └─ Create account → SignUpModal
                              └─ Đã login → Message demo thành công
```

---

## Phụ lục: Giới hạn (frontend mock)

- Không có API backend, database, payment gateway
- Auth không persist sau refresh
- Cart không persist sau refresh
- Ảnh bìa sách là mock màu (không upload ảnh)
- Social links, Privacy, Terms là placeholder `#`
- Wishlist chỉ toggle UI local, không lưu

---

*Tài liệu cập nhật theo trạng thái codebase hiện tại của dự án Pages & Co.*
