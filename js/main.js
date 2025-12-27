console.warn(
  "%cHello!!",
  "color: red; font-weight: 600; background: yellow; padding: 0 5px; border-radius: 5px",
  "Feel free to use anything you find here for your projects; credit is appreciated but not required! Visit my website at https://3kh0.net for more information."
);

// this setting controls if ads are shown,
// more info on the README.md file
var adStatus = localStorage.getItem("adConsent") === "true"; // default: true

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

const script = document.createElement("script");
script.src = "https://data.3kh0.net/script.js";
script.defer = true;
script.setAttribute("data-website-id", "47d72bde-ba44-4125-b161-00e0c2f5b7f0");
document.head.appendChild(script);
script.onload = function() {
  console.log("Data script loaded");
  umami.track([location.hostname, "pageview"].join("/"));
};

const local_title = localStorage.getItem("title");
const local_icon = localStorage.getItem("icon");
if (window.localStorage.hasOwnProperty("title")) {
  document.title = local_title;
  console.log("Title set to: " + local_title);
}
if (window.localStorage.hasOwnProperty("icon")) {
  document.querySelector("link[rel=icon]").href = local_icon;
  console.log("Icon set to: " + local_icon);
}
 

document.addEventListener('DOMContentLoaded', function(){
  var parts = location.pathname.split('/');
  var repoRoot = (parts.length>2 && parts[1]) ? ('/' + parts[1] + '/') : '/';
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="/"]'), function(a){
    var h = a.getAttribute('href') || '';
    if (/^https?:\/\//i.test(h)) return;
    if (h.indexOf(repoRoot) === 0) return;
    a.setAttribute('href', repoRoot + h.replace(/^\//,''));
  });
  Array.prototype.forEach.call(document.querySelectorAll('link[rel="icon"][href^="/"]'), function(l){
    var h = l.getAttribute('href') || '';
    if (h.indexOf(repoRoot) === 0) return;
    l.setAttribute('href', repoRoot + h.replace(/^\//,''));
  });
});
