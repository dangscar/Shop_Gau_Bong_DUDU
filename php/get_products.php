<?php
include 'config.php'; // Kết nối CSDL

// Truy vấn lấy tất cả sản phẩm từ bảng products
$query = "SELECT * FROM products";
$result = $conn->query($query);

$products = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row; // Lưu sản phẩm vào mảng
    }
}

// Trả về dữ liệu JSON
echo json_encode($products);

// Đóng kết nối
$conn->close();
?>
