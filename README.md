# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

src/
│
├── app/
│   ├── App.jsx
│   ├── main.jsx
│   ├── router.jsx
│   └── providers.jsx
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── features/
│   ├── auth/
│   ├── products/
│   ├── categories/
│   ├── brands/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── payments/
│   ├── wishlist/
│   ├── reviews/
│   ├── profile/
│   ├── addresses/
│   ├── search/
│   └── admin/
│
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ThemeContext.jsx
│
├── hooks/
│
├── lib/
│   ├── api.js
│   ├── auth.js
│   └── fetcher.js
│
├── services/
│
├── utils/
│
├── constants/
│
├── config/
│
├── styles/
│
└── index.css