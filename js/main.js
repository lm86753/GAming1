console.warn(
  "%cHello!!",
  "color: red; font-weight: 600; background: yellow; padding: 0 5px; border-radius: 5px",
  "Feel free to use anything you find here for your projects; credit is appreciated but not required! Visit my website at https://3kh0.net for more information."
);

// --- GLOBAL PANIC BUTTON LOGIC ---
// This runs on every page that loads this script
window.addEventListener('keydown', function(e) {
    const savedKey = localStorage.getItem('panicKey') || '`'; // Default to backtick
    const savedUrl = localStorage.getItem('panicUrl') || 'https://classroom.google.com';
    
    // If the pressed key matches the saved key, redirect instantly
    if (e.key === savedKey) {
        window.location.href = savedUrl;
    }
});

// Ad settings
var adStatus = localStorage.getItem("adConsent") === "true"; 

if (!adStatus) {
  (function () {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5756835229788588";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    console.log("Ads enabled, thank you for your support!");
  })();
}

// Analytics script
const script = document.createElement("script");
script.src = "https://data.3kh0.net/script.js";
script.defer = true;
script.setAttribute("data-website-id", "47d72bde-ba44-4125-b161-00e0c2f5b7f0");
document.head.appendChild(script);
script.onload = function() {
  console.log("Data script loaded");
  if (typeof umami !== 'undefined') {
    umami.track([location.hostname, "pageview"].join("/"));
  }
};

// Tab Cloaker Persistence
const local_title = localStorage.getItem("title");
const local_icon = localStorage.getItem("icon");
if (window.localStorage.hasOwnProperty("title")) {
  document.title = local_title;
}
if (window.localStorage.hasOwnProperty("icon")) {
  const iconLink = document.querySelector("link[rel*='icon']");
  if (iconLink) {
    iconLink.href = local_icon;
  }
}

// Path correction for repository subfolders
document.addEventListener('DOMContentLoaded', function(){
  var parts = location.pathname.split('/');
  var repoRoot = (parts.length > 2 && parts[1]) ? ('/' + parts[1] + '/') : '/';
  
  document.querySelectorAll('a[href^="/"]').forEach(function(a){
    var h = a.getAttribute('href') || '';
    if (/^https?:\/\//i.test(h)) return;
    if (h.indexOf(repoRoot) === 0) return;
    a.setAttribute('href', repoRoot + h.replace(/^\//,''));
  });
});