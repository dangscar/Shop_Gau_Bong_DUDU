<?php
// Kết nối cơ sở dữ liệu
include 'config.php';

// Lấy ID sản phẩm từ request
$product_id = $_GET['id'];

// Xoá sản phẩm
$sql = "DELETE FROM products WHERE id='$product_id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>
