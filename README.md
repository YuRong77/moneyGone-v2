# moneygone-v2

大花錢是一個功能豐富的記帳應用，專為管理個人財務而設計。此專案為前端部分，採用現代化技術，提供高效能與良好的使用者體驗。

---

## 🌟 專案簡介

大花錢的主要功能包括：

- **使用者管理**：登入、註冊與重設密碼
- **記帳功能**：快速記錄日常支出與收入
- **數據分析**：查看記帳紀錄與圖表分析
- **個人化設置**：設置使用者資料與多國語系切換
- **分類管理**：新增、編輯與刪除分類
- **圖片處理**：圖片壓縮上傳與刪除
- **使用者操作**：整合 Google Tag Manager (GTM) 與 Google Analytics (GA)，並透過 Partytown 移至 Web Worker 執行

---

## 🛠️ 使用技術

### 前端框架

- **Vue 3**：採用 Composition API 提供更靈活的開發方式
- **Vite**：快速的開發伺服器與建置工具
- **TypeScript**：靜態型別檢查，提升程式碼品質
- **Element Plus**：高效能的 UI 元件庫

### 圖表與數據處理

- **ApexCharts**：互動式圖表
- **Lodash**：實用的資料處理工具
- **Date-fns**：日期處理函式庫

### 狀態管理與路由

- **Pinia**：簡單易用的狀態管理工具
- **Vue Router**：路由管理，支援動態載入

### 多國語系

- **Vue I18n**：多語言支援，輕鬆切換語系

### 圖片處理

- **Browser Image Compression**：前端圖片壓縮，提升效能

### 效能優化

- **Partytown**：將 GTM 與 GA 移至 Web Worker 執行，減少主執行緒負擔

### 測試工具

- **Vitest**：單元測試框架
- **Cypress**：端到端測試框架

### 其他工具

- **Prettier**：程式碼格式化
- **ESLint**：程式碼品質檢查
- **Sass**：CSS 預處理器
- **GH Pages**：快速部署靜態網站

---

## 🚀 快速開始

### 安裝依賴

```sh
npm install
```

### 啟動開發伺服器

```sh
npm run dev
```

### 建置專案

```sh
npm run build
```

### 執行單元測試

```sh
npm run test:unit
```

### 執行端到端測試

```sh
npm run cy:run
```

### 自動修復程式碼格式

```sh
npm run lint
```

---

## 📊 測試與覆蓋率

- 使用 **Vitest** 進行單元測試，確保程式碼穩定性
- 使用 **Cypress** 進行端到端測試，模擬使用者操作
- 覆蓋率報告可透過以下指令生成：

```sh
npm run coverage
```

---

## 📂 專案結構

```plaintext
src/
├── apis/            # api模組
├── components/      # 共用元件
├── layouts/         # 頁面佈局
├── locales/         # 多國語系檔案
├── router/          # 路由設定
├── store/           # 狀態管理
├── views/           # 頁面元件
└── assets/          # 靜態資源
```

---

## 🔗 相關連結

- [Vue 官方網站](https://vuejs.org/)
- [Vite 官方網站](https://vitejs.dev/)
- [Element Plus 官方網站](https://element-plus.org/)
- [Vitest 官方網站](https://vitest.dev/)
- [Cypress 官方網站](https://www.cypress.io/)
