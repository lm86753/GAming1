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
            <a href="/dev.html" class="nav-item">
                <i class="fa-solid fa-terminal"></i> Dev
            </a>
        </div>

        <div style="width: 38px;"></div>
    </div>
`;

// Inject Navbar
document.body.insertAdjacentHTML('afterbegin', navbarHTML);

// --- GLOBAL TRACKING SCRIPT INJECTION ---
// This ensures every page has access to the tracking logic
(function() {
    // Inject Firebase SDKs if not present
    if (!document.querySelector('script[src*="firebase-app-compat"]')) {
        const appScript = document.createElement('script');
        appScript.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js";
        document.head.appendChild(appScript);
        
        const dbScript = document.createElement('script');
        dbScript.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js";
        document.head.appendChild(dbScript);
        
        // Wait for SDKs to load then inject our db.js
        dbScript.onload = function() {
            const myDbScript = document.createElement('script');
            myDbScript.src = "/js/db.js";
            document.head.appendChild(myDbScript);
        };
    } else {
        // SDKs already there (e.g. dev.html), just ensure db.js is loaded if not
        if (!document.querySelector('script[src="/js/db.js"]')) {
             const myDbScript = document.createElement('script');
            myDbScript.src = "/js/db.js";
            document.head.appendChild(myDbScript);
        }
    }
})();

// Game Click Tracking Logic (Global)
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href) return;

    // Detect if it's a game link
    if (href.includes('fullscreen_system') || href.includes('projects/')) {
        // Try to find title
        let title = '';
        const card = link.closest('.game-card');
        if (card) {
            title = card.querySelector('p')?.innerText;
        } else {
            // URL params fallback
            try {
                const urlParams = new URLSearchParams(href.split('?')[1]);
                title = urlParams.get('title');
            } catch(e){}
        }

        // If found, track it via db.js function
        if (title && typeof trackGameClick === 'function') {
            trackGameClick(title);
        }
    }
});
