// lấy ra phần tử đầu tiên của DOM với id 'menu-bar'
const menuBar = document.querySelector(".menu-bar");

const ten = document.getElementById("ten");
const mo_ta = document.getElementById("mo_ta");
const noidung = document.getElementById("noidung");
const dia_chi = document.getElementById("dia_chi");
const sdt = document.getElementById("sdt");
document.addEventListener("DOMContentLoaded", function () {
    let restaurantId = sessionStorage.getItem("restaurantId");
    // console.log("Nhà hàng được chọn có ID:", restaurantId);

    // restaurantId = "NH002";
    // console.log("Nhà hàng được chọn có ID:", restaurantId);
    // // Hiển thị trên trang hoặc dùng để tiếp tục logic đặt bàn
    // //    document.getElementById("selected-restaurant").textContent = `Nhà hàng ID: ${restaurantId}`;
    showView_nhaHang(restaurantId);

});


// menuBar.addEventListener("click", function () {
//     // thêm hoặc xóa class active, nếu chưa thì xóa
//     // lấy từ menuBar
//     menuBar.classList.toggle("active")
//     // lấy phần tử đầu tiên  của DOM menu-items 
//     // sau đó thêm hoặc xóa class active - có thì xóa - chưa thì thêm
//     document.querySelector(".menu-items").classList.toggle("active")


// })
// const toP = document.querySelector(".top")
// // lắng nghe sự kiện cuộn trang wweb
// window.addEventListener("scroll", function () {
//     const x = this.pageYOffset;
//     if (x > 80) {
//         toP.classList.add("active")
//     }
//     else {
//         toP.classList.remove("active")
//     }
// })

// js cho menu  

const menuTitle = document.querySelector(".menu-title");
menuTitle.addEventListener("click", function (x) {
    if (x.target.classList.contains("menu-button")) {
        const Target = x.target.getAttribute("data-title");
        console.log(Target);
        menuTitle.querySelector(".active").classList.remove("active");
        x.target.classList.add("active");
        const menuItem = document.querySelector(".menu");
        menuItem.querySelector(".menu-item-content.active").classList.remove("active");
        menuItem.querySelector(Target).classList.add("active")
    }
})
async function showView_nhaHang(id) {
   // console.log("id = " + id);
    //  console.log(hamChung.layThongTin_1nhaHang(id));
    const restaurant = await hamChung.layThongTin_1nhaHang(id);
    //console.log(restaurant);
    mo_ta.innerHTML = restaurant.mo_ta;
    noidung.innerHTML = restaurant.noidung;
    dia_chi.innerHTML = restaurant.dia_chi;
    sdt.innerHTML = restaurant.sdt;
    ten.innerHTML = restaurant.ten;

    // Gọi hàm để hiển thị menu
    // showView_thucDon_nhaHang(id);  // Thay "NH001" bằng ID nhà hàng thực tế
    //   await hamChung.layDanhSachMonAn_loai("NH002","Trưa");
    showView_anhDong(id,4);
    showView_thucDon_nhaHang(id);
    showView_dauBep_nhaHang(id);
    //  console.log(data);
}

async function showView_thucDon_nhaHang(id) {
    const loaiMonAn = [
        { loai: "Trưa", elementId: "trua" },
        { loai: "Chiều", elementId: "chieu" },
        { loai: "Đồ Uống", elementId: "do-uong" },
        { loai: "Điểm Tâm", elementId: "diem-tam"}

    ];

    for (const { loai, elementId } of loaiMonAn) {
        const data = await hamChung.layDanhSachMonAn_loai(id, loai);
       // console.log(data);
        const menuElement = document.getElementById(elementId);

        if (!menuElement) {
            console.error(`Không tìm thấy phần tử menu với ID: ${elementId}`);
            continue; // Bỏ qua nếu không có element trong DOM
        }

        // Xóa danh sách món ăn cũ
        menuElement.innerHTML = "";

        if (data && data.length > 0) {
            data.forEach((mon) => {
                const foodItemHTML = `
                    <div class="food-items">
                        <div class="food-item">
                            <img src="${mon.hinh_anh || 'image/default.jpg'}" alt="">
                            <p>${mon.ten}</p>
                        </div>
                        <div class="food-price">
                            <p>${mon.gia} VND</p>
                        </div>
                    </div>
                `;
                menuElement.insertAdjacentHTML("beforeend", foodItemHTML);
            });
        } else {
            menuElement.innerHTML = "<p>Không có món ăn nào.</p>";
        }
    }
}
async function showView_dauBep_nhaHang(id) {
    try {
        // Lấy danh sách đầu bếp theo nhà hàng
        let data = await hamChung.layDanhSachDB_theoNhaHang(id);
        let listDauBep = document.getElementById("list_daubep");

        if (!listDauBep) {
            console.error("Không tìm thấy phần tử có id 'list_daubep'");
            return;
        }

        // Xóa nội dung cũ
        listDauBep.innerHTML = "";

        // Giới hạn tối đa 3 đầu bếp
        let limitedData = data.slice(0, 3);

        // Kiểm tra nếu có dữ liệu
        if (limitedData.length > 0) {
            limitedData.forEach((dauBep) => {
                const chefHTML = `
                    <div class="team-items">
                        <img src="${dauBep.hinh_anh || 'image/default-chef.png'}" alt="">
                        <div class="team-items-text">
                            <h2>${dauBep.ten}</h2>
                            <span>${dauBep.chuc_vu}</span>
                        </div>
                    </div>
                `;
                listDauBep.insertAdjacentHTML("beforeend", chefHTML);
            });
        } else {
            listDauBep.innerHTML = "<p>Không có đầu bếp nào.</p>";
        }
    } catch (error) {
        console.error("Lỗi khi lấy danh sách đầu bếp:", error);
    }
}
// Gọi hàm renderMenu với id bất kỳ

 
async function showView_anhDong(nha_hang_id,soLuong) {
    const data = await hamChung.layDanhSachMenu_theoNhaHang(nha_hang_id);
    console.log(data);
    const menuContainer = document.getElementById("menu_nhho");

    if (!data || data.length === 0) {
        menuContainer.innerHTML = "<p>Không có dữ liệu menu.</p>";
        return;
    }



    // <a href="menu.html" class="btn">See Menus</a>
    
    
    // Lấy tối đa 4 món
    const limitedData = data.slice(0, soLuong);

    // Tạo swiper-wrapper và pagination
    menuContainer.innerHTML = `
        <div class="swiper-wrapper">
            ${limitedData.map(item => `
                <div class="swiper-slide slide">
                    <div class="content">
                        <span>${item.ten}</span>
                        <h3>${item.ten}</h3>
                        <button class="btn scroll-to-menu">See Menus</button>
                    </div>
                    <div class="image">
                        <img src="${item.hinh_anh}" alt="${item.ten}">
                    </div>
                </div>
            `).join("")}
        </div>
        <div class="swiper-pagination"></div>
    `;

    // Khởi tạo Swiper sau khi đã thêm dữ liệu
    new Swiper(".home-slider", {
        loop: true,
        grabCursor: true,
        effect: "flip",
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
     // Gán sự kiện cuộn xuống menu khi nhấn nút "See Menus"
     document.querySelectorAll(".scroll-to-menu").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".menu.section-pading").scrollIntoView({
                behavior: "smooth"
            });
        });
    });

}



