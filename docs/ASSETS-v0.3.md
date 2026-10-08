# v0.3 結尾素材

- `dist/assets/girl-walk-v1.png`：內建 image_gen，透明四幀橫向行走表；參考既有 `reunion-0.png`。完整 PNG 保留，遊戲用來源矩形讀取四幀。
- `dist/assets/ending-reunion-v1.mp4`：第一版動畫 `first-version.mp4` 的 8.45–15 秒；384×216、30 FPS、H.264、無聲，網頁以最近鄰顯示。
- `dist/assets/reunion-0.png` 至 `reunion-5.png`：原擁抱姿勢，亦用於影片無法播放時的備援。
- 以上兩個新檔採用既有分片保存方式，Cloudflare build 以 SHA-256 校驗後還原；未修改既有音樂內容。

## 行走素材生成提示

Create a production game sprite sheet derived from the reference woman. Use case: identity-preserve, game animation asset. Reference is the exact established character identity and 16-bit pixel art style. Keep her brown chin-length bob hair, kind youthful face, brick-red long-sleeve top, blue jeans, beige sneakers and cream shoulder bag. Change her pose to STANDING AND WALKING TOWARD THE LEFT (profile/three-quarter left), full body visible. Output exactly FOUR consecutive walking poses in ONE HORIZONTAL ROW, on a genuinely transparent background. Each pose occupies an equal-width cell, same scale and baseline, centered with generous transparent padding; all heads and shoes fully inside their cells, no touching between figures. Four clear phases: left leg forward contact, passing legs, right leg forward contact, passing legs. Natural modest arm swing, warm smile, looking to the left toward her dog. No dog in any frame. Pixel clusters, warm sunset palette, crisp pixel outlines matching original sprite, avoid smooth painted rendering. No labels, text, grid lines, shadows, floor or additional objects. Asset will be displayed around 130 pixels tall beside the existing pixel-art corgi. Wide horizontal 4:1 sprite-strip composition.

## Safari 事件處理參考

- [Apple：Handling Events](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)
- [WebKit：iOS 長按放大鏡與 user-select 討論](https://bugs.webkit.org/show_bug.cgi?id=231161)

原則：限制在遊戲區，保留選單按鈕的原生 click；遊戲按鍵由 Pointer Events 處理，Touch/Gesture 事件只取消預設瀏覽器行為。未採用全頁禁止縮放的 viewport 設定。自動化事件測試不等於 iPhone 實機驗證。
