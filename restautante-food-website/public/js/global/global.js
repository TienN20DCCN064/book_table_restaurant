const congAPI = 4002;
const linkCongAPI =  "http://localhost:"+congAPI+"/api/";


const GlobalStore = {
    // Đặt giá trị vào localStorage
    setUsername(username) {
        localStorage.setItem("global_username", username);
    },

    // Lấy giá trị từ localStorage, mặc định trả về null nếu không có giá trị
    getUsername() {
        const username = localStorage.getItem("global_username");
        return username !== null ? username : null; // Nếu không có giá trị thì trả về null
    },

    getCongAPI(){
        return congAPI;
    },

    getLinkCongAPI(){
        return linkCongAPI;
    }
};

// Gắn vào window để có thể truy cập ở mọi nơi
window.GlobalStore = GlobalStore;
