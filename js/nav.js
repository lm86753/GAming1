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
            right: 0;
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
        }
        .dropdown-item i { width: 16px; text-align: center; color: #60a5fa; }

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
                </div>
            </div>
        </div>

        <div style="width: 38px;"></div>
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

(function() {
    if (!document.querySelector('script[src*="firebase-app-compat"]')) {
        const appScript = document.createElement('script');
        appScript.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js";
        document.head.appendChild(appScript);
        
        const dbScript = document.createElement('script');
        dbScript.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js";
        document.head.appendChild(dbScript);
        
        dbScript.onload = function() {
            const myDbScript = document.createElement('script');
            myDbScript.src = "/js/db.js";
            document.head.appendChild(myDbScript);
        };
    } else {
        if (!document.querySelector('script[src="/js/db.js"]')) {
             const myDbScript = document.createElement('script');
            myDbScript.src = "/js/db.js";
            document.head.appendChild(myDbScript);
        }
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

        // Save to Recently Played (Local Storage)
        if (title) {
            let imgSrc = '';
            if (card) {
                const img = card.querySelector('img');
                if (img) imgSrc = img.src;
            }

            if (imgSrc) {
                const recentGame = {
                    title: title,
                    href: href,
                    img: imgSrc,
                    timestamp: Date.now()
                };
                
                let recent = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
                // Remove duplicates
                recent = recent.filter(g => g.title !== title);
                 // Add to front
                 recent.unshift(recentGame);
                // Limit stored history
                recent = recent.slice(0, 50);
                 
                 localStorage.setItem('recentlyPlayed', JSON.stringify(recent));
             }
         }
     }
});
