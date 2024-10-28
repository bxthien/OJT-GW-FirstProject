// components/sidebar/sidebar.js
async function loadSidebar() {
  // Tải HTML của sidebar
  const response = await fetch("./components/sidebar/sidebar.html");
  const sidebarHtml = await response.text();
  document.getElementById("sidebar").innerHTML = sidebarHtml;

  // Tạo và thêm CSS cho sidebar
  const sidebarCss = document.createElement("link");
  sidebarCss.rel = "stylesheet";
  sidebarCss.href = "./components/sidebar/sidebar.css";
  document.head.appendChild(sidebarCss);

  // Thêm sự kiện click cho nút thu gọn
  const toggleButton = document.getElementById("toggleSidebar");
  const sidebar = document.querySelector(".sidebar");

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
}

loadSidebar();
