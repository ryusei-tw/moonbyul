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
];

// --- 1. 產生選單 HTML ---
const currentPath = window.location.pathname.split("/").pop(); // 取得目前檔名
let menuItemsHTML = "";

songs.forEach(song => {
    // 判斷是否為當前頁面，如果是就加上 active 樣式
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

// 2. 將選單插入網頁底部
if (document.body) {
    document.body.insertAdjacentHTML('beforeend', menuHTML);
}

// 3. 選單開關功能
function toggleMenu() {
    const menu = document.getElementById('songMenu');
    if (menu) menu.classList.toggle('open');
}

// 4. 點擊外部關閉選單
document.addEventListener('click', function(event) {
    const menu = document.getElementById('songMenu');
    const btn = document.querySelector('.fab-btn');
    // 確保元素存在才執行判斷 (避免報錯)
    if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
        menu.classList.remove('open');
    }
});

// ==========================================
// 🛡️ 防複製保護機制 (保護你的心血)
// ==========================================

// 1. 禁止滑鼠右鍵
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 2. 禁止鍵盤快捷鍵 (Ctrl+C, Ctrl+U, F12 等)
document.addEventListener('keydown', function(e) {
    // 擋住 F12
    if (e.key === 'F12') {
        e.preventDefault();
    }
    // 擋住 Ctrl 組合鍵
    if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p')) {
        e.preventDefault();
    }
});

// 3. 透過 CSS 禁止選取文字 (注入樣式)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    body {
        -webkit-user-select: none; /* Chrome/Safari */
        -moz-user-select: none;    /* Firefox */
        -ms-user-select: none;     /* IE/Edge */
        user-select: none;         /* 標準語法 */
    }
    /* 讓輸入框還是可以打字 (如果有輸入框的話) */
    input, textarea {
        -webkit-user-select: auto;
        user-select: auto;
    }
`;
document.head.appendChild(styleSheet);
