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



// Event listener to handle dropdown and language switcher interactions
document.addEventListener("DOMContentLoaded", function() {
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
        type_message: "Type your message here..."
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
        type_message: "Nhập tin nhắn của bạn ở đây..."
      }
    };

    document.querySelector('[data-i18n="chat_ui"]').textContent = translations[lang].chat_ui;
    document.querySelector('[data-i18n="menu_templates"]').textContent = translations[lang].menu_templates;
    document.querySelector('[data-i18n="menu_projects"]').textContent = translations[lang].menu_projects;
    document.querySelector('[data-i18n="menu_other_pages"]').textContent = translations[lang].menu_other_pages;
    document.querySelector('[data-i18n="upgrade"]').textContent = translations[lang].upgrade;
    document.querySelector('[data-i18n="upgrade_btn"]').textContent = translations[lang].upgrade_btn;
    document.querySelector('[data-i18n="hey"]').textContent = translations[lang].hey;
    document.querySelector('[data-i18n="profile_setting"]').textContent = translations[lang].profile_setting;
    document.querySelector('[data-i18n="logout"]').textContent = translations[lang].logout;
    document.querySelector('[data-i18n="submit_button"]').textContent = translations[lang].submit_button;
    document.querySelector('[data-i18n-placeholder="type_message"]').placeholder = translations[lang].type_message;
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const chatbotProfile = document.getElementById("chatbotProfile");
  const userProfile = document.getElementById("userProfile");
  const closeButtons = document.querySelectorAll(".close-button");

  // Event listener for Profile Setting and Chat UI
  document.querySelector('[data-i18n="profile_setting"]').addEventListener("click", () => {
      userProfile.style.display = "block";
      chatbotProfile.style.display = "none";
  });

  document.querySelector('[data-i18n="chat_ui"]').addEventListener("click", () => {
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







loadChatbot();