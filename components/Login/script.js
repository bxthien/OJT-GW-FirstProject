document.addEventListener("DOMContentLoaded", function () {
  fetch("components/login/login.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("login-component").innerHTML = data;
      loadLoginScript();
    })
    .catch((error) => console.error("Lỗi khi tải component đăng nhập:", error));
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

loadNavbar();
