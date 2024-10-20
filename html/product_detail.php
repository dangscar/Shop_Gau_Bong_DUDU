<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DuDu Store | THÔNG TIN SẢN PHẨM</title>
    <!-- Link tới file CSS chính -->
    <link rel="stylesheet" href="../css/XemttSP.css">
    <!-- Link đến CSS cho modal logout -->
    <link rel="stylesheet" href="../css/successModal.css">
    <!-- Thêm favicon vào tab trình duyệt -->
    <link rel="icon" href="../images/favicon.png" type="image/png"> <!-- Đường dẫn đến favicon -->
</head>

<body>
    <div class="container">
        <header>
            <div class="top-bar">
                <div class="contact-info">
                    <img src="../images/phone-icon.png" alt="Phone Icon" class="phone-icon"><!--icon phone-->
                    <span>0923456789</span>
                </div>
                <nav>
                    <a href="../html/home_customer.php">TRANG CHỦ</a>
                    <a href="../html/cart.html">GIỎ HÀNG</a>
                    <a href="../html/xemlichsudh.html">ĐƠN MUA</a>    
                    <a href="../html/TTcanhan.html">THÔNG TIN CÁ NHÂN</a>
                    <a href="#" id="logout">ĐĂNG XUẤT</a>
                </nav>
            </div>
            <div class="separator"></div>
            <div class="header-title">
                <img src="../images/logo-store2.png" alt="Logo" class="logo">
                <h1>DuDu Store</h1>
            </div>
            <div class="search-container">
                <input type="text" placeholder="Tìm kiếm" class="search-box">
            </div>
        </header>

        <div class="product-info" id="productDetail">
            <!-- Thông tin sản phẩm sẽ được hiển thị ở đây -->
        </div>


        <footer class="footer">
            <div class="footer-row">
                <div class="footer-col">
                    <h4>LIÊN HỆ</h4>
                    <p>Số điện thoại: 0923456789</p>
                    <p>Địa chỉ: 123, Nguyễn Văn Cừ, P.An Hòa, Q.Ninh Kiều, TP Cần Thơ</p>
                    <div class="social-icons">
                        <img src="../images/zalo-icon.png" alt="Zalo">
                        <img src="../images/facebook-icon.png" alt="Facebook">
                    </div>
                </div>
                <div class="footer-col">
                    <h4>HỖ TRỢ KHÁCH HÀNG</h4>
                    <ul>
                        <li>Hướng dẫn mua hàng</li>
                        <li>Chính sách đổi trả</li>
                        <li>Cách chúng tôi gửi bé yêu đến bạn</li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>DUDU STORE</h4>
                    <ul>
                        <li>Về chúng tôi</li>
                        <li>Bảng giá</li>
                        <li>Thông tin sản phẩm</li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
    <!-- Modal Xác Nhận Đăng Xuất -->
    <div id="successModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p id="modalMessage">Sản phẩm đã được thêm vào giỏ hàng!</p>
        </div>
    </div>
    
    <!-- Kết nối các tệp JavaScript -->
    <script src="../js/productDetail.js" defer></script>
</body>
</html>
