// --- 設定歌曲清單 (以後加歌只要改這裡！) ---
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
// ⬇️ 以後有新歌，複製上面一行改掉內容即可 ⬇️
// { title: "新歌名", file: "新檔案.html", icon: "🎵" },

];

// ==========================================
// 1. 自動注入 App 設定 (PWA & iOS)
// ==========================================
function injectAppMeta() {
    if (!document.head) return;
    
    // PWA Manifest
    const linkManifest = document.createElement('link');
    linkManifest.rel = 'manifest';
    linkManifest.href = 'manifest.json';
    document.head.appendChild(linkManifest);

    // iOS Web App Capable
    const metaApple = document.createElement('meta');
    metaApple.name = 'apple-mobile-web-app-capable';
    metaApple.content = 'yes';
    document.head.appendChild(metaApple);

    // iOS Icon
    const linkIcon = document.createElement('link');
    linkIcon.rel = 'apple-touch-icon';
    linkIcon.href = 'icon.png';
    document.head.appendChild(linkIcon);
}
injectAppMeta();

// ==========================================
// 2. 自動加入「回首頁」按鈕 (新增功能 ✨)
// ==========================================
function addHomeButton() {
    // 取得目前的檔名
    const currentFile = window.location.pathname.split("/").pop();
    
    // 如果目前「不是」首頁 (index.html 或 空白)，才加入按鈕
    if (currentFile !== "index.html" && currentFile !== "") {
        const topBar = document.querySelector('.top-bar');
        if (topBar) {
            // 建立按鈕 HTML
            const homeBtnHtml = `
                <a href="index.html" class="home-btn" style="text-decoration: none; margin-right: auto;">
                    <span style="font-size: 20px; filter: grayscale(1);">🏠</span>
                </a>
            `;
            // 插入到 Top Bar 的最前面
            topBar.insertAdjacentHTML('afterbegin', homeBtnHtml);
        }
    }
}
// 等網頁載入後執行
document.addEventListener('DOMContentLoaded', addHomeButton);


// ==========================================
// 3. 產生選單 HTML
// ==========================================
const currentPath = window.location.pathname.split("/").pop(); 
let menuItemsHTML = "";

songs.forEach(song => {
    const isActive = currentPath === song.file ? "active" : "";
    menuItemsHTML += `
        <a href="${song.file}" class="menu-item ${isActive}">
            <span>${song.icon}</span> ${song.title}
        </a>
    `;
});

const menuHTML = `
    <div class="fab-container">
        <div class="song-menu" id="songMenu">
            <div class="menu-header">Playlist</div>
            ${menuItemsHTML}
        </div>
        <button class="fab-btn" onclick="toggleMenu()">🎵</button>
    </div>
`;

if (document.body) {
    document.body.insertAdjacentHTML('beforeend', menuHTML);
}

// 選單開關
function toggleMenu() {
    const menu = document.getElementById('songMenu');
    if (menu) menu.classList.toggle('open');
}

// 點擊外部關閉選單
document.addEventListener('click', function(event) {
    const menu = document.getElementById('songMenu');
    const btn = document.querySelector('.fab-btn');
    if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
        menu.classList.remove('open');
    }
});

// ==========================================
// 4. 🛡️ 強力防複製 & CSS 優化
// ==========================================

document.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p'))) {
        e.preventDefault();
        e.stopPropagation();
    }
}, false);

const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent;
    }
    body { overscroll-behavior-y: none; }
    input, textarea { -webkit-user-select: text !important; user-select: text !important; }
    
    /* 回首頁按鈕樣式 */
    .home-btn {
        padding: 8px;
        border-radius: 50%;
        transition: 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .home-btn:hover {
        background-color: rgba(0,0,0,0.05);
    }
    body.dark-mode .home-btn:hover {
        background-color: rgba(255,255,255,0.1);
    }
`;
document.head.appendChild(styleSheet);
