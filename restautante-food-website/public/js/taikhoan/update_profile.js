const tenNguoiDung = document.querySelector("input[name='name']");
const gmailNguoiDung = document.querySelector("input[name='email']");
const sdtNguoiDung = document.querySelector("input[name='number']");


document.addEventListener("DOMContentLoaded", function () {
    viewThongTinNguoiDung();
    layForm();
});
async function viewThongTinNguoiDung() {
    const dataNguoiDung = await hamChung.layThongTinTheo_ID("nguoi_dung", GlobalStore.getUsername());
    console.log(dataNguoiDung);
    tenNguoiDung.value = dataNguoiDung.ten;
    gmailNguoiDung.value = dataNguoiDung.email;
    sdtNguoiDung.value = dataNguoiDung.sdt;
    gmailNguoiDung.readOnly = true;
}

async function layForm() {
    const dataNguoiDung = await hamChung.layThongTinTheo_ID("nguoi_dung", GlobalStore.getUsername());
    document.getElementById("updateProfileForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn form gửi đi mặc định

        let name = tenNguoiDung.value.trim();
        let email = gmailNguoiDung.value.trim();
        let number = sdtNguoiDung.value.trim();
        let oldPass = document.querySelector("[name='old_pass']").value;
        let newPass = document.querySelector("[name='new_pass']").value;
        let confirmPass = document.querySelector("[name='confirm_pass']").value;


        // Kiểm tra số điện thoại có đúng 10 chữ số không
        let numberPattern = /^[0-9]{10}$/;
        if (!numberPattern.test(number)) {
            alert("Số điện thoại phải có đúng 10 chữ số!");
            return;
        }

        // Kiểm tra mật khẩu mới nếu được nhập  // th nhập mk
        if (newPass || confirmPass) {
            if (newPass.length < 6) {
                alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
                return;
            }
            if (newPass !== confirmPass) {
                alert("Mật khẩu xác nhận không khớp!");
                return;
            }
        }
        else {
            // console.log("tién");
            // console.log(dataNguoiDung.ten +  tenNguoiDung.value);
            // console.log(dataNguoiDung.sdt + sdtNguoiDung.value);
            if (dataNguoiDung.ten == tenNguoiDung.value && dataNguoiDung.sdt == sdtNguoiDung.value) {
                alert("Chưa thay đổi thông tin gì!");
                return;
            }
        }




        let formData = new FormData(this);
        let formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        console.log("Dữ liệu form gửi đi:", formObject);
        return formObject;
        // alert("Thông tin hợp lệ! Gửi form...");
        // this.submit(); // Gửi form nếu tất cả đều hợp lệ
    });
}