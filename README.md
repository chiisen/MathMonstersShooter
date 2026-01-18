# Math Monsters Shooter (數學怪物射手)

## 📖 專案概述 (Project Overview)
這是一個結合數學教育與射擊遊戲的瀏覽器應用程式。玩家駕駛飛船，透過計算加減法題目來發射子彈，擊退不斷來襲的數字怪物。目標是提供國小低年級學生一個充滿趣味的計算練習環境。

## 🛠 技術架構 (Technical Stack)
- **Core Framework**: Vue 3 + Vite
- **Rendering**: HTML5 Canvas (用於高效能粒子與遊戲渲染)
- **Styling**: Vanilla CSS (Neon Space 風格)
- **Audio**: Web Audio API (零依賴音效)
- **State Management**: Vue Reactivity API

## 🏗 模組架構 (Architecture)
```
src/
├── assets/          # 靜態資源 (Images, Sounds)
├── logic/           # 純 JS 遊戲核心
│   ├── GameEngine.js    # 遊戲主循環 (Loop) & 狀態管理
│   ├── EntityManager.js # 實體管理 (Player, Monsters, Bullets)
│   ├── MathSystem.js    # 數學題目生成與驗證
│   └── Collision.js     # 碰撞偵測系統
├── components/      # Vue UI 組件
│   ├── GameCanvas.vue   # 遊戲畫面渲染層
│   ├── GameHUD.vue      # 抬頭顯示器 (Score, HTML Overlay)
│   ├── AnswerPanel.vue  # 互動控制板
│   └── StartScreen.vue  # 遊戲入口
└── App.vue          # 主容器
```

## 🎨 視覺風格 (Visual Aesthetics)
- **Theme**: Neon Space (霓虹太空)
- **Palette**: Deep Space Blue (#0B0F29) 背景，搭配 Neon Cyan (#00F3FF) 與 Magenta (#FF00FF) 強調色。
- **Effects**: 粒子爆炸、光暈 (Glow)、毛玻璃 (Glassmorphism) UI。

## ✅ 實作計畫 (Implementation Plan)

### Phase 1: Initialization & Foundation
- [x] 初始化 Vue 3 + Vite 專案
- [x] 設定基礎 CSS 變數 (Design Tokens) 與全域樣式
- [x] 建立專案目錄結構 (logic, components, assets)

### Phase 2: Core Logic Implementation
- [x] 實作 `MathSystem.js` (題目生成邏輯)
- [x] 實作 `GameEngine.js` (基礎 Loop 與 Canvas setup)
- [x] 實作 `EntityManager.js` (怪物生成與移動)

### Phase 3: UI & Interaction
- [x] 建立 `GameCanvas.vue` 整合 Canvas
- [x] 建立 `AnswerPanel.vue` (底部互動按鈕)
- [x] 串接射擊邏輯與碰撞偵測

### Phase 4: Polish & Effects
- [x] 加入粒子爆炸與發光特效
- [x] 加入音效處理 (Web Audio API)
- [x] 優化 UI 動畫與轉場 (Start Screen, Game Over)

---
*Created by Antigravity Assistant*
Math Monsters Shooter 國小一年級加減法遊戲練習
