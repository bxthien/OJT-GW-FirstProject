// Import Bootstrap CSS
const bootstrapLink = document.createElement('link');
bootstrapLink.rel = 'stylesheet';
bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
document.head.appendChild(bootstrapLink);


// Import custom CSS (UIcard.css)
const UIcardCSS = document.createElement('link');
UIcardCSS.rel = 'stylesheet';
UIcardCSS.href = 'UIcard.css';
document.head.appendChild(UIcardCSS);
