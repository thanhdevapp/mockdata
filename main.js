const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Cho phép CORS chỉ từ http://localhost:4200
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Middleware để parse JSON
app.use(express.json());

// Hàm đọc dữ liệu từ file JSON
const getData = (filename) => {
    const rawData = fs.readFileSync(path.join(__dirname, filename), 'utf-8');
    return JSON.parse(rawData);
};

// API 1: Lấy thông tin user
app.get('/dcmcore-administration/v1/user/info', (req, res) => {
    const data = getData('data.json');
    res.json(data.userInfo);
});

// API 2: Tìm kiếm field theo form
app.get('/dcmcore-services-management/v1/field/search-by-form', (req, res) => {
    const data = getData('data.json');
    res.json(data.searchByForm);
});

// API 3: Lấy thông tin field static
app.get('/dcmcore-services-management/v1/field/static', (req, res) => {
    const data = getData('data.json');
    res.json(data.staticFields);
});

// API 4: Lấy thông tin form theo ID
app.get('/dcmcore-services-management/v2/form/:id', (req, res) => {
    const data = getData('data.json');
    const formId = req.params.id;

    if (data.form) {
        res.json(data.form);
    } else {
        res.status(404).json({ status: 'error', message: 'Form không tồn tại' });
    }
});

app.get('/dcmcore-services-management/v1/config-builder/management-all-profile', (req, res) => {
    const data = getData('dcms.json');
    if (data.managementAllProfile) {
        res.json(data.managementAllProfile);
    } else {
        res.status(404).json({ status: 'error', message: 'Form không tồn tại' });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Fake API Server đang chạy tại http://localhost:${PORT}`);
});
