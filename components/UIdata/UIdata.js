// Import custom CSS (UIcard.css)
const UIdataCSS = document.createElement('link');
UIdataCSS.rel = 'stylesheet';
UIdataCSS.href = 'UIdata.css';
document.head.appendChild(UIdataCSS);

// Dữ liệu mẫu cho các câu hỏi và câu trả lời
const data = {
    "weather": "Today is sunny.",
    "how are you": "I'm fine",
    "name": "I'm your AI assistant.",
    "joke": "Why did the computer go to the doctor? Because it had a virus!",
};

// Hàm lấy câu trả lời dựa trên câu hỏi nhập vào
function getAnswer() {
    const questionInput = document.getElementById("question").value.toLowerCase();
    const answerOutput = document.getElementById("answer");

    // Tìm câu trả lời dựa trên từ khóa
    let answerFound = "No answer found for this question.";
    for (let key in data) {
        if (questionInput.includes(key)) {
            answerFound = data[key];
            break;
        }
    }
    
    answerOutput.value = answerFound;
}
