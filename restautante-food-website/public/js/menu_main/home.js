

const nameLoaiNhaHang = document.getElementById("nameLoaiNhaHang");
document.addEventListener("DOMContentLoaded", function () {

    // Gọi hàm để thiết lập sự kiện cho các danh mục
    thietLapSuKienChoDanhMuc();

    // Gọi hàm để hiển thị tất cả nhà hàng khi trang được tải
    hienThiDanhSachNhaHang();

});
async function hienThiDanhSachNhaHang(categoryId = null) {
    let data;
    if (categoryId) {
        console.log(`Đang lấy danh sách nhà hàng cho loại: ${categoryId}`);
        nameLoaiNhaHang.textContent = "Danh sách nhà hàng " + document.getElementById(categoryId).textContent;
        data = await hamChung.layDSNhaHang_theoLoai(categoryId);
    } else {
        console.log("Đang lấy danh sách tất cả nhà hàng");
        nameLoaiNhaHang.textContent = "Danh sách tất cả nhà hàng";
        data = await hamChung.layDSNhaHang();
    }
    console.log(data);

    const restaurantList = document.getElementById("restaurant-list");
    restaurantList.innerHTML = ""; // Xóa nội dung cũ nếu có

    data.forEach(restaurant => {
        const restaurantHTML = `
            <div class="swiper-slide slide">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
                    <div class="relative">
                        <img src="${restaurant.hinh_anh || "/public/images/people.jpg"}" alt="">
                    </div>
                    <div class="p-4">
                        <h2 class="text-xl font-semibold">${restaurant.ten}</h2>
                        <p class="text-gray-600 mt-2">${restaurant.dia_chi}</p>
                    </div>
                    <div class="stars">
                        ${generateStars(restaurant.so_sao || 0)}
                    </div>
                    <div class="bg-gray-100 p-4 text-center">
                        <button id="book-now-${restaurant.id}" class="book-now-btn bg-white text-black border border-gray-300 rounded-full px-4 py-2 mt-2">
                            Đặt chỗ ngay
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
            const restaurantId = event.target.id.replace("book-now-", "");
            console.log("Bạn đã chọn đặt chỗ cho nhà hàng có ID:", restaurantId);
            // Lưu vào sessionStorage
            sessionStorage.setItem("restaurantId", restaurantId);

            // Chuyển trang
            window.location.href = window.location.origin + "/view/home_nhahang.html";

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
