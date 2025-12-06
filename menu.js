// --- 設定歌曲清單 (加歌只要改這裡) ---
const songs = [
    { title: "S.O.S", file: "sos.html", icon: "💿" },
    { title: "Goodbyes and Sad Eyes", file: "goodbyesandsadeyes.html", icon: "🫧" },
    { title: "ICY BBY", file: "icybby.html", icon: "🧊" },
    { title: "Is This Love?", file: "isthislove.html", icon: "💘" },
    { title: "PRESENT", file: "present.html", icon: "🎁" },
    { title: "Eclipse", file: "eclipse.html", icon: "🌑" },    
    { title: "LUNATIC", file: "lunatic.html", icon: "👻" },
    { title: "Absence", file: "absence.html", icon: "☁️" },
    { title: "Think About", file: "thinkabout.html", icon: "💭" },
    { title: "C.I.T.T", file: "citt.html", icon: "🧀" },
    { title: "TOUCHIN&MOVIN", file: "touchinmovin.html", icon: "💃" },
    { title: "Memories", file: "memories.html", icon: "🎞️" },
    { title: "Attention Seeker", file: "attentionseeker.html", icon: "📢" },
    { title: "My moon", file: "mymoon.html", icon: "🌙" },
    { title: "愛你但說不出口", file: "aini.html", icon: "🎧" },
    // ⬇️ 以後有新歌，複製上面一行改掉內容即可 ⬇️
    // { title: "新歌名", file: "新檔案.html", icon: "🎵" },
];

// ==========================================
// 1. 自動注入 App 設定
// ==========================================
function injectAppMeta() {
    if (!document.head) return;
    if (!document.querySelector('link[rel="manifest"]')) {
        const link = document.createElement('link'); link.rel = 'manifest'; link.href = 'manifest.json'; document.head.appendChild(link);
    }
    if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
        const meta = document.createElement('meta'); meta.name = 'apple-mobile-web-app-capable'; meta.content = 'yes'; document.head.appendChild(meta);
    }
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
        const link = document.createElement('link'); link.rel = 'apple-touch-icon'; link.href = 'icon.png'; document.head.appendChild(link);
    }
}
injectAppMeta();

// ==========================================
// 2. 自動加入回首頁按鈕 & 更新 Footer
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 2-1. 回首頁按鈕 (黑白房子)
    const currentFile = window.location.pathname.split("/").pop();
    if (currentFile !== "index.html" && currentFile !== "" && !document.querySelector('.home-btn')) {
        const topBar = document.querySelector('.top-bar');
        if (topBar) {
            const homeBtnHtml = `<a href="index.html" class="home-btn" style="text-decoration: none; margin-right: auto;"><span style="font-size: 20px; filter: grayscale(1);">🏠</span></a>`;
            topBar.insertAdjacentHTML('afterbegin', homeBtnHtml);
        }
    }

    // 2-2. 更新 Footer (文星伊&流星版)
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.innerHTML = `
            <p style="margin-bottom: 10px; font-weight: bold;">Create for 문별&별똥별</p>
            <p style="font-size: 10px; opacity: 0.6; line-height: 1.6; margin: 0;">
                本網站為粉絲自製，非官方應用程式。<br>
                內容僅供個人學習與應援使用，<br>
                嚴禁商業用途或未經授權的修改與轉載。<br>
                (空耳部分由 Gemini 協助製作)
            </p>
        `;
    }
});

// ==========================================
// 3. 產生「底部滑出選單 (Bottom Sheet)」 HTML
// ==========================================
const currentPath = window.location.pathname.split("/").pop(); 
let menuItemsHTML = "";

songs.forEach(song => {
    const isActive = currentPath === song.file ? "active" : "";
    // 這裡改用 sheet-item 樣式
    menuItemsHTML += `
        <a href="${song.file}" class="sheet-item ${isActive}">
            <span class="sheet-icon">${song.icon}</span> 
            <span class="sheet-text">${song.title}</span>
            ${isActive ? '<span>🎵</span>' : ''} 
        </a>
    `;
});

const sheetHTML = `
    <div class="sheet-overlay" id="sheetOverlay" onclick="toggleMenu()"></div>
    
    <div class="bottom-sheet" id="bottomSheet">
        <div class="sheet-handle-bar"><div class="sheet-handle"></div></div>
        <div class="sheet-header-title">Playlist (${songs.length})</div>
        <div class="sheet-content">
            ${menuItemsHTML}
        </div>
    </div>

    <div class="fab-container">
        <button class="fab-btn" onclick="toggleMenu()">🎵</button>
    </div>
`;

// 插入 HTML (防止重複插入)
if (document.body && !document.querySelector('.bottom-sheet')) {
    document.body.insertAdjacentHTML('beforeend', sheetHTML);
}

// ==========================================
// 4. 選單開關功能
// ==========================================
function toggleMenu() {
    const overlay = document.getElementById('sheetOverlay');
    const sheet = document.getElementById('bottomSheet');
    if (overlay && sheet) {
        overlay.classList.toggle('show');
        sheet.classList.toggle('show');
    }
}

// ==========================================
// 5. 注入 CSS (Bottom Sheet 樣式 + 防護)
// ==========================================
if (!document.getElementById('app-style')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'app-style';
    styleSheet.innerHTML = `
        /* --- 全域防護設定 --- */
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent;
        }
        input, textarea { -webkit-user-select: text !important; user-select: text !important; }
        
        /* --- 回首頁按鈕 --- */
        .home-btn { padding: 8px; border-radius: 50%; display: flex; align-items: center; opacity: 0.7; }
        .home-btn:hover { background-color: rgba(0,0,0,0.05); opacity: 1; }
        body.dark-mode .home-btn:hover { background-color: rgba(255,255,255,0.1); }
        
        /* --- FAB 按鈕 --- */
        .fab-container { position: fixed; bottom: 32px; left: 24px; z-index: 200; }
        .fab-btn {
            width: 64px; height: 64px; border-radius: 24px;
            background-color: var(--fab-bg); color: #fff;
            border: none; box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            font-size: 28px; display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: transform 0.2s;
        }
        .fab-btn:active { transform: scale(0.9); }

        /* --- 遮罩層 (Overlay) --- */
        .sheet-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.5); z-index: 201;
            opacity: 0; visibility: hidden; transition: 0.3s;
            backdrop-filter: blur(2px);
        }
        .sheet-overlay.show { opacity: 1; visibility: visible; }

        /* --- 底部面板 (Bottom Sheet) --- */
        .bottom-sheet {
            position: fixed; bottom: 0; left: 0; width: 100%;
            max-height: 70vh; /* 最大高度 */
            background-color: var(--menu-bg);
            border-radius: 24px 24px 0 0;
            z-index: 202;
            transform: translateY(100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex; flex-direction: column;
            box-shadow: 0 -5px 30px rgba(0,0,0,0.2);
        }
        .bottom-sheet.show { transform: translateY(0); }

        /* --- 面板內部元件 --- */
        .sheet-handle-bar { padding: 12px 0; display: flex; justify-content: center; }
        .sheet-handle { width: 40px; height: 5px; background: #ddd; border-radius: 10px; }
        .sheet-header-title { text-align: center; font-weight: bold; margin-bottom: 10px; color: var(--text-color); opacity: 0.5; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
        
        .sheet-content {
            overflow-y: auto; /* 允許滑動 */
            padding: 0 20px 40px 20px;
            overscroll-behavior: contain;
        }

        /* --- 歌曲選項樣式 --- */
        .sheet-item {
            display: flex; align-items: center;
            padding: 16px; margin-bottom: 8px;
            background-color: transparent;
            color: var(--text-color);
            text-decoration: none;
            border-radius: 16px;
            font-weight: 600;
            font-size: 16px;
            transition: 0.2s;
        }
        .sheet-item:active { background-color: rgba(0,0,0,0.05); transform: scale(0.98); }
        .sheet-icon { margin-right: 15px; font-size: 20px; }
        .sheet-text { flex: 1; }
        
        /* 選中狀態 */
        .sheet-item.active {
            background-color: var(--bg-color);
            color: var(--fab-bg);
            border: 1px solid var(--fab-bg);
        }
        body.dark-mode .sheet-item.active {
            background-color: rgba(255,255,255,0.1);
        }
    `;
    document.head.appendChild(styleSheet);
}

// 禁止 F12 等快捷鍵
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && ['c','u','s','p'].includes(e.key))) {
        e.preventDefault(); e.stopPropagation();
    }
});
