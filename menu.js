// --- 設定歌曲清單 (以後加歌只要改這裡！) ---
const songs = [
    { title: "S.O.S", file: "sos.html", icon: "💿" },
    { title: "Goodbyes and Sad Eyes", file: "goodbyesandsadeyes.html", icon: "🫧" },
    { title: "ICY BBY", file: "icybby.html", icon: "🧊" },
    { title: "Is This Love?", file: "isthislove.html", icon: "💘" },
    { title: "PRESENT", file: "present.html", icon: "🎁" },
    // ⬇️ 以後有新歌，複製上面一行改掉內容即可 ⬇️
    // { title: "新歌名", file: "新檔案.html", icon: "🎵" },
];

// --- 以下程式碼不用動 ---

// 1. 產生選單 HTML
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
document.body.insertAdjacentHTML('beforeend', menuHTML);

// 3. 選單開關功能
function toggleMenu() {
    document.getElementById('songMenu').classList.toggle('open');
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
