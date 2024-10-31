import { GoogleGenerativeAI } from "@google/generative-ai";
import pretty from 'pretty-html';

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
    const content = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "Lỗi phản hồi từ bot.";
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
  const messageContainer = document.createElement('div');
  messageContainer.classList.add(sender.toLowerCase());

    const avatar = document.createElement('img');
  avatar.className = 'avatar';
  avatar.src = sender.toLowerCase() === 'bot'
    ? 'https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg' // Avatar bot
    : 'https://www.w3schools.com/howto/img_avatar.png'; // Avatar người dùng
  avatar.alt = 'avatar';

  const messageElement = document.createElement('p');
  messageElement.textContent = text; // Hiển thị text thông thường

  messageContainer.appendChild(avatar);
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

document.querySelector(".chat-input button").addEventListener("click", handleSubmit); 
document.querySelector(".chat-input input").addEventListener("keyup", (event) => {
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
const containerIcon = document.querySelector('.container-icon');
// Lắng nghe sự kiện click trên nút
containerIcon.addEventListener('click', () => {
    // Thêm hoặc xóa lớp 'active' để xoay mũi tên
    containerIcon.classList.toggle('active');
});

// Event listener to handle dropdown and language switcher interactions
document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("languageSelect");

  setFlagBackground(languageSelect);

  languageSelect.addEventListener("change", function () {
    const selectedLang = languageSelect.value;
    setFlagBackground(languageSelect);
    changeLanguage(selectedLang);
  });

  function setFlagBackground(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const flagUrl = selectedOption.getAttribute("data-flag");

    selectElement.style.backgroundImage = `url('${flagUrl}')`;
    selectElement.style.backgroundSize = "17px";
    selectElement.style.backgroundRepeat = "no-repeat";
    selectElement.style.backgroundPosition = "5px center";
  }
  langOptions.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      const newLang = e.target.dataset.value;
      const newFlag = e.target.dataset.flag;

      selectedLang.innerHTML = `<img id="flag-icon" src="${newFlag}" alt="flag" /> ${
        newLang === "en" ? "English" : "Vietnamese"
      }`;

      changeLanguage(newLang);
    }
    langOptions.style.display = "none";
  });

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

  function changeLanguage(lang) {
    const translations = {
      en: {
        chat_ui: "Chat UI",
        menu_templates: "All Templates",
        menu_projects: "My Projects",
        menu_other_pages: "Other Pages",
        upgrade: "Go unlimited with PRO",
        upgrade_btn: "Upgrade",
        hey: "Hey, Quang Vu",
        profile_setting: "Profile Setting",
        logout: "Logout",
        submit_button: "Submit",
        type_message: "Type your message here...",
      },
      vie: {
        chat_ui: "Giao diện trò chuyện",
        menu_templates: "Tất cả Mẫu",
        menu_projects: "Dự án của tôi",
        menu_other_pages: "Trang khác",
        upgrade: "Nâng cấp không giới hạn với PRO",
        upgrade_btn: "Nâng cấp",
        hey: "Chào, Quang Vu",
        profile_setting: "Cài đặt hồ sơ",
        logout: "Đăng xuất",
        submit_button: "Nhập",
        type_message: "Nhập tin nhắn của bạn ở đây...",
      },
    };

    document.querySelector('[data-i18n="chat_ui"]').textContent =
      translations[lang].chat_ui;
    document.querySelector('[data-i18n="menu_templates"]').textContent =
      translations[lang].menu_templates;
    document.querySelector('[data-i18n="menu_projects"]').textContent =
      translations[lang].menu_projects;
    document.querySelector('[data-i18n="menu_other_pages"]').textContent =
      translations[lang].menu_other_pages;
    document.querySelector('[data-i18n="upgrade"]').textContent =
      translations[lang].upgrade;
    document.querySelector('[data-i18n="upgrade_btn"]').textContent =
      translations[lang].upgrade_btn;
    document.querySelector('[data-i18n="hey"]').textContent =
      translations[lang].hey;
    document.querySelector('[data-i18n="profile_setting"]').textContent =
      translations[lang].profile_setting;
    document.querySelector('[data-i18n="logout"]').textContent =
      translations[lang].logout;
    document.querySelector('[data-i18n="submit_button"]').textContent =
      translations[lang].submit_button;
    document.querySelector(
      '[data-i18n-placeholder="type_message"]'
    ).placeholder = translations[lang].type_message;
  }
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
      sidebarClass.style.display = "none";
    }
  });
}
