import { GoogleGenerativeAI } from "@google/generative-ai";

function formatHTMLResponse(htmlString) {
  return pretty(htmlString, { ocd: true });
}

// Khởi tạo AI model
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let history = [];
let isSending = false;

async function getResponse(prompt) {
  const button = document.querySelector(".button-submit");

  // Kích hoạt loading
  button.classList.add("loading");

  // Kích hoạt loading và xóa văn bản của nút
  button.classList.add("loading");
  try {
    const chat = await model.startChat({});
    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    // Kiểm tra và lấy mã HTML từ response JSON
    const content =
      response.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Lỗi phản hồi từ bot.";
    return content;
  } catch (error) {
    console.error("Error getting response from AI:", error);
    return "Xin lỗi, tôi không thể trả lời ngay bây giờ.";
  } finally {
    // Tắt loading khi kết thúc
    button.classList.remove("loading");
  }
}

function createMessageElement(text, sender) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add(sender.toLowerCase());

  const avatar = document.createElement("img");
  avatar.className = "avatar";
  avatar.src =
    sender.toLowerCase() === "bot"
      ? "https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg" // Avatar bot
      : "https://www.w3schools.com/howto/img_avatar.png"; // Avatar người dùng
  avatar.alt = "avatar";

  const messageElement = document.createElement("p");
  messageElement.classList.add("typing-effect");
  messageContainer.appendChild(avatar);

  let index = 0;
  function typeEffect() {
    if (index < text.length) {
      messageElement.textContent += text[index];
      index++;
      setTimeout(typeEffect, 40); // Điều chỉnh tốc độ gõ
    }
  }
  typeEffect();
  messageContainer.appendChild(messageElement);

  return messageContainer;
}

async function handleSubmit(event) {
  event.preventDefault();
  if (isSending) return;
  isSending = true;

  const userMessageInput = document.querySelector(".chat-input input");
  const chatArea = document.querySelector(".chat-bot");
  const prompt = userMessageInput.value.trim();

  if (prompt === "") {
    isSending = false;
    return;
  }

  // Hiển thị tin nhắn của người dùng
  const userMessageElement = createMessageElement(prompt, "User");
  chatArea.appendChild(userMessageElement);
  userMessageInput.value = "";

  // Nhận phản hồi từ AI và kiểm tra nếu là HTML
  const aiResponse = await getResponse(prompt);

  // Hiển thị tin nhắn của bot
  const aiMessageElement = createMessageElement(aiResponse, "Bot");
  chatArea.appendChild(aiMessageElement);

  // Cập nhật lịch sử chat
  history.push({ role: "user", parts: [prompt] });
  history.push({ role: "model", parts: [aiResponse] });

  chatArea.scrollTop = chatArea.scrollHeight; // Cuộn tới phần tin nhắn mới nhất
  isSending = false;
}

document
  .querySelector(".chat-input button")
  .addEventListener("click", handleSubmit);
document
  .querySelector(".chat-input input")
  .addEventListener("keyup", (event) => {
    if (event.key === "Enter") handleSubmit(event);
  });

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

  dropdownButton.addEventListener("click", () => {
    dropdownContent.style.opacity =
      dropdownContent.style.opacity === "0" ? "1" : "0";
  });

  document.addEventListener("click", (event) => {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownContent.contains(event.target)
    ) {
      dropdownContent.style.opacity = "0";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const containerIcon = document.querySelector(".container-icon");
  const sidebar = document.querySelector(".sidebar");

  containerIcon.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
});

// Event listener to handle dropdown and language switcher interactions
document.addEventListener("DOMContentLoaded", function () {

  const languageSelect = document.getElementById("languageSelect");

  // Set initial background flag
  setFlagBackground(languageSelect);

  // Event listener to change language
  languageSelect.addEventListener("change", function() {
    const selectedLang = languageSelect.value;
    setFlagBackground(languageSelect);
    changeLanguage(selectedLang);
  });

  // Function to set the background flag image based on selected language
  function setFlagBackground(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const flagUrl = selectedOption.getAttribute("data-flag");


    selectElement.style.backgroundImage = `url('${flagUrl}')`;
    selectElement.style.backgroundSize = "17px";
    selectElement.style.backgroundRepeat = "no-repeat";
    selectElement.style.backgroundPosition = "5px center";
  }
  

  function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("active");
  }

  document.addEventListener("click", function (event) {
    const sidebar = document.querySelector(".sidebar");
    const toggleButton = document.querySelector(".container-icon");

    if (
      !sidebar.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      sidebar.classList.remove("active");
    }
  });

  const containerIcon = document.querySelector(".container-icon");
  containerIcon.addEventListener("click", () => {
    containerIcon.classList.toggle("active");
  });

  const sidebar = document.querySelector(".sidebar");
  containerIcon.addEventListener("click", () => {
    containerIcon.classList.toggle("active");
    sidebar.style.display = "flex";
  });

});
document.addEventListener("DOMContentLoaded", () => {
  const chatbotProfile = document.getElementById("chatbotProfile");
  const userProfile = document.getElementById("userProfile");
  const closeButtons = document.querySelectorAll(".close-button");

  // Event listener for Profile Setting and Chat UI
  document
    .querySelector('[data-i18n="profile_setting"]')
    .addEventListener("click", () => {
      userProfile.style.display = "block";
      chatbotProfile.style.display = "none";
    });

  document
    .querySelector('[data-i18n="chat_ui"]')
    .addEventListener("click", () => {
      chatbotProfile.style.display = "block";
      userProfile.style.display = "none";
    });

  // Close modals when close button is clicked
  closeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.target.parentElement.style.display = "none";
    });
  });

  // Close modals when clicking outside of modal content
  window.onclick = function (event) {
    if (event.target.classList.contains("modal-content")) {
      event.target.style.display = "none";
    }
  };
});

const buttonCloseSidebar = document.getElementsByClassName("close-sidebar")[0];
const sidebarClass = document.getElementsByClassName("sidebar")[0];

if (buttonCloseSidebar) {
  buttonCloseSidebar.addEventListener("click", (e) => {
    if (sidebarClass) {
      sidebarClass.classList.toggle("active");
    }
  });
}



// --------DARKMODE------------
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Initial icon set to moon
  darkModeToggle.innerHTML = `
       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                  <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/>
              </svg>
  `;

  darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Change the icon based on dark mode status
      if (document.body.classList.contains("dark-mode")) {
          darkModeToggle.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                  <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"/>
              </svg>
          `;
      } else {
          darkModeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                  <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/>
              </svg>
              
          `;
      }
  });
});
