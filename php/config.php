<?php
// Thông tin kết nối cơ sở dữ liệu
$host = 'localhost'; // Địa chỉ máy chủ
$db = 'shop'; // Tên cơ sở dữ liệu
$user = 'root'; // Tài khoản mặc định của XAMPP là root
$password = ''; // Mặc định root không có mật khẩu

// Kết nối tới MySQL
$conn = new mysqli($host, $user, $password, $db);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die('Kết nối thất bại: ' . $conn->connect_error);
}
?>
