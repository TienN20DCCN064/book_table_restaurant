


let btnViewTables = document.getElementById("view-selected-tables");
// let id_nhaHang = "NH001";
const params = new URLSearchParams(window.location.search);
const id_nhaHang = params.get("id_nhaHang");


const listTables_duocChon = []; // Mảng lưu các bàn đã chọn

console.log("id_nhaHang = " + id_nhaHang);
document.addEventListener("DOMContentLoaded", function () {


    btnViewTables.addEventListener("click", function () {
        // window.location.href = "/view/khachhang/thongtindatban.html";
        DanhSach.setNhaHangDangChon(id_nhaHang);
        console.log(DanhSach.getNhaHangDangChon());

        window.location.href = `/view/khachhang/thongtindatban.html`;
    });

    viewtable_banAn(id_nhaHang);
});


async function viewtable_banAn(id_nhaHang) {
    try {
        // Gọi API để lấy danh sách bàn
        let data = await hamChung.layDanhSachBanAn_theoNhaHang(id_nhaHang);
   //     console.log(data);

        const tableBody = document.querySelector("#table_banan tbody");
       
        // Xóa dữ liệu cũ (nếu có)
        tableBody.innerHTML = "";

        // Hiển thị danh sách bàn
        data.forEach((table) => {
            const row = document.createElement("tr");

            // Xác định trạng thái bàn
            let statusText, statusClass, bookedInfo, action;
            if (table.trang_thai === "trong") {
                statusText = "✅ Còn trống";
                statusClass = "available";
                bookedInfo = "---";
                action = `<input type="checkbox" class="table-checkbox" data-id="${table.id}" 
                                                                        data-name="${table.so_ban}" 
                                                                        data-succhua="${table.suc_chua}">`;
            } else {
                statusText = "❌ Đã đặt";
                statusClass = "booked";
                bookedInfo = "Không xác định";
                action = "❌";
            }

            row.innerHTML = `
                <td>${table.so_ban}</td>
                <td>${table.suc_chua}</td>
                <td class="${statusClass}">${statusText}</td>
                <td>${bookedInfo}</td>
                <td>${action}</td>
            `;

            tableBody.appendChild(row);
        });

        // Xử lý chọn/bỏ chọn bàn
        document.querySelectorAll(".table-checkbox").forEach((checkbox) => {
            checkbox.addEventListener("change",function () {
                const tableId = this.getAttribute("data-id");
                const tableName = this.getAttribute("data-name");
                const tableSoCho = this.getAttribute("data-succhua"); // 🛠 Lấy đúng thuộc tính


                if (this.checked) {
                    listTables_duocChon.push({ id: tableId, name: tableName, socho: tableSoCho });
                } else {
                    const index = listTables_duocChon.findIndex((t) => t.id === tableId);
                    if (index !== -1) listTables_duocChon.splice(index, 1);
                }

                console.log("Danh sách bàn đã chọn:", listTables_duocChon);
                DanhSach.setListTables_duocChon(listTables_duocChon);
                console.log(DanhSach.getLinkTables_duocChon());
            });
        });

       

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bàn:", error);
    }
}
