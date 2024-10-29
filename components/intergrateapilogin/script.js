document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-btn').addEventListener('click', function (event) {
        event.preventDefault(); // Ngăn chặn hành vi gửi mẫu

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Tải dữ liệu JSON từ tệp
        fetch('user.json')
            .then(response => response.json())
            .then(data => {
                const users = data.user; // Đảm bảo sử dụng đúng tên trường
                const user = users.find(user => user.username === username && user.password === password);

                if (user) { // Kiểm tra xem người dùng có tồn tại hay không
                    // Đăng nhập thành công
                    alert(`Chào mừng, ${user.name}!`); // Sử dụng name của người dùng
                } else {
                    // Đăng nhập thất bại
                    alert('Sai mật khẩu hoặc tên đăng nhập!');
                }
            })
            .catch(error => console.error('Lỗi:', error));
    });
});
