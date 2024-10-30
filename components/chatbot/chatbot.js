import { GoogleGenerativeAI } from "@google/generative-ai";
import pretty from 'pretty-html';

// Hàm định dạng HTML trước khi hiển thị
function formatHTMLResponse(htmlString) {
  return pretty(htmlString, { ocd: true });
}

// Khởi tạo AI model
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let history = [];
let isSending = false; // Biến để kiểm soát trạng thái gửi tin

// Hàm nhận phản hồi từ AI
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


// Hàm tạo một phần tử tin nhắn
function createMessageElement(text, sender) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add(sender.toLowerCase());

  const avatar = document.createElement('img');
  avatar.className = 'avatar';
  avatar.src = 'https://www.w3schools.com/howto/img_avatar.png'; // Thay thế bằng URL avatar của bạn
  avatar.alt = 'avatar';

  const messageElement = document.createElement('p');
  messageElement.textContent = text; // Hiển thị text thông thường

  messageContainer.appendChild(avatar);
  messageContainer.appendChild(messageElement);
  
  return messageContainer;
}

// Xử lý khi gửi tin nhắn
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

// Sự kiện 'click' và 'Enter' cho button và input
document.querySelector(".chat-input button").addEventListener("click", handleSubmit);
document.querySelector(".chat-input input").addEventListener("keyup", (event) => {
  if (event.key === "Enter") handleSubmit(event);
});

// Sự kiện DOMContentLoaded cho dropdown
document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownContent = document.getElementById("dropdownContent");

  dropdownButton.addEventListener("click", () => {
    dropdownContent.style.opacity = dropdownContent.style.opacity === "0" ? "1" : "0";
  });

  document.addEventListener("click", (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
      dropdownContent.style.opacity = "0";
    }
  });
});

// Chọn phần tử nút container-icon
const containerIcon = document.querySelector('.container-icon');
// Lắng nghe sự kiện click trên nút
containerIcon.addEventListener('click', () => {
    // Thêm hoặc xóa lớp 'active' để xoay mũi tên
    containerIcon.classList.toggle('active');
});

// Thêm toggle cho sidebar
const sidebar = document.querySelector('.sidebar');
containerIcon.addEventListener('click', () => {
    containerIcon.classList.toggle('active');
    sidebar.style.display = "flex"
});

//day la cai nut dong
// containerIcon.addEventListener('click', () => {
//     
//     sidebar.style.display = "none"
// });
