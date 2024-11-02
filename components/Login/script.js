document.addEventListener("DOMContentLoaded", function () {
  fetch("components/login/login.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("login-component").innerHTML = data;
      loadLoginScript();
    })
    .catch((error) => console.error("Lỗi khi tải component đăng nhập:", error));


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

});

function loadLoginScript() {
  const script = document.createElement("script");
  script.src = "components/Login/login.js";
  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("login-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      let users = JSON.parse(localStorage.getItem("users"));

      if (!users) {
        fetch("../../data/user.json")
          .then((response) => response.json())
          .then((data) => {
            users = data.user;
            localStorage.setItem("users", JSON.stringify(users));
          })
          .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
      } else {
        authenticateUser(users, username, password);
      }
    });
});

function authenticateUser(users, username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    alert(`Chào mừng, ${user.name}!`);
    window.location.href = "../../index.html";
  } else {
    alert("Sai mật khẩu hoặc tên đăng nhập!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");

  darkModeToggle.innerHTML = `
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/>
                </svg>
    `;

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

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

async function loadNavbar() {
  const response = await fetch("./components/Login/login.html");
  const LoginHtml = await response.text();
  document.getElementById("login-page").innerHTML = LoginHtml;

  const LoginCss = document.createElement("link");
  LoginCss.rel = "stylesheet";
  LoginCss.href = "./components/Login/login.css";
  document.head.appendChild(LoginCss);
}



const translations = {
  en: {
    leftSection_title: "First Projects: Proposal for Chatbot Application Using Gemini API",
    leftSection_subtitle: "Create a chatbot gpt using python language what will be step for that",
    chatResponse_description: "In today's digital landscape, chatbots have become essential tools for enhancing customer engagement and automating responses. This proposal outlines the development of a chatbot application leveraging the Gemini API, designed to improve user experience and operational efficiency",
    chatResponse_signature: "From Vipers Teams With Love",
    messageInput_placeholder: "Reply...",
    signupTitle: "Login with free trial",
    signupSubtitle: "Experience now with us",
    usernameLabel: "User Name*",
    usernamePlaceholder: "Enter User Name",
    passwordLabel: "Password*",
    passwordPlaceholder: "Enter Password",
    getStartedButton: "Get started free",
    noAccountText: "Already haven't an account?",
    registerLink: "Register",
    orText: "Or better yet...",
    googleLogin: "Continue with Google",
    appleLogin: "Continue with Apple",
  },
  vie: {
    leftSection_title: "Dự án đầu tiên: Đề xuất ứng dụng Chatbot sử dụng Gemini API",
    leftSection_subtitle: "Tạo một chatbot GPT bằng ngôn ngữ Python, các bước để thực hiện là gì?",
    chatResponse_description: "Trong bối cảnh kỹ thuật số hiện nay, chatbot đã trở thành công cụ thiết yếu để tăng cường tương tác khách hàng và tự động hóa phản hồi. Đề xuất này mô tả việc phát triển một ứng dụng chatbot sử dụng Gemini API, được thiết kế để cải thiện trải nghiệm người dùng và nâng cao hiệu quả hoạt động.",
    chatResponse_signature: "Gửi tình yêu từ Vipers Team",
    messageInput_placeholder: "Phản hồi...",
    signupTitle: "Đăng nhập miễn phí",
    signupSubtitle: "Hãy trải nghiệm ngay cùng chúng tôi",
    usernameLabel: "Tên người dùng*",
    usernamePlaceholder: "Nhập tên người dùng",
    passwordPlaceholder: "Nhập mật khẩu",
    passwordLabel: "Mật khẩu*",
    getStartedButton: "Bắt đầu miễn phí",
    noAccountText: "Chưa có tài khoản?",
    registerLink: "Đăng ký",
    orText: "Hoặc tốt hơn...",
    googleLogin: "Tiếp tục với Google",
    appleLogin: "Tiếp tục với Apple"
  },  
};

document.getElementById("languageSelect").addEventListener("change", function() {
  const selectedLanguage = this.value;
  updateUI(selectedLanguage); // Update the text when language changes
});

function updateUI(language) {
  const elements = document.querySelectorAll("[data-i18n], [data-i18n-placeholder]");
  
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n") || element.getAttribute("data-i18n-placeholder");
    if (translations[language][key]) {
      if (element.hasAttribute("placeholder")) {
        element.placeholder = translations[language][key];
      } else {
        element.textContent = translations[language][key];
      }
    }
  });
}

updateUI("en"); 

loadNavbar();
