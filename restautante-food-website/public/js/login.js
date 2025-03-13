document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Ngăn chặn form submit mặc định

            // Lấy giá trị nhập vào từ người dùng
            const username = document.getElementById("tk").value.trim();
            const password = document.getElementById("mk").value.trim();

            if (username === "" || password === "") {
                alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
                return;
            }

            // Lấy danh sách người dùng từ hamChung
            var data = await hamChung.layDanhSach("nguoi_dung");


            // Kiểm tra xem username & password có khớp trong danh sách không
            var user = data.find(user => user.id === username && user.mat_khau === password);

            if (user) {
                console.log("Đăng nhập thành công!");
                alert("Đăng nhập thành công!");
                let url = "";
                GlobalStore.setUsername(user.id);
                if (user.vai_tro == "trung_tam") {
                    url = "trungTaam"
                }
                else if (user.vai_tro == "quan_ly") {
                    url = "quanly";
                }
                else if (user.vai_tro == "nguoi_dung") {
                    url = "/view/menu_main/home.html";
                }



                const baseURL = window.location.origin;
                window.location.href = `${baseURL}` + url;
            } else {
                console.log("Đăng nhập thất bại!");
                alert("Sai tài khoản hoặc mật khẩu!");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("mk");
    const showPasswordCheckbox = document.getElementById("showPassword");

    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener("change", function () {
            passwordInput.type = this.checked ? "text" : "password";
        });
    }
});
