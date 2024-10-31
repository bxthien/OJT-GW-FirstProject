document.addEventListener('DOMContentLoaded', function() {
    fetch('components/login/login.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('login-component').innerHTML = data;
        // Kết nối với login form sau khi tải
        loadLoginScript();
      })
      .catch(error => console.error('Lỗi khi tải component đăng nhập:', error));
  });
  
  function loadLoginScript() {
    // Tập lệnh từ login.js để xử lý chức năng đăng nhập
    const script = document.createElement('script');
    script.src = 'components/login/login.js';
    document.body.appendChild(script);
  }
  
  
  document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('login-btn').addEventListener('click', function (event) {
          event.preventDefault(); // Ngăn chặn hành vi gửi mẫu
  
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
  
          // Lấy dữ liệu từ localStorage
          let users = JSON.parse(localStorage.getItem('users'));
  
          if (!users) {
              // Nếu không có dữ liệu trong localStorage, tải từ tệp JSON
              fetch('../../data/user.json')
                  .then(response => response.json())
                  .then(data => {
                      users = data.user; // Lưu dữ liệu vào biến users
                      localStorage.setItem('users', JSON.stringify(users)); // Lưu vào localStorage để sử dụng sau
                      authenticateUser(users, username, password);
                  })
                  .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
          } else {
              // Nếu đã có dữ liệu trong localStorage, xác thực người dùng ngay
              authenticateUser(users, username, password);
          }
      });
  
      function authenticateUser(users, username, password) {
          // Tìm người dùng
          const user = users.find(user => user.username === username && user.password === password);
  
          if (user) { // Kiểm tra xem người dùng có tồn tại hay không
              // Đăng nhập thành công
              alert(`Chào mừng, ${user.name}!`); // Sử dụng name của người dùng
  
              window.location.href = "../../index.html"; // Chuyển hướng đến trang chủ
          } else {
              // Đăng nhập thất bại
              alert('Sai mật khẩu hoặc tên đăng nhập!');
          }
      }
  });
  