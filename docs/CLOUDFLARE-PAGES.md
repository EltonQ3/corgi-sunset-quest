# Cloudflare Pages 部署

此專案是完整靜態遊戲，只需執行內建 Node.js 素材還原腳本，無需安裝套件或後端。

1. Cloudflare Dashboard → Workers & Pages → Create application → Pages。
2. Import an existing Git repository，選 `EltonQ3/corgi-sunset-quest`。
3. 按下列設定部署：

| 設定 | 值 |
| --- | --- |
| Production branch | main |
| Framework preset | None |
| Build command | node scripts/build-assets.mjs |
| Build output directory | dist |
| Root directory | 留空（倉庫根目錄） |
| Environment variables | 不需要 |

首次部署完成後，使用 Cloudflare 顯示的實際 pages.dev 網址，不要假設專案名一定對應未被占用的網址。

後續推送 main 時，Git 整合會自動重新部署。PR 可用預覽部署試玩。

## 確認項目

- 首頁能開始遊戲，角色與背景不缺圖。
- 點「開始冒險」後能播放配樂；音訊需使用者操作啟動。
- 街區／BOSS／重逢有正確曲目，音量滑桿有效。
- 手機至少測試 Safari 和 Chrome 的多指操作。

存檔位於各瀏覽器的 localStorage；原試玩站的存檔不會自動搬到新的 Pages 網域。

官方說明：https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
