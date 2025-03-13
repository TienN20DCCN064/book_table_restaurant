let userInfoDiv = document.getElementById("thong_tin_nguoi_dung");

// Lấy các phần tử cụ thể
let nameSpan = userInfoDiv.querySelector("p:nth-of-type(1) span");
let phoneSpan = userInfoDiv.querySelector("p:nth-of-type(2) span");
let emailSpan = userInfoDiv.querySelector("p:nth-of-type(3) span");
let btnUpdate_thongTinNguoiDung = document.getElementById("cap_nhat_thong_tin");
// let addressSpan = userInfoDiv.querySelector(".address span");


document.addEventListener("DOMContentLoaded", async function () {
    let dataNguoiDung = await hamChung.layThongTinTheo_ID("nguoi_dung",GlobalStore.getUsername())
    console.log(dataNguoiDung);
    nameSpan.textContent = dataNguoiDung.ten;
    phoneSpan.textContent = dataNguoiDung.sdt;
    emailSpan.textContent = dataNguoiDung.email;
   


    btnUpdate_thongTinNguoiDung.addEventListener("click", function () {
        // window.location.href = "/view/khachhang/thongtindatban.html";
        window.location.href = `/view/taikhoan/update_profile.html?taikhoanId=${GlobalStore.getUsername()}`;
    });
    // Giả lập cập nhật thông tin sau 3 giây (có thể thay bằng fetch API)

});
