// Initialize i18next
i18next.init({
    lng: 'en', // default language
    resources: {
        en: {
            translation: {
                welcome: "Welcome",
                howAreYou: "How are you?",
                example: "This is a example."
            }
        },
        vie: {
            translation: {
                welcome: "Chào mừng",
                howAreYou: "Bạn khỏe không?",
                example: "Đây là ví dụ."
            }
        }
    }
}, function(err, t) {
    // Initialize translations
    updateContent();
});

// Update content based on selected language
function updateContent() {
    const listItems = document.querySelectorAll('#text-list li');

    listItems.forEach(item => {
        const key = item.getAttribute('data-key');
        item.textContent = i18next.t(key);
    });
}

// Show or hide language options when clicked
const langMenu = document.querySelector('.lang-menu');
const langOptions = document.getElementById('lang-options');
const selectedLang = document.getElementById('selected-lang');
const flagIcon = document.getElementById('flag-icon');

// Show options when the selected language is clicked
selectedLang.addEventListener('click', function() {
    langOptions.style.display = langOptions.style.display === 'block' ? 'none' : 'block';
});

// Change language and update flag/icon when a language is selected
const options = langOptions.querySelectorAll('a');

options.forEach(option => {
    option.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior

        const selectedValue = this.getAttribute('data-value');
        const flagSrc = this.getAttribute('data-flag');

        // Update the displayed text and flag
        selectedLang.innerHTML = `<img id="flag-icon" src="${flagSrc}" alt="flag" /> ${this.textContent}`;

        // Change language and update content
        i18next.changeLanguage(selectedValue, () => {
            updateContent(); // Update the displayed content
        });

        // Hide language options after selection
        langOptions.style.display = 'none'; // Hide dropdown right after selection
    });
});

// Initial load
window.onload = function() {
    updateContent();
};
