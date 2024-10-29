// Get elements for Chatbot
const chatbotButton = document.getElementById("chatbotButton");
const chatbotModal = document.getElementById("chatbotModal");
const closeChatbotButton = chatbotModal.querySelector(".close-button");

// Get elements for User
const userButton = document.getElementById("userButton");
const userModal = document.getElementById("userModal");
const closeUserButton = userModal.querySelector(".close-button");

// Show modal when avatar button is clicked
chatbotButton.addEventListener("click", function() {
    chatbotModal.style.display = "block";
});


userButton.addEventListener("click", function() {
    userModal.style.display = "block";
});

// Close modal when close button is clicked
closeChatbotButton.addEventListener("click", function() {
    chatbotModal.style.display = "none";
});

closeUserButton.addEventListener("click", function() {
    userModal.style.display = "none";
});

// Close modal if user clicks outside of modal content
window.addEventListener("click", function(event) {
    if (event.target == chatbotModal) {
        chatbotModal.style.display = "none";
    }
    if (event.target == userModal) {
        userModal.style.display = "none";
    }
});
