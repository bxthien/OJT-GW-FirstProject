async function loadChatbot() {
  // Tải HTML
  const response = await fetch("./components/chatbot/chatbot.html");
  const chatbotHtml = await response.text();
  document.getElementById("chatbot").innerHTML = chatbotHtml;

  // Tạo và thêm CSS
  const chatbotCss = document.createElement("link");
  footerCss.rel = "stylesheet";
  footerCss.href = "./components/chatbot/chatbot.css";
  document.head.appendChild(chatbotCss);
}


document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownContent = document.getElementById("dropdownContent");

  // Thêm sự kiện 'click' để toggle hiển thị dropdown
  dropdownButton.addEventListener("click", () => {
    // Toggle display giữa block và none
    dropdownContent.style.opacity = dropdownContent.style.opacity === "0" ? "1" : "0";
  });

  // Ẩn dropdown khi click ra bên ngoài
  document.addEventListener("click", (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
      dropdownContent.style.opacity = "0";
    }
  });
});

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

loadChatbot();