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
        </div>

        <div style="width: 38px;"></div>
    </div>
`;

// This part injects the code into the page automatically
document.body.insertAdjacentHTML('afterbegin', navbarHTML);