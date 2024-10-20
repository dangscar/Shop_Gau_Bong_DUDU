<?php
// Kết nối cơ sở dữ liệu
include 'config.php';

// Lấy dữ liệu từ request
$data = json_decode(file_get_contents('php://input'), true);

$product_id = $data['id'];
$product_name = $data['name'];
$product_price = $data['price'];
$product_category = $data['category'];
$product_description = $data['description'];
$product_availability = $data['availability'];

// Cập nhật sản phẩm
$sql = "UPDATE products SET 
        name='$product_name', 
        price='$product_price', 
        category='$product_category', 
        description='$product_description', 
        availability='$product_availability' 
        WHERE id='$product_id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>
