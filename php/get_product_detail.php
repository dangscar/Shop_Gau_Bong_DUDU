<?php
include 'config.php'; // Kết nối CSDL

// Kiểm tra nếu có ID sản phẩm được gửi lên
if (isset($_GET['id'])) {
    $productId = intval($_GET['id']);

    // Truy vấn chi tiết sản phẩm dựa vào ID
    $query = "SELECT * FROM products WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Lấy sản phẩm và trả về JSON
        $product = $result->fetch_assoc();
        echo json_encode($product);
    } else {
        echo json_encode(null);
    }

    $stmt->close();
} else {
    echo json_encode(null);
}

$conn->close();
?>
