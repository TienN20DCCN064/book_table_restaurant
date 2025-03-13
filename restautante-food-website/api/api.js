const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 4002;

// Sử dụng CORS cho tất cả các nguồn
app.use(cors());

// Middleware để phân tích cú pháp JSON
app.use(express.json());

// Kết nối cơ sở dữ liệu
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nhah",
});

// Kiểm tra kết nối
db.connect((err) => {
    if (err) {
        console.error("Không thể kết nối cơ sở dữ liệu:", err);
        return;
    }
    console.log("Kết nối cơ sở dữ liệu thành công!");
});

// Danh sách bảng và khóa chính tương ứng
const tables = {
     "trung_tam":["id"],
     "ban_an": ["id"],
     "chi_tiet_don_hang": ["id"],
     "danh_gia":["id"],
     "don_hang": ["id"],
    "dat_ban": ["id"],
    "dau_bep":["id"],
    "thuc_don": ["id"],
    "nha_hang": ["id"],
    "nguoi_dung": ["id"],
    "loai_nha_hang": ["id"],
    
    // "nhan_vien": ["id"],
    // "phan_quyen": ["id"],
    // "tai_khoan_quyen": ["id"]
};
Object.entries(tables).forEach(([table, keys]) => {
    // GET - Lấy tất cả dữ liệu
    app.get(`/api/${table}`, (req, res) => {
        db.query(`SELECT * FROM ??`, [table], (err, results) => {
            if (err) return res.status(500).send(`Lỗi khi lấy dữ liệu từ ${table}`);
            res.json(results);
        });
    });

    // GET - Lấy một bản ghi theo khóa chính
    app.get(`/api/${table}/:${keys.map((_, i) => `id${i + 1}`).join("/:")}`, (req, res) => {
        const conditions = keys.map((key, i) => `?? = ?`).join(" AND ");
        const params = [table, ...keys.flatMap((key, i) => [key, req.params[`id${i + 1}`]])];

        db.query(`SELECT * FROM ?? WHERE ${conditions}`, params, (err, results) => {
            if (err) return res.status(500).send(`Lỗi khi lấy dữ liệu từ ${table}`);
            if (results.length === 0) return res.status(404).send(`Không tìm thấy dữ liệu trong ${table}`);
            res.json(results[0]);
        });
    });

    // POST - Thêm mới bản ghi
    app.post(`/api/${table}`, (req, res) => {
        const columns = Object.keys(req.body);
        const values = columns.map(key => {
            const value = req.body[key];

            // Kiểm tra xem giá trị có phải là chuỗi định dạng ngày hợp lệ hay không
            if (typeof value === "string" && !isNaN(Date.parse(value))) {
                return new Date(value).toISOString().split("T")[0]; // "YYYY-MM-DD"
            }
            return value;
        });

        if (columns.length === 0) return res.status(400).send("Không có dữ liệu để thêm.");

        db.query(
            `INSERT INTO ?? (${columns.map(() => "??").join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`,
            [table, ...columns, ...values],
            (err) => {
                if (err) return res.status(500).send(`Lỗi khi thêm vào ${table}: ${err.message}`);
                res.status(201).send(`Thêm vào ${table} thành công`);
            }
        );
    });


    // put - Cập nhật bản ghi
    // cần chỉnh sửa phần này 
    // với key là những kiểu dữ liệu ngày thì sao 
    app.put(`/api/${table}/:${keys.map((_, i) => `id${i + 1}`).join("/:")}`, (req, res) => {
        const updates = Object.keys(req.body).map(key => {
            const value = req.body[key];

            // if (key === "NGAYSINH" && req.body[key]) {
            //     // Chuyển đổi NGAYSINH sang định dạng YYYY-MM-DD
            //     const date = new Date(req.body[key]);
            //     req.body[key] = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
            // }
            // Kiểm tra xem giá trị có phải là chuỗi định dạng ngày hợp lệ hay không
            if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
                req.body[key] = value.split("T")[0]; // Chỉ lấy "YYYY-MM-DD"
            }


            return `\`${key}\` = ?`;
        }).join(", ");

        const values = [...Object.values(req.body), ...keys.map((_, i) => req.params[`id${i + 1}`])];

        if (!updates) return res.status(400).send("Không có dữ liệu để cập nhật.");

        const conditions = keys.map(key => `\`${key}\` = ?`).join(" AND ");
        const sql = `UPDATE \`${table}\` SET ${updates} WHERE ${conditions}`;

        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).send(`Lỗi khi cập nhật ${table}: ${err.message}`);
            res.send(`Cập nhật ${table} thành công!`);
        });
    });


    app.delete(`/api/${table}/:${keys.map((_, i) => `id${i + 1}`).join("/:")}`, (req, res) => {
        if (!table || typeof table !== "string") {
            return res.status(400).send("Tên bảng không hợp lệ.");
        }
        if (!keys || keys.length === 0) {
            return res.status(400).send("Thiếu khóa chính.");
        }
        if (keys.some((_, i) => !req.params[`id${i + 1}`])) {
            return res.status(400).send("Thiếu giá trị khóa chính.");
        }

        // Tạo điều kiện WHERE cho các khóa chính
        const conditions = keys.map((key) => `\`${key}\` = ?`).join(" AND ");
        const params = [...keys.map((key, i) => req.params[`id${i + 1}`])];

        const sql = `DELETE FROM \`${table}\` WHERE ${conditions}`;
        console.log("SQL Query:", sql, "Params:", params); // Debug

        db.query(sql, params, (err) => {
            if (err) return res.status(500).send(`Lỗi khi xóa từ ${table}: ${err.message}`);
            res.send(`Xóa từ ${table} thành công`);
        });
    });

});





// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
