// Import custom CSS (UIcard.css)
const UIdataCSS = document.createElement('link');
UIdataCSS.rel = 'stylesheet';
UIdataCSS.href = 'UIdata.css';
document.head.appendChild(UIdataCSS);

// Mảng lưu trữ dữ liệu đầu vào
const trainingData = [];

// Hàm thêm cặp câu hỏi-trả lời vào mảng và hiển thị trên UI
function addData() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;
    
    if (question && answer) {
        // Thêm cặp dữ liệu vào mảng
        trainingData.push({ question, answer });
        
        // Hiển thị dữ liệu đã nhập vào danh sách
        const DataList = document.getElementById("DataList");
        const listItem = document.createElement("li");
        listItem.textContent = `Q: ${question} - A: ${answer}`;
        DataList.appendChild(listItem);
        
        // Xóa các ô nhập liệu
        document.getElementById("trainingForm").reset();
    } else {
        alert("Please enter both a question and an answer.");
    }
}
