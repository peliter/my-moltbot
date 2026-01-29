# 《槓桿人生：房產模擬器》 (Leverage Life)

這是一款使用 Next.js 開發的 Web 遊戲，模擬在 30 年內透過房產投資達成資產最大化的財務模擬器。

## 🚀 快速啟動

在 GitHub Codespaces 中，執行以下指令：

```bash
npm install
npm run dev
```

啟動後，前端將運行在 `3000` 端口。

## 🛠 技術棧

- **框架:** Next.js 14+ (App Router)
- **語言:** TypeScript
- **樣式:** Tailwind CSS
- **狀態管理:** Zustand
- **圖標:** Lucide React

## 📖 遊戲機制

- **初始資金:** 1,000,000 TWD
- **財務模型:** 包含房貸利率計算、本息平均攤還、LTV 監控。
- **目標:** 透過精確的財務槓桿，在退休前累積最大化淨資產。

## 📂 目錄結構

- `src/types/game.ts`: 遊戲核心資料類型。
- `src/store/useGameStore.ts`: 遊戲邏輯與狀態管理。
- `src/components/FinanceDashboard.tsx`: 財務儀表板組件。
- `src/lib/finance-utils.ts`: 房貸與財務計算公式。

---
Developed by Pi (小派) 🥧
