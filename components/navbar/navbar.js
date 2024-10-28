// components/navbar/navbar.js
async function loadNavbar() {
  // Tải HTML
  const response = await fetch("./components/navbar/navbar.html");
  const navbarHtml = await response.text();
  document.getElementById("navbar").innerHTML = navbarHtml;

  // Tạo và thêm CSS
  const navbarCss = document.createElement("link");
  navbarCss.rel = "stylesheet";
  navbarCss.href = "./components/navbar/navbar.css";
  document.head.appendChild(navbarCss);
}

loadNavbar();
