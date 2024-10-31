// Import Bootstrap CSS
const bootstrapLink = document.createElement('link');
bootstrapLink.rel = 'stylesheet';
bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
document.head.appendChild(bootstrapLink);

// Import Bootstrap Icons
const Cardicon = document.createElement('link');
Cardicon.rel = 'stylesheet';
Cardicon.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.5.0/font/bootstrap-icons.min.css';
document.head.appendChild(Cardicon);

// Import custom CSS (UIcard.css)
const UIcardCSS = document.createElement('link');
UIcardCSS.rel = 'stylesheet';
UIcardCSS.href = 'UIcard.css';
document.head.appendChild(UIcardCSS);
