const hamChung = {
    // Đặt giá trị vào localStorage


    async layDSNhaHang_theoLoai(loai) {
        return await layDanhSachSP_theoLoai(loai); // Đảm bảo trả về kết quả từ Promise
    },
    async layDSNhaHang() {
        return await layDSNhaHang(); // Đảm bảo trả về kết quả từ Promise
    },
    
    
    async layDanhSachDB_theoNhaHang(id) {
        return await layDanhSachDB_theoNhaHang(id); // Đảm bảo trả về kết quả từ Promise
    },
    async layDanhSachMenu_theoNhaHang(id) {
        return await layDanhSachMenu_theoNhaHang(id); // Đảm bảo trả về kết quả từ Promise
    },

    async layThongTin_1nhaHang(id) {
        return await layThongTin_1nhaHang(id); // Đảm bảo trả về kết quả từ Promise
    },

    async layDanhSachMonAn_loai(idNhaHang, loai) {
        return await layDanhSachMonAnNhaHang_loai(idNhaHang, loai); // Đảm bảo trả về kết quả từ Promise
    },
};
async function layDSNhaHang() {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + "nha_hang");
        const products = await response.json(); // Chuyển dữ liệu về JSON
        return products;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        return [];
    }
}

async function layDanhSachDB_theoNhaHang(id) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + "dau_bep");
        const products = await response.json(); // Chuyển dữ liệu về JSON

        // Lọc danh sách sản phẩm theo mã loại
        const filteredProducts = products.filter(product => product.nha_hang_id === id);
        return filteredProducts;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        return [];
    }
}
async function layDanhSachSP_theoLoai(loai) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + "nha_hang");
        const products = await response.json(); // Chuyển dữ liệu về JSON

        // Lọc danh sách sản phẩm theo mã loại
        const filteredProducts = products.filter(product => product.loai_id === loai);
        // console.log("Loai sp là : " + loai);
        // console.log(filteredProducts);
        return filteredProducts;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        return [];
    }
}
async function layThongTin_1nhaHang(id) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + "nha_hang/" + id);
        const data = await response.json(); // Chuyển dữ liệu về JSON
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        return [];
    }
}

async function layDanhSachMonAnNhaHang_loai(idNhaHang, loai_do_an) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + "thuc_don");
        const products = await response.json(); // Chuyển dữ liệu về JSON
        // console.log(products);
        // Lọc danh sách sản phẩm theo mã loại
        // consolog.log ("Loai sp là: " + loai);
        // console.log("loai_do_an: " + loai_do_an);
        const listThucDon_1NhaHang = products.filter(product => product.nha_hang_id === idNhaHang);
        // console.log(listThucDon_1NhaHang);
        const list1LoaiThucDon_1NhaHang = listThucDon_1NhaHang.filter(listThucDon_1NhaHang => listThucDon_1NhaHang.loai_do_an === loai_do_an);

        //   console.log(list1LoaiThucDon_1NhaHang);





        return list1LoaiThucDon_1NhaHang;
    }
    catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        return [];
    }
}



async function layDanhSachMenu_theoNhaHang(id) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + "thuc_don");
        const products = await response.json(); // Chuyển dữ liệu về JSON

        // Lọc danh sách sản phẩm theo mã loại
        const filteredProducts = products.filter(product => product.nha_hang_id === id);
        // console.log("Loai sp là : " + loai);
        console.log(filteredProducts);
        return filteredProducts;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        return [];
    }
}
// Gắn vào window để có thể truy cập ở mọi nơi
window.hamChung = hamChung;
