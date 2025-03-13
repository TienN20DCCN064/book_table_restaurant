// const params = new URLSearchParams(window.location.search);
// const id_nhaHang = params.get("id_nhaHang");

const btnDatBanLai = document.getElementById("dat_lai_ban");
const btnCapNhatThongTin = document.getElementById("cap_nhat_thongTin");

const tableContainer = document.getElementById("table_danDatCoc");
const ho_ten = document.getElementById("ho_ten");
const sdt = document.getElementById("sdt");
const gmail = document.getElementById("gmail");
const dtNhaHang = document.getElementById("address_nha_hang");
document.addEventListener("DOMContentLoaded", function () {
    const id_nhaHang = DanhSach.getNhaHangDangChon();
    console.log("Danh sách bàn đã chọn sau khi load lại:", DanhSach.getLinkTables_duocChon());


        // DanhSach.setNhaHangDangChon("111");
    console.log(DanhSach.getNhaHangDangChon());

    viewThongTinDatBan();
    viewThongTinNguoiDat();
    viewThongTinDatBan();

    btnDatBanLai.addEventListener("click", function () {
        // window.location.href = "/view/khachhang/thongtindatban.html";
        window.location.href = `/view/khachhang/datbanan.html?id_nhaHang=${id_nhaHang}`;
    });
    btnCapNhatThongTin.addEventListener("click",function(){
        console.log("đến trang cập nhật thông tin ngươf dùng");
    });
   
});
function viewThongTinDatBan() {
const id_nhaHang = DanhSach.getNhaHangDangChon();
    // Lấy danh sách bàn đã chọn từ DanhSach
    const selectedTables = DanhSach.getLinkTables_duocChon();
    // Xóa nội dung cũ trước khi thêm mới
    tableContainer.innerHTML = "";
    // Thêm danh sách bàn được chọn vào
    selectedTables.forEach(table => {
        const p = document.createElement("p");
        const tableName = document.createElement("span");
        tableName.textContent = table.name; // Số bàn
        tableName.classList.add("price");

        const tableCapacity = document.createElement("span");
        tableCapacity.textContent = table.socho || "Không rõ"; // Sức chứa (nếu có)
        tableCapacity.classList.add("price");

        p.appendChild(tableName);
        p.appendChild(tableCapacity);
        tableContainer.appendChild(p);
    });

}
async function viewThongTinNguoiDat() {
    const id_nhaHang = DanhSach.getNhaHangDangChon();
    const thongTinNhaHang = await hamChung.layThongTinTheo_ID("nha_hang",id_nhaHang);
    const nguoiDung = await hamChung.layThongTinTheo_ID("nguoi_dung",GlobalStore.getUsername());
    // console.log(GlobalStore.getUsername());
    // console.log(await hamChung.layThongTinTheo_ID("nguoi_dung",GlobalStore.getUsername()));
    // console.log(nguoiDung.ten);
    ho_ten.textContent = nguoiDung.ten;
    sdt.textContent = nguoiDung.sdt;
    gmail.textContent = nguoiDung.email;
    dtNhaHang.textContent = thongTinNhaHang.dia_chi;
}
