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

    const content =
      response.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Lỗi phản hồi từ bot.";
    return content;
  } catch (error) {
    console.error("Error getting response from AI:", error);
    return "Xin lỗi, tôi không thể trả lời ngay bây giờ.";
  } finally {
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
      ? "https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg" // Bot avatar
      : "https://www.w3schools.com/howto/img_avatar.png"; // User avatar
  avatar.alt = "avatar";

  const messageElement = document.createElement("p");
  messageElement.classList.add("typing-effect");
  messageContainer.appendChild(avatar);

  if (sender === "Bot") {
    const markdownHTML = marked.parse(text);
    messageElement.innerHTML = markdownHTML;
  } else {
    let index = 0;
    function typeEffect() {
      if (index < text.length) {
        messageElement.textContent += text[index];
        index++;
        setTimeout(typeEffect, 20);
      }
    }
    typeEffect();
  }

  messageContainer.appendChild(messageElement);
  return messageContainer;
}

// click shortcard
async function handleShortcutClick(prompt) {
  const chatArea = document.querySelector(".chat-bot");
  // const shortcutContainer = document.querySelector(".chat-bot .shortcut-card");

  const userMessageElement = createMessageElement(prompt, "User");
  chatArea.appendChild(userMessageElement);
  const aiResponse = await getResponse(prompt);

  //chatbot response in the chat
  console.log("aiResponse", aiResponse);
  const aiMessageElement = createMessageElement(aiResponse, "Bot");
  chatArea.appendChild(aiMessageElement);

  // remove shortcut card
  document.querySelectorAll(".shortcut-card").forEach((card) => card.remove());
  chatArea.scrollTop = chatArea.scrollHeight;
}

// add shortcut cards
document.getElementById("weatherShortcut").addEventListener("click", () => {
  handleShortcutClick("Weather in DaNang");
});

document.getElementById("newsShortcut").addEventListener("click", () => {
  handleShortcutClick("News Technology");
});

document.querySelector(".chat-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const prompt = event.target.value;
    if (prompt.trim()) {
      handleShortcutClick(prompt);
      event.target.value = "";
    }
  }
});

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
  languageSelect.addEventListener("change", function () {
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

const translations = {
  en: {
    chat_ui: "Chat UI",
    chat_ui2: "Chat UI",
    hey: "Hey, Quang Vu",
    profile_setting: "Profile Setting",
    logout: "Log out",
    submit_button: "Submit",
    type_message: "Type your message here...",
    close: "Close",
    chatbot_name: "Chatbot Name",
    support_bot: "Support Bot",
    chatbot_description:
      "I can assist with queries regarding our services and products.",
    contact: "Contact:",
    contact_support: "Contact Support",
    user_name: "User Name",
    regular_user: "Regular User",
    phone: "Phone:",
    email: "Email:",
    address: "Address:",
    edit_profile: "Edit Profile",
    description: "Description:",
    profile_team: "Profile Team:",
    here: "Here",
  },
  vie: {
    chat_ui: "Giao diện Trò chuyện",
    chat_ui2: "Giao diện Trò chuyện",
    hey: "Chào, Quang Vu",
    profile_setting: "Cài đặt Hồ sơ",
    logout: "Đăng xuất",
    submit_button: "Gửi",
    type_message: "Nhập tin nhắn của bạn ở đây...",
    close: "Đóng",
    chatbot_name: "Tên Chatbot",
    support_bot: "Bot Hỗ Trợ",
    chatbot_description:
      "Tôi có thể hỗ trợ các câu hỏi liên quan đến dịch vụ và sản phẩm của chúng tôi.",
    contact: "Liên hệ:",
    contact_support: "Liên hệ Hỗ Trợ",
    user_name: "Tên Người Dùng",
    regular_user: "Người Dùng Thường",
    phone: "Điện thoại:",
    email: "Email:",
    address: "Địa chỉ:",
    edit_profile: "Chỉnh Sửa Hồ Sơ",
    description: "Mô tả:",
    profile_team: "Nhóm phát triển:",
    here: "Xem"
  },
};

document
  .getElementById("languageSelect")
  .addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    updateUI(selectedLanguage);
  });

function updateUI(language) {
  const elements = document.querySelectorAll(
    "[data-i18n], [data-i18n-placeholder]"
  );

  elements.forEach((element) => {
    const key =
      element.getAttribute("data-i18n") ||
      element.getAttribute("data-i18n-placeholder");
    if (translations[language][key]) {
      if (element.hasAttribute("placeholder")) {
        // Update the placeholder for input fields
        element.placeholder = translations[language][key];
      } else {
        // Update the text content for other elements
        element.textContent = translations[language][key];
      }
    }
  });
}

updateUI("en");

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
document.addEventListener('DOMContentLoaded', function () {
  const selectContainer = document.getElementById('chatbot-select');
  const selectedOption = selectContainer.querySelector('.selected-option');
  const optionsList = selectContainer.querySelector('.options-list');
  
  selectedOption.addEventListener('click', function () {
    optionsList.style.display = optionsList.style.display === 'block' ? 'none' : 'block';
  });

  optionsList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      const selectedText = event.target.innerText;
      const selectedIcon = event.target.querySelector('img').src;
      selectedOption.querySelector('span').innerText = selectedText;
      selectedOption.querySelector('img').src = selectedIcon;
      optionsList.style.display = 'none';
    }
  });

  document.addEventListener('click', function (event) {
    if (!selectContainer.contains(event.target)) {
      optionsList.style.display = 'none';
    }
  });
});



// Lấy username từ session storage
const username = sessionStorage.getItem('username');

// Lắng nghe sự kiện 'click' trên nút "Profile Setting"
document.getElementById('go-to-profile').addEventListener('click', () => {
  // Gửi request đến server để lấy thông tin người dùng
  fetch(`http://localhost:3000/user/${username}`)
    .then(response => response.json())
    .then(user => {
      // Hiển thị thông tin người dùng trong modal
      displayUserProfile(user);
    })
    .catch(error => {
      console.error('Lỗi:', error);
      // Xử lý lỗi
    });
});

// Hàm hiển thị thông tin người dùng trong modal
function displayUserProfile(user) {
  const userProfileModal = document.getElementById('userProfile');
  userProfileModal.querySelector('.avatar').src = user.avatar;
  userProfileModal.querySelector('.user-name').textContent = user.name;
  userProfileModal.querySelector('.user-phone').textContent = user.phone;
  userProfileModal.querySelector('.user-email').textContent = user.email;
  userProfileModal.querySelector('.user-address').textContent = user.address;
  userProfileModal.style.display = 'block'; // Hiển thị modal
}

// Hàm để đóng modal
function closeModal() {
  document.getElementById('userProfile').style.display = 'none';
}



