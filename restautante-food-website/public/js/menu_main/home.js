

const nameLoaiNhaHang = document.getElementById("nameLoaiNhaHang");
document.addEventListener("DOMContentLoaded", function () {
    showView_main();


});


async function showView_main() {
    showView_anhDong(4);
    // Gọi hàm để thiết lập sự kiện cho các danh mục
    thietLapSuKienChoDanhMuc();

    // Gọi hàm để hiển thị tất cả nhà hàng khi trang được tải
    hienThiDanhSachNhaHang(5);

}



async function showView_anhDong(soLuong) {
    // const data = await hamChung.layDanhSachMenu_theoNhaHang(nha_hang_id);

    data = await hamChung.layDanhSach("nha_hang");

    const menuContainer = document.getElementById("menu_nhho");

    if (!data || data.length === 0) {
        menuContainer.innerHTML = "<p>Không có dữ liệu menu.</p>";
        return;
    }
    // Lấy tối đa 4 món
    // Lọc ra 4 nhà hàng có hình ảnh hợp lệ
    const restaurantSuggestions = data.filter(item => item.hinh_anh
        && item.hinh_anh.trim() !== ""
        && item.so_sao == 5
    ).slice(0, 4);

    // Tạo swiper-wrapper và pagination
    menuContainer.innerHTML = `
        <div class="swiper-wrapper">
            ${restaurantSuggestions.map(item => `
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

async function hienThiDanhSachNhaHang(categoryId = null) {
    let data;
    console.log("category" + categoryId);
    if (categoryId) {
        console.log(`Đang lấy danh sách nhà hàng cho loại: ${categoryId}`);
        const categoryElement = document.getElementById(categoryId);
        if (categoryElement) {
            nameLoaiNhaHang.textContent = "Danh sách nhà hàng " + categoryElement.textContent;
            data = await hamChung.layDSNhaHang_theoLoai(categoryId);
        } else {
            console.warn(`Không tìm thấy phần tử có id: ${categoryId}`);
            data = await hamChung.layDanhSach("nha_hang");
            nameLoaiNhaHang.textContent = "Danh sách nhà hàng";
        }

        // if (data.length() == 0) {
        //     data = await hamChung.layDanhSach("nha_hang");
        // }
        // else {
        //     data = await hamChung.layDSNhaHang_theoLoai(categoryId);
        // }
    } else {
        console.log("Đang lấy danh sách tất cả nhà hàng");
        nameLoaiNhaHang.textContent = "Danh sách tất cả nhà hàng";
        // data = await hamChung.layDSNhaHang();
        data = await hamChung.layDanhSach("nha_hang");
    }
    console.log(data);

    const restaurantList = document.getElementById("restaurant-list");
    restaurantList.innerHTML = ""; // Xóa nội dung cũ nếu có

    data.forEach(restaurant => {
        const restaurantHTML = `
            <div class="swiper-slide slide">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
                    <div class="relative">
                        <img src="${restaurant.hinh_anh}" alt="">
                    </div>
                    <div class="p-4">
                        <h2 class="text-xl font-semibold">${restaurant.ten}</h2>
                        <p class="text-gray-600 mt-2">${restaurant.dia_chi}</p>
                    </div>
                    <div class="stars">
                        ${generateStars(restaurant.so_sao || 0)}
                    </div>
                    <div class="bg-gray-100 p-4 text-center">
                        <h3></h3>
                        <button id="book-now-${restaurant.id}" class="book-now-btn bg-white text-black border border-gray-300 rounded-full px-4 py-2 mt-2">
                            Xem Nhà Hàng
                        </button>
                    </div>
                </div>
            </div>
        `;
        restaurantList.innerHTML += restaurantHTML;
    });

    const soLuongNhaHang = data.length;
    const slidesPerView = soLuongNhaHang < 4 ? soLuongNhaHang : 4;

    new Swiper(".reviews-slider", {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
        },
        slidesPerView: slidesPerView,
        breakpoints: {
            550: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: slidesPerView },
        },
    });

    click_datBan();
}

function thietLapSuKienChoDanhMuc() {
    document.querySelectorAll('.category .box').forEach(box => {
        box.addEventListener('click', (event) => {
            event.preventDefault();
            const categoryId = box.id; // Lấy ID của danh mục
            hienThiDanhSachNhaHang(categoryId);
        });
    });
}


function click_datBan() {
    document.getElementById("restaurant-list").addEventListener("click", function (event) {
        if (event.target.classList.contains("book-now-btn")) {
            const id_nhaHang = event.target.id.replace("book-now-", "");
            // console.log("Bạn đã chọn đặt chỗ cho nhà hàng có ID:", id_nhaHang);

            if (DanhSach.getNhaHangDangChon() != id_nhaHang) {
                DanhSach.getNhaHangDangChon = id_nhaHang;
                DanhSach.resetListTables_duocChon();
            }
            // console.log(DanhSach.getLinkTables_duocChon());

            window.location.href = `/view/khachhang/home_nhahang.html?id_nhaHang=${id_nhaHang}`;

        }
    });
}


// Hàm tạo sao dựa trên đánh giá
function generateStars(rating) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i - rating < 1) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    return starsHTML;
}
