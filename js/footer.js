document.addEventListener("DOMContentLoaded", function() {
    const footerHTML = `
    <footer class="py-12 border-t border-white/5 text-center text-gray-400 text-sm">
        <div class="max-w-2xl mx-auto px-6">
            <div class="flex flex-wrap justify-center gap-6 mb-6 font-semibold">
                <a href="/about.html" class="hover:text-blue-400 transition-colors">About</a>
                <a href="/feedback.html" class="hover:text-blue-400 transition-colors">Feedback</a>
                <a href="/privacy.html" class="hover:text-blue-400 transition-colors">Privacy Policy</a>
            </div>
            <div class="glass p-4 rounded-2xl mb-6 inline-block">
                <p>&copy; 2025 <span class="gradient-text font-bold">Penguin Labs</span>. All rights reserved.</p>
            </div>
            <p class="text-xs text-gray-600">
                Penguin Labs is a collection of tools and games for educational and research purposes.
            </p>
        </div>
    </footer>
    `;

    // This finds the end of the body and injects the footer
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});