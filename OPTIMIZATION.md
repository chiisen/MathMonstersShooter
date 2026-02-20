# 優化建議 (Optimization Suggestions)

## 效能優化

| 項目 | 說明 | 優先度 | 狀態 |
|------|------|--------|------|
| **圖片預載入** | 遊戲開始前應該預先載入所有圖片，避免第一隻怪物顯示延遲 | 高 | ✅ 已完成 |
| **減少 measureText 呼叫** | `spawnMonster()` 每次生成都測量文字寬度，可快取字體尺寸 | 中 | ✅ 已完成 |
| **粒子隨機數快取** | `draw()` 中 `Math.random()` 每幀執行，應在生成時決定 | 低 | ⏳ 待處理 |
| **目標怪物快取** | `getClosestMonster()` 在多處重複呼叫，可維護一份快取 | 中 | ⏳ 待處理 |

## 功能改進

| 項目 | 說明 | 優先度 | 狀態 |
|------|------|--------|------|
| **怪物圖片錯誤處理** | `monsterImage` 缺少 `onerror` 回調 | 中 | ✅ 已完成 |
| **音效開關預設** | 應記錄使用者靜音偏好至 localStorage | 低 | ⏳ 待處理 |
| **觸覺回饋** | 移動裝置可加入震動 API (`navigator.vibrate`) | 低 | ⏳ 待處理 |
| **連續答對顯示** | 可加入 Combo 顯示增加成就感 | 中 | ⏳ 待處理 |

## 程式碼品質

| 項目 | 說明 | 優先度 | 狀態 |
|------|------|--------|------|
| **魔法數字** | `60 * this.scaleFactor`、`200`、`2500` 等應設為類別常數 | 中 | ✅ 已完成 |
| **遊戲結束後未重置** | 重新開始時 `monsterImage` 未重新載入（目前只會在第一次 constructor 時載入） | 高 | ⏳ 待處理 |

---

## 已完成項目實作細節

### 圖片預載入

```javascript
async start(settings = {}) {
    await this.preloadImages(); // 等待圖片載入完成
    // ... 遊戲邏輯
}
```

### 常數抽離

```javascript
class GameEngine {
    static PLAYER_SAFE_ZONE = 60;
    static BASE_SPAWN_INTERVAL = 2500;
    static MIN_SPAWN_INTERVAL = 1000;
    static BASE_GAP = 200;
    static MIN_GAP = 90;
    static BULLET_BASE_RADIUS = 5;
    static BULLET_MAX_RADIUS = 25;
    // ...
}
```

---

*Last updated: 2026-02-20*
