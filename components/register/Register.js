document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (username && phone && address && email && password) {
            let usersFromLocalStorage = JSON.parse(localStorage.getItem("users")) || [];
            
            fetch('../../data/user.json')
                .then(response => response.json())
                .then(data => {
                    const usersFromJson = data.user || [];
                    const allUsers = [...usersFromLocalStorage, ...usersFromJson];

                    const newId = allUsers.length > 0 
                        ? Math.max(...allUsers.map(user => user.id)) + 1 
                        : 1;

                    const newUser = {
                        id: newId,
                        username,
                        phone,
                        address,
                        email,
                        password,
                    };

                    usersFromLocalStorage.push(newUser);
                    localStorage.setItem("users", JSON.stringify(usersFromLocalStorage));

                    alert("Registration successful!");
                    form.reset();
                })
                .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
        } else {
            alert("Please fill in all fields!");
        }
    });
});