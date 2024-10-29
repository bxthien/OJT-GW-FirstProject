<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

=======
// register.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    
>>>>>>> c07b7bfe0fbbeec956cf3f638c87544f8be02f67
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Ngăn không cho form gửi đi

        const username = document.getElementById("username").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Kiểm tra nếu các phần tử không phải null
        if (username && phone && address && email && password) {
<<<<<<< HEAD
            // Lấy danh sách người dùng từ localStorage
            let usersFromLocalStorage = JSON.parse(localStorage.getItem("users")) || [];
            
            // Lấy danh sách người dùng từ file JSON
            fetch('../../data/user.json')
                .then(response => response.json())
                .then(data => {
                    const usersFromJson = data.user || [];
                    const allUsers = [...usersFromLocalStorage, ...usersFromJson];

                    // Tạo ID cho người dùng mới
                    const newId = allUsers.length > 0 
                        ? Math.max(...allUsers.map(user => user.id)) + 1 
                        : 1; // Nếu không có người dùng, ID bắt đầu từ 1

                    // Tạo một đối tượng người dùng mới
                    const newUser = {
                        id: newId, // Thêm ID
                        username,
                        phone,
                        address,
                        email,
                        password,
                    };

                    // Lưu vào localStorage
                    usersFromLocalStorage.push(newUser);
                    localStorage.setItem("users", JSON.stringify(usersFromLocalStorage));

                    alert("Registration successful!");
                    form.reset(); // Đặt lại form
                })
                .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
=======
            // Tạo một đối tượng người dùng mới
            const newUser = {
                username,
                phone,
                address,
                email,
                password,
            };

            // Lưu vào localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration successful!");
            form.reset(); // Đặt lại form
>>>>>>> c07b7bfe0fbbeec956cf3f638c87544f8be02f67
        } else {
            alert("Please fill in all fields!");
        }
    });
});
