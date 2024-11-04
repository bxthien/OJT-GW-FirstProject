const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Đường dẫn đến file JSON trong thư mục data
const DATA_FILE = path.join(__dirname, 'data', 'user.json');

// Đảm bảo file JSON tồn tại
async function ensureDataFileExists() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await writeUsers([]); // Ghi mảng rỗng nếu file chưa tồn tại
    }
}

// Đọc dữ liệu từ file JSON
async function readUsers() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const users = JSON.parse(data);
        return Array.isArray(users) ? users : [];
    } catch (error) {
        console.error('Lỗi khi đọc dữ liệu:', error);
        return [];
    }
}

// Ghi dữ liệu vào file JSON
async function writeUsers(users) {
    const dir = path.dirname(DATA_FILE);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
}

app.post('/register', async (req, res) => {
    try {
        const newUser = req.body;
        const users = await readUsers();

        if (!newUser.username || !newUser.email || !newUser.phone || !newUser.password || !newUser.address) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
        }

        if (users.some(user => user.email === newUser.email)) {
            return res.status(400).json({ message: 'Email đã được sử dụng!' });
        }

        if (users.some(user => user.phone === newUser.phone)) {
            return res.status(400).json({ message: 'Số điện thoại đã được sử dụng!' });
        }

        if (users.some(user => user.username === newUser.username)) {
            return res.status(400).json({ message: 'Tên đăng nhập đã được sử dụng!' });
        }

        users.push(newUser);
        await writeUsers(users);

        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await readUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đọc dữ liệu!' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = await readUsers();

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            res.status(200).json({ message: 'Đăng nhập thành công!' });
        } else {
            res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác!' });
        }
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
});

// API lấy thông tin người dùng theo username
app.get('/user/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const users = await readUsers();
        const user = users.find(u => u.username === username);
        
        if (user) {
            // Không gửi mật khẩu trong response
            const { password, ...userInfo } = user;
            res.json(userInfo);
        } else {
            res.status(404).json({ message: 'Người dùng không tồn tại!' });
        }
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Lỗi server!' });
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
    ensureDataFileExists(); // Đảm bảo file JSON được tạo khi server khởi động
});
