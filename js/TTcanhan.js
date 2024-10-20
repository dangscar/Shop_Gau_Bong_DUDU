// Danh sách phường tương ứng với từng quận
const wardOptions = {
    "ninh-kieu": ["Phường An Khánh", "Phường An Hòa", "Phường An Cư", "Phường An Bình", "Phường An Nghiệp", "Phường An Phú", "Phường Cái Khế", "Phường Hưng Lợi", "Phường Tân An", "Phường Thới Bình", "Phường Xuân Khánh"],
    "thot-not": ["Phường Thới Thuận", "Phường Thuận An", "Phường Tân Hưng", "Phường Tân Lộc", "Phường Thạnh Hòa", "Phường Thốt Nốt", "Phường Thuận Hưng", "Phường Trung Kiên", "Phường Trung Nhứt"],
    "cai-rang": ["Phường Ba Láng", "Phường Hưng Phú", "Phường Hưng Thạnh", "Phường Lê Bình", "Phường Phú Thứ", "Phường Tân Phú", "Phường Thường Thạnh"],
    "binh-thuy": ["Phường An Thới", "Phường Bình Thủy", "Phường Bùi Hữu Nghĩa", "Phường Long Hòa", "Phường Long Tuyền", "Phường Thới An Đông", "Phường Trà An", "Phường Trà Nóc"],
    "o-mon": ["Phường Châu Văn Liêm", "Phường Long Hưng", "Phường Phước Thới", "Phường Thới An", "Phường Thới Hòa", "Phường Thới Long", "Phường Trường Lạc"],
    "co-do": ["Thị trấn Cờ Đỏ", "Xã Đông Hiệp", "Xã Đông Thắng", "Xã Thạnh Phú", "Xã Thới Đồng", "Xã Thới Hưng", "Xã Thới Xuân", "Xã Trung An", "Xã Trung Hưng", "Xã Trung Thạnh"],
    "phong-dien": ["Thị trấn Phong Điền", "Xã Giai Xuân", "Xã Mỹ Khánh", "Xã Nhơn Ái", "Xã Nhơn Nghĩa", "Xã Tân Thới", "Xã Trường Long"],
    "thoi-lai": ["Thị trấn Thới Lai", "Xã Định Môn", "Xã Đông Bình", "Xã Đông Thuận", "Xã Thân Thạhn", "Xã  Thới Tân", "Xã Thới Thạnh", "Xã Trường Thắng", "Xã Trường Thắng", "Xã Trường Xuân", "Xã Trường Xuân A", "Xã Trường Xuân B", "Xã Xuân Thắng"],
    "co-do": ["Thị trấn Vĩnh Thạnh", "Thị trấn Thạnh An", "Xã Thạnh An", "Xã Thạnh Lộc", "Xã Thạnh Lơi", "Xã Thạnh Mỹ", "Xã Thạnh Quới", "Xã Thạnh Thắng", "Xã Thạnh Tiến", "Xã Vĩnh Bình", "Xã Vĩnh Trinh" ]
};

/* Tạo một đối tượng để lưu trữ thông tin cá nhân
let userInfo = {
    name: "Nguyễn Văn A",
    phone: "0943846522",
    houseStreet: "Đường xyz",
    district: "ninh-kieu",
    ward: "Phường An Khánh"

};*/

// Hàm hiển thị thông tin cá nhân
function displayUserInfo() {
    document.getElementById('name-input').value = userInfo.name;
    document.getElementById('phone-input').value = userInfo.phone;
    document.getElementById('detail-address').value = userInfo.houseStreet;
    document.getElementById('district-select').value = userInfo.district;
    updateWardOptions(); // Cập nhật danh sách phường khi chọn quận
    document.getElementById('ward-select').value = userInfo.ward;
}

// Hàm để lưu lại thông tin cá nhân
function saveUserInfo() {
    // Lấy giá trị từ các trường nhập liệu
    userInfo.name = document.getElementById('name-input').value;
    userInfo.phone = document.getElementById('phone-input').value;
    userInfo.houseStreet = document.getElementById('detail-address').value;
    userInfo.district = document.getElementById('district-select').value;
    userInfo.ward = document.getElementById('ward-select').value;

    // Lưu vào localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    alert("Thông tin đã được lưu thành công!");
}

// Hàm để lấy thông tin từ localStorage khi tải trang
function loadFromLocalStorage() {
    const savedInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (savedInfo) {
        userInfo = savedInfo; // Cập nhật lại thông tin từ localStorage
        displayUserInfo();
    }
}

// Hàm cập nhật danh sách phường dựa trên quận được chọn
function updateWardOptions() {
    const districtSelect = document.getElementById("district-select");
    const wardSelect = document.getElementById("ward-select");
    const selectedDistrict = districtSelect.value;

    // Xóa các tùy chọn cũ
    wardSelect.innerHTML = '<option value="">Chọn Phường</option>';

    // Nếu có quận được chọn, hiển thị danh sách phường tương ứng
    if (selectedDistrict && wardOptions[selectedDistrict]) {
        const wards = wardOptions[selectedDistrict];
        wards.forEach(ward => {
            const option = document.createElement("option");
            option.value = ward;
            option.textContent = ward;
            wardSelect.appendChild(option);
        });
    }
}

// Gọi hàm loadFromLocalStorage và displayUserInfo khi trang tải
window.onload = function() {
    loadFromLocalStorage();
    displayUserInfo();
};

// Lưu thông tin khi người dùng nhấn nút LƯU THAY ĐỔI
document.querySelector('.save-btn').addEventListener('click', saveUserInfo);

// Cập nhật danh sách phường khi người dùng chọn quận mới
document.getElementById('district-select').addEventListener('change', updateWardOptions);
