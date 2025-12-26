// js/db.js - Handles Real-time Data (Firebase)

// --- CONFIGURATION ---
const firebaseConfig = {
    apiKey: "AIzaSyDmjIk8ILpKVp-hXHLBxzIS-0w3W5PAlP0",
    authDomain: "penguin-labs.firebaseapp.com",
    databaseURL: "https://penguin-labs-default-rtdb.firebaseio.com",
    projectId: "penguin-labs",
    storageBucket: "penguin-labs.firebasestorage.app",
    messagingSenderId: "2741037904",
    appId: "1:2741037904:web:7e5ef7a989962fe41d5a55"
};

let app, db;
let __initAttempts = 0;
function __initFirebase(){
    if (typeof firebase === 'undefined') {
        __initAttempts++;
        if (__initAttempts < 20) setTimeout(__initFirebase, 1000);
        return;
    }
    try {
        if (firebase.apps && firebase.apps.length) {
            app = firebase.app();
        } else {
            app = firebase.initializeApp(firebaseConfig);
        }
        db = firebase.database();
        console.log("Firebase initialized");
        try { document.dispatchEvent(new Event('firebase-ready')); } catch(e){}
    } catch (e) {
        __initAttempts++;
        if (__initAttempts < 20) setTimeout(__initFirebase, Math.min(5000, 500 * __initAttempts));
    }
}
__initFirebase();

// --- GLOBAL TRACKING FUNCTIONS ---

// 1. Track Visits (Run on every page load)
function trackVisit() {
    if (!db) return;
    const visitsRef = db.ref('stats/visits');
    visitsRef.transaction((current_value) => {
        return (current_value || 0) + 1;
    });
}

// 2. Track Active Users (Presence System)
function trackPresence() {
    if (!db) return;
    const presenceRef = db.ref('stats/active_users');
    const connectedRef = db.ref('.info/connected');
    
    connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
            // We're connected (or reconnected)!
            const con = presenceRef.push();
            con.onDisconnect().remove();
            con.set(true);
        }
    });
}

// 3. Track Game Click
function trackGameClick(gameTitle) {
    if (!db) return;
    // Sanitize title for DB key (remove illegal chars)
    const safeTitle = gameTitle.replace(/[.#$/[\]]/g, '_');
    const gameRef = db.ref(`stats/games/${safeTitle}`);
    
    gameRef.transaction((current_data) => {
        if (current_data === null) {
            return { count: 1, title: gameTitle };
        } else {
            return { count: (current_data.count || 0) + 1, title: gameTitle }; // Keep original title
        }
    });
}

// 4. Submit Feedback
function submitFeedback(data) {
    if (!db) return;
    const feedbackRef = db.ref('feedback');
    const newPostRef = feedbackRef.push();
    newPostRef.set({
        ...data,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}

// --- DASHBOARD LOGIC (For dev.html) ---
function initDashboard() {
    if (!db) {
        alert("Database not connected. Please configure js/db.js");
        return;
    }

    // A. Listen for Active Users
    db.ref('stats/active_users').on('value', (snap) => {
        const count = snap.numChildren();
        const el = document.getElementById('live-users');
        if(el) el.innerText = count;
    });

    // B. Listen for Total Visits
    db.ref('stats/visits').on('value', (snap) => {
        const count = snap.val() || 0;
        const el = document.getElementById('total-visits');
        if(el) el.innerText = count.toLocaleString();
    });

    // C. Listen for Games Data
    db.ref('stats/games').on('value', (snap) => {
        const data = snap.val() || {};
        const gamesArray = Object.values(data).sort((a, b) => b.count - a.count);
        
        // Update Top Game Widget
        if (gamesArray.length > 0) {
            const top = gamesArray[0];
            const topName = document.getElementById('top-game-name');
            const topCount = document.getElementById('top-game-count');
            if(topName) topName.innerText = top.title;
            if(topCount) topCount.innerText = top.count + " plays";
        }

        // Update List
        const listEl = document.getElementById('games-list');
        if (listEl) {
            listEl.innerHTML = gamesArray.map((g, i) => `
                <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div class="flex items-center gap-4">
                        <span class="text-gray-500 font-mono w-6">#${i+1}</span>
                        <span class="font-bold">${g.title}</span>
                    </div>
                    <span class="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg text-sm font-bold">${g.count}</span>
                </div>
            `).join('');
        }
    });

    // D. Listen for Feedback
    db.ref('feedback').limitToLast(50).on('value', (snap) => {
        const data = snap.val() || {};
        // Convert to array and reverse (newest first)
        const feedbackArray = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
        
        const listEl = document.getElementById('feedback-list');
        if (listEl) {
            if (feedbackArray.length === 0) {
                listEl.innerHTML = '<p class="text-center text-gray-500">No feedback yet.</p>';
                return;
            }
            listEl.innerHTML = feedbackArray.map(f => `
                <div class="p-4 bg-white/5 rounded-xl border border-white/5">
                    <div class="flex justify-between items-start mb-2">
                        <span class="text-blue-400 font-bold text-sm uppercase tracking-wider">${f.type || 'Feedback'}</span>
                        <span class="text-xs text-gray-500">${new Date(f.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p class="text-gray-300 text-sm leading-relaxed">${f.message}</p>
                    ${f.email ? `<p class="text-xs text-gray-600 mt-2 block truncate">${f.email}</p>` : ''}
                </div>
            `).join('');
        }
    });
}

// --- AUTO-INIT ON LOAD ---
function initGlobalTracking() {
    if (typeof firebase !== 'undefined') {
        trackPresence();
        if (!sessionStorage.getItem('visited')) {
            trackVisit();
            sessionStorage.setItem('visited', 'true');
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalTracking);
} else {
    // DOM already loaded (which happens when injected via nav.js)
    initGlobalTracking();
}
