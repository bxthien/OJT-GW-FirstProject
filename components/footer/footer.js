// components/footer/footer.js
async function loadFooter() {
  // Tải HTML
  const response = await fetch("./components/footer/footer.html");
  const footerHtml = await response.text();
  document.getElementById("footer").innerHTML = footerHtml;

  // Tạo và thêm CSS
  const footerCss = document.createElement("link");
  footerCss.rel = "stylesheet";
  footerCss.href = "./components/footer/footer.css";
  document.head.appendChild(footerCss);
}

loadFooter();
