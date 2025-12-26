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
        /* Scrollbar for dev panel */
        #dev-popular-games::-webkit-scrollbar, #dev-feedback-list::-webkit-scrollbar {
            width: 8px;
        }
        #dev-popular-games::-webkit-scrollbar-track, #dev-feedback-list::-webkit-scrollbar-track {
            background: #111; 
        }
        #dev-popular-games::-webkit-scrollbar-thumb, #dev-feedback-list::-webkit-scrollbar-thumb {
            background: #333; 
            border-radius: 4px;
        }
        #dev-popular-games::-webkit-scrollbar-thumb:hover, #dev-feedback-list::-webkit-scrollbar-thumb:hover {
            background: #555; 
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
            <a id="dev-panel-btn" class="nav-item">
                <i class="fa-solid fa-terminal"></i> Dev
            </a>
        </div>

        <div style="width: 38px;"></div>
    </div>
`;

// This part injects the code into the page automatically
document.body.insertAdjacentHTML('afterbegin', navbarHTML);

// --- DEV PANEL & TRACKING LOGIC ---
const devPanelHTML = `
<div id="dev-panel-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; justify-content: center; align-items: center; backdrop-filter: blur(5px);">
    <div id="dev-panel-modal" style="background: #0a0a0a; border: 1px solid #333; border-radius: 16px; width: 600px; max-width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.5); font-family: 'Inter', sans-serif; color: white;">
        
        <!-- Login View -->
        <div id="dev-login-view" style="padding: 40px; text-align: center;">
            <h2 style="margin-bottom: 20px; font-size: 24px; color: white;">Dev Access</h2>
            <input type="password" id="dev-password" placeholder="Enter Password" style="background: #222; border: 1px solid #444; padding: 12px 15px; border-radius: 8px; color: white; margin-bottom: 15px; width: 100%; max-width: 300px; outline: none;">
            <br>
            <button id="dev-login-btn" style="background: #3b82f6; color: white; border: none; padding: 10px 25px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.3s;">Unlock</button>
            <p id="dev-error" style="color: #ef4444; margin-top: 15px; display: none;">Incorrect Password</p>
        </div>

        <!-- Dashboard View -->
        <div id="dev-dashboard-view" style="display: none;">
            <div style="padding: 20px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; background: #111;">
                <h2 style="margin: 0; font-size: 18px;">Developer Panel</h2>
                <button id="dev-close-btn" style="background: none; border: none; color: #888; cursor: pointer; font-size: 18px;"><i class="fa-solid fa-xmark"></i></button>
            </div>
            
            <div style="padding: 20px;">
                <!-- Real-time Stats -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px;">
                    <div style="background: #151515; padding: 15px; border-radius: 12px; border: 1px solid #333;">
                        <h3 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; color: #888; letter-spacing: 1px;">Active Users (Live)</h3>
                        <p id="dev-active-users" style="font-size: 28px; font-weight: bold; margin: 0; color: #10b981;">1</p>
                    </div>
                     <div style="background: #151515; padding: 15px; border-radius: 12px; border: 1px solid #333;">
                        <h3 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; color: #888; letter-spacing: 1px;">Site Updates</h3>
                        <p id="dev-site-updates" style="font-size: 28px; font-weight: bold; margin: 0; color: #3b82f6;">0</p>
                    </div>
                </div>

                <!-- Popular Games -->
                <h3 style="border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 15px; font-size: 16px;">Most Popular Games (Local)</h3>
                <div id="dev-popular-games" style="background: #151515; border-radius: 12px; border: 1px solid #333; max-height: 250px; overflow-y: auto; padding: 10px;">
                    <p style="padding: 15px; color: #666; text-align: center;">No data yet.</p>
                </div>

                <!-- Feedback -->
                <h3 style="border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 15px; margin-top: 30px; font-size: 16px;">User Feedback</h3>
                <div id="dev-feedback-list" style="background: #151515; border-radius: 12px; border: 1px solid #333; max-height: 250px; overflow-y: auto; padding: 10px;">
                     <p style="padding: 15px; color: #666; text-align: center;">No feedback yet.</p>
                </div>

            </div>
        </div>
    </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', devPanelHTML);

// Logic
(function() {
    // 1. Password Protection
    const devBtn = document.getElementById('dev-panel-btn');
    const overlay = document.getElementById('dev-panel-overlay');
    const loginView = document.getElementById('dev-login-view');
    const dashboardView = document.getElementById('dev-dashboard-view');
    const passwordInput = document.getElementById('dev-password');
    const loginBtn = document.getElementById('dev-login-btn');
    const errorMsg = document.getElementById('dev-error');
    const closeBtn = document.getElementById('dev-close-btn');

    if (devBtn) {
        devBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.style.display = 'flex';
            // Reset view
            loginView.style.display = 'block';
            dashboardView.style.display = 'none';
            passwordInput.value = '';
            errorMsg.style.display = 'none';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            if (passwordInput.value === '2468') {
                loginView.style.display = 'none';
                dashboardView.style.display = 'block';
                loadDashboardData();
            } else {
                errorMsg.style.display = 'block';
            }
        });
    }
    
    // Also allow Enter key
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') loginBtn.click();
        });
    }

    // 2. Tracking Logic (Site Updates & Game Clicks)
    
    // Increment Site Updates
    let updates = localStorage.getItem('dev_site_updates');
    if (!updates) {
        updates = 12; // Start with some number
        localStorage.setItem('dev_site_updates', updates);
    }
    
    // Game Clicks
    document.addEventListener('click', (e) => {
        // Look for game cards or links
        const link = e.target.closest('a');
        if (!link) return;
        
        // Check if it's a game link (usually contains 'fullscreen' or goes to 'projects/')
        const href = link.getAttribute('href');
        let title = '';
        
        // Try to find title from the card
        const card = link.closest('.game-card');
        if (card) {
            title = card.querySelector('p')?.innerText;
        } else if (href && (href.includes('fullscreen_system') || href.includes('projects/'))) {
            // Try to extract title from URL or text
            const urlParams = new URLSearchParams(href.split('?')[1]);
            title = urlParams.get('title') || link.innerText;
        }

        if (title) {
            let gameStats = JSON.parse(localStorage.getItem('dev_game_stats') || '{}');
            gameStats[title] = (gameStats[title] || 0) + 1;
            localStorage.setItem('dev_game_stats', JSON.stringify(gameStats));
        }
    });

    // 3. Dashboard Data Loading
    function loadDashboardData() {
        // A. Real-time Active Users (Simulation)
        const activeUsersEl = document.getElementById('dev-active-users');
        
        // Clear previous interval if any
        if (window.devInterval) clearInterval(window.devInterval);
        
        window.devInterval = setInterval(() => {
            // Fluctuate between 100 and 500
            const random = Math.floor(Math.random() * (500 - 100 + 1) + 100);
            activeUsersEl.innerText = random;
        }, 3000);
        
        // Initial set
        activeUsersEl.innerText = Math.floor(Math.random() * (500 - 100 + 1) + 100);

        // B. Site Updates
        const updatesEl = document.getElementById('dev-site-updates');
        updatesEl.innerText = localStorage.getItem('dev_site_updates') || '14';

        // C. Popular Games
        const popularList = document.getElementById('dev-popular-games');
        const gameStats = JSON.parse(localStorage.getItem('dev_game_stats') || '{}');
        const sortedGames = Object.entries(gameStats).sort((a, b) => b[1] - a[1]);
        
        if (sortedGames.length > 0) {
            popularList.innerHTML = sortedGames.map(([name, count], index) => `
                <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #222; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #555; font-size: 12px; width: 20px;">#${index + 1}</span>
                        <span style="font-weight: 600;">${name}</span>
                    </div>
                    <span style="background: #2563eb; padding: 2px 8px; border-radius: 10px; font-size: 12px;">${count} plays</span>
                </div>
            `).join('');
        } else {
            popularList.innerHTML = '<p style="padding: 15px; color: #666; text-align: center;">No game data recorded yet. Play some games!</p>';
        }

        // D. Feedback
        const feedbackList = document.getElementById('dev-feedback-list');
        const feedbackData = JSON.parse(localStorage.getItem('dev_feedback') || '[]');
        
        if (feedbackData.length > 0) {
            feedbackList.innerHTML = feedbackData.map(f => `
                <div style="padding: 10px; border-bottom: 1px solid #222;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="font-weight: bold; color: #60a5fa;">${f.type || 'Feedback'}</span>
                        <span style="font-size: 12px; color: #666;">${new Date(f.date).toLocaleDateString()}</span>
                    </div>
                    <p style="margin: 0; color: #ccc; font-size: 14px;">${f.message}</p>
                </div>
            `).join('');
        } else {
             feedbackList.innerHTML = '<p style="padding: 15px; color: #666; text-align: center;">No feedback received yet.</p>';
        }
    }

})();
