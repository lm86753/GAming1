// nav.js - The ONLY file you need to edit to change your navbar
const navbarHTML = `
    <style>
        .navbar-container {
            font-family: 'Inter', sans-serif;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            border-radius: 9999px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 25px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            width: auto;
            min-width: 420px;
        }
        .nav-links-wrapper {
            display: flex;
            gap: 30px;
            padding: 0 20px;
        }
        .nav-item {
            color: rgba(255, 255, 255, 0.8);
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            cursor: pointer;
            border: none;
            background: none;
        }
        .nav-item:hover {
            color: #60a5fa;
            transform: translateY(-1px);
            text-shadow: 0 0 6px rgba(96, 165, 250, 0.35);
        }
        .nav-item i { color: #3b82f6; }
        
        .nav-logo-box {
            width: 38px;
            height: 38px;
            background: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Dropdown Styles */
        .nav-dropdown {
            position: relative;
            display: flex;
            align-items: center;
        }
        .dropdown-menu {
            position: absolute;
            top: 50px;
            left: 0;
            background: rgba(15, 15, 15, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1.5rem;
            padding: 10px;
            min-width: 160px;
            display: none; 
            flex-direction: column;
            gap: 5px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
            animation: fadeIn 0.2s ease-out;
        }
        .dropdown-menu.show { display: flex; }
        
        .dropdown-item {
            padding: 10px 15px;
            border-radius: 12px;
            font-size: 13px;
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.2s;
         }
         .dropdown-item:hover {
            background: rgba(255,255,255,0.05);
            color: white;
            box-shadow: 0 0 10px rgba(59,130,246,0.12);
            transform: translateY(-1px);
         }
         .dropdown-item i { width: 16px; text-align: center; color: #60a5fa; }
 
        .glass:hover {
            border-color: rgba(59, 130, 246, 0.5);
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.12);
            transform: translateY(-1px);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>

    <div class="navbar-container">
        <a href="/index.html" style="display: flex; align-items: center; text-decoration: none;">
            <div class="nav-logo-box">
                <img src="/logo.ico" alt="Logo" style="width:100%; height:100%; object-fit:cover;">
            </div>
        </a>

        <div class="nav-links-wrapper">
            <a href="/projects.html" class="nav-item">
                <i class="fa-solid fa-gamepad"></i> Games
            </a>
            <a href="/about.html" class="nav-item">
                <i class="fa-solid fa-circle-info"></i> About
            </a>
            <a href="/misc.html" class="nav-item">
                <i class="fa-solid fa-cog"></i> Settings
            </a>
            
            <div class="nav-dropdown">
                <button class="nav-item" id="menuBtn">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <div class="dropdown-menu" id="navDropdown">
                    <a href="/feedback.html" class="dropdown-item">
                        <i class="fa-solid fa-comment-dots"></i> Feedback
                    </a>
                    <a href="/dev.html" class="dropdown-item">
                        <i class="fa-solid fa-terminal"></i> Dev Panel
                    </a>
                    <a href="/privacy.html" class="dropdown-item">
                        <i class="fa-solid fa-shield-halved"></i> Privacy
                    </a>
                    <a href="#" class="dropdown-item" id="randomGame">
                        <i class="fa-solid fa-dice"></i> Random Game
                    </a>
                    <a href="/chat.html" class="dropdown-item">
                        <i class="fa-solid fa-comments"></i> Global Chat
                    </a>
                </div>
            </div>
        </div>

    </div>
`;

document.body.insertAdjacentHTML('afterbegin', navbarHTML);

document.addEventListener('click', (e) => {
    const menuBtn = document.getElementById('menuBtn');
    const dropdown = document.getElementById('navDropdown');
    
    if (menuBtn && menuBtn.contains(e.target)) {
        dropdown.classList.toggle('show');
    } else if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

(function(){
    if (window.__panicInstalled) return;
    window.__panicInstalled = true;

    function getPanicKey(){
        var k = null;
        try { k = localStorage.getItem('panicKey'); } catch(e) {}
        if (!k) return '`';
        return String(k).slice(0, 1);
    }

    function getPanicUrl(){
        var u = null;
        try { u = localStorage.getItem('panicUrl'); } catch(e) {}
        if (!u) return 'https://classroom.google.com';
        return String(u);
    }

    function isEditableTarget(target){
        if (!target) return false;
        if (target.isContentEditable) return true;
        var tag = (target.tagName || '').toLowerCase();
        return tag === 'input' || tag === 'textarea' || tag === 'select';
    }

    function triggerPanic(){
        var url = getPanicUrl();
        try { window.location.href = url; } catch(e) {}
    }

    window.triggerPanic = triggerPanic;

    document.addEventListener('keydown', function(e){
        if (!e) return;
        if (e.repeat) return;
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        if (isEditableTarget(e.target)) return;

        var configured = getPanicKey();
        var pressed = e.key;
        if (!pressed) return;

        if (pressed === configured) return triggerPanic();
        if (String(pressed).toLowerCase() === String(configured).toLowerCase()) return triggerPanic();
    }, true);
})();

(function() {
    function load(src, cb){
        const s = document.createElement('script');
        s.src = src;
        if (cb) s.onload = cb;
        document.head.appendChild(s);
    }
    const hasApp = !!document.querySelector('script[src*="firebase-app-compat"]');
    const hasDb = !!document.querySelector('script[src*="firebase-database-compat"]');
    function ensureDbThenInit(){
        if (!hasDb) {
            load("https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js", function(){
                if (!document.querySelector('script[src="/js/db.js"]')) {
                    load("/js/db.js");
                }
            });
        } else {
            if (!document.querySelector('script[src="/js/db.js"]')) {
                load("/js/db.js");
            }
        }
    }
    if (!hasApp) {
        load("https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js", function(){
            ensureDbThenInit();
        });
    } else {
        ensureDbThenInit();
    }
})();

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;

    if (href.includes('fullscreen_system') || href.includes('projects/')) {
        let title = '';
        const card = link.closest('.game-card');
        if (card) {
            title = card.querySelector('p')?.innerText;
        } else {
            try {
                const urlParams = new URLSearchParams(href.split('?')[1]);
                title = urlParams.get('title');
            } catch(e){}
        }
        if (title && typeof trackGameClick === 'function') {
            trackGameClick(title);
        }
    }
});

(function(){
    function computeRepoRoot(){
        var parts = location.pathname.split('/');
        return (parts.length > 2 && parts[1]) ? ('/' + parts[1] + '/') : '/';
    }
    function goToRandomGame(){
        var repoRoot = computeRepoRoot();
        function getRecent(){
            try { return JSON.parse(localStorage.getItem('recentlyPlayed')||'[]'); } catch(e){ return []; }
        }
        function recentTitlesSet(){
            var s = {};
            getRecent().slice(0, 10).forEach(function(r){ if (r && r.title) s[r.title] = true; });
            return s;
        }
        function weightFor(title, counts, recentSet, lastPick){
            var base = 1;
            var c = counts[title] || 0;
            base += Math.log(1 + c);
            if (recentSet[title]) base *= 0.35;
            if (lastPick && lastPick === title) base *= 0.2;
            return Math.max(0.01, base);
        }
        function pickWeighted(list, counts){
            var recentSet = recentTitlesSet();
            var lastPick = null;
            try { lastPick = localStorage.getItem('smartRandomLast') || null; } catch(e){}
            var weights = list.map(function(g){ return weightFor(g.title||'', counts||{}, recentSet, lastPick); });
            var sum = weights.reduce(function(a,b){ return a+b; }, 0);
            if (sum <= 0) return list[Math.floor(Math.random()*list.length)] || {};
            var r = Math.random() * sum;
            var acc = 0;
            for (var i=0;i<list.length;i++){
                acc += weights[i];
                if (r <= acc) return list[i];
            }
            return list[list.length-1] || {};
        }
        function navigateTo(g){
            if (!g) return;
            var raw = g.link || '';
            var isExternal = /^https?:\/\//.test(raw);
            var link = isExternal ? raw : (repoRoot + raw.replace(/^\//,''));
            var wrapper = encodeURIComponent('fullscreen_system (1).html');
            var href = repoRoot + wrapper + '?src=' + encodeURIComponent(link) + '&title=' + encodeURIComponent(g.title||'');
            try {
                if (g.title && typeof trackGameClick === 'function') {
                    trackGameClick(g.title);
                }
                try { localStorage.setItem('smartRandomLast', g.title||''); } catch(e){}
            } catch(e){}
            window.location.href = href;
        }
        fetch(repoRoot + "config/games.json?v=" + Date.now())
        .then(function(r){ return r.json(); })
        .then(function(list){
            if (!Array.isArray(list) || list.length === 0) return;
            function fallback(){
                var g = pickWeighted(list, {});
                navigateTo(g);
            }
            if (typeof firebase !== 'undefined' && typeof firebase.database === 'function') {
                firebase.database().ref('stats/games').once('value').then(function(snap){
                    var counts = {};
                    snap.forEach(function(child){
                        var v = child.val()||{};
                        if (v && v.title) counts[v.title] = v.count || 0;
                    });
                    var g = pickWeighted(list, counts);
                    navigateTo(g);
                }).catch(fallback);
            } else {
                var recent = getRecent();
                var counts = {};
                recent.forEach(function(r){ if (r && r.title) counts[r.title] = (counts[r.title]||0) + 1; });
                var g = pickWeighted(list, counts);
                navigateTo(g);
            }
        })
        .catch(function(){});
    }
    document.addEventListener('click', function(e){
        var btn = e.target.closest('#randomGame');
        if (!btn) return;
        e.preventDefault();
        goToRandomGame();
    });
})();
