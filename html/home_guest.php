<?php
    include "conn.php";

    //Tìm kiếm
    if (isset($_GET['search'])) {
        $search = $_GET['search'];
        $query_search = "AND p.product_name LIKE '%$search%'";
    } else {
        $search = "";
        $query_search = "";
    }

    //Danh mục
    if (isset($_GET['danhmuc'])) {
        $danhmuc = $_GET['danhmuc'];
        $query_add_danh_muc = "AND c.id = $danhmuc";
    } else {
        $danhmuc = 0;
        $query_add_danh_muc = "";
    }

    // Lọc theo giá
    if (isset($_GET['filter'])) {
        $filter = $_GET['filter'];
    } else {
        $filter = "ASC";
    }

    // Phân trang
    $limit = 4;
    if(isset($_GET['page'])) {
        $page = $_GET['page'];
    } else {
        $page = 1;
    }

    if($page == 1) {
        $begin = 0;
    } else {
        $begin = ($page * $limit) - $limit; //Công thức lấy sản phẩm từ vị trí đầu tiên
    }

    //Query danh mục
    $query_danhmuc = "SELECT * FROM categories";
    $data_danh_muc = mysqli_query($conn, $query_danhmuc);
    
    //Query sản phẩm
    $query = "SELECT p.id, p.product_name, p.price, p.image, p.status FROM products p, categories c WHERE p.category_id = c.id $query_add_danh_muc $query_search ORDER BY p.price $filter LIMIT $begin,$limit";
    $data = mysqli_query($conn, $query);
    
?>


<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DuDu Store | Trang chủ</title>
    <link rel="stylesheet" href="../css/home.css">
        <!-- Thêm favicon vào tab trình duyệt -->
        <link rel="icon" href="../images/favicon.png" type="image/png"> <!-- Đường dẫn đến favicon -->
</head>
<body>
    <header>
        <div class="top-bar">
            <div class="contact-info">
                <img src="../images/phone-icon.png" alt="Phone Icon" class="phone-icon">
                <span>0923456789</span>
            </div>
            <nav>
                <a href="../html/home_guest.php">TRANG CHỦ</a>
                <a href="../html/login.html">GIỎ HÀNG</a>
                <a href="../html/login.html">ĐĂNG NHẬP</a>
                <a href="../html/register.html">ĐĂNG KÝ</a>
            </nav>
        </div>
        <div class="separator"></div> <!-- Phần tử phân cách -->
        <div class="header-title">
            <img src="../images/logo-store2.png" alt="Logo" class="logo">
            <h1>DuDu Store</h1>
        </div>
        <div class="search-container"> 
            <input name="search" id="input_search" type="text" placeholder="Tìm kiếm" class="search-box" value="<?php echo $search?>"> 
        </div>
    </header>
    <main>
        <div class="sidebar">
            <h2>Danh mục sản phẩm</h2>
            <ul id="list">
                <?php //Load danh mục ---------------------------------------------------------------------------
                    while($row = mysqli_fetch_assoc($data_danh_muc)) { ?>
                        <li <?php if ($danhmuc == $row['id']) echo 'style="background-color: green;"';?> 
                         onclick = "danhmucItem(<?php echo $row['id']?>)">
                            <?php echo $row['name'];?>
                        </li>
                <?php        
                    } //------------------------------------------------------------------------------------------
                ?>
                
            </ul>
        </div>
        <div class="products">
            <h3>Hiển thị kết quả:</h3>
            <form id="form-filter" action="home_guest.php" method='get'>
                <div class="sort-filter">
                    <!-- Lọc giá trị ------------------------------------------------------------------------------- -->
                    <select name ="filter" class = "select-filter" onchange = "document.getElementById('form-filter').submit()">
                        <?php if ($filter == "ASC") { ?>
                        <option value="ASC">Lọc theo giá: từ thấp đến cao</option>
                        <option value="DESC">Lọc theo giá: từ cao đến thấp</option>
                        <?php 
                    } else {?>
                        <option value="DESC">Lọc theo giá: từ cao đến thấp</option>
                        <option value="ASC">Lọc theo giá: từ thấp đến cao</option>
                    <?php
                        } 
                    ?> 
                    </select>
                    <!-- -------------------------------------------------------------------------------------- -->
                </div>

                <!-- Gửi thêm giá trị danh mục khi lọc -->
                <?php 
                    if ($danhmuc != 0) {?>
                    <input type="hidden" name="danhmuc" value="<?php echo $danhmuc?>">
                <?php    
                    }
                ?>

                <!-- Gửi thêm giá trị tìm kiếm khi lọc -->
                <?php 
                    if ($search != "") {?>
                    <input type="hidden" name="search" value="<?php echo $search?>">
                <?php    
                    }
                ?>
                
            </form>
            

            <div class="product-grid" id="productGrid">
                <?php //Load sản phẩm
                    while($row = mysqli_fetch_assoc($data)){      
                ?>
                <div class="product-item" onclick="redirectWithId(<?php echo $row['id']?>)">
                    <img src=
                    <?php
                        echo $row['image'];
                    ?>
                         alt="Chó Shiba">
                    <p>
                        <?php
                            echo $row['product_name'];
                        ?>
                    </p>
                    <span>
                    <?php
                        echo $row['price'];
                    ?>đ
                    </span>
                    <button>Mua</button>
                </div>
                <?php
                    }
                ?>
                <!-- <div class="product-item">
                    <img src="../images/gau-miniso.jpg" alt="Gấu Miniso">
                    <p>Gấu Miniso</p>
                    <span>250.000</span>
                    <button>Mua</button>
                </div> -->
                
            </div>
            <div class="pagination" id="paginationContainer">
                <!-- Phân trang sẽ được tạo tự động -->
                 <?php
                    $query_trang = "SELECT p.id, p.product_name, p.price, p.image, p.status FROM products p, categories c WHERE p.category_id = c.id $query_add_danh_muc $query_search ORDER BY p.price $filter"; // Câu lệnh truy vấn
                    $sql_trang = mysqli_query($conn,$query_trang);  // Dữ liệu sau khi truy vấn
                    $row_count = mysqli_num_rows($sql_trang); //Số dòng dữ liệu
                    $page_count = ceil($row_count/$limit); //Số trang
                 ?>

                  <!-- Hiển thị icon first page   -->
                <?php
                    if ($page > 2) {
                        $first_page = 1;
                ?>
                    <a href='home_guest.php?page=<?php echo $first_page?>' class="product-link">
                        <span><<</span>
                    </a>
                <?php
                    }
                ?>    
                
                <!-- Hiển thị từng số phân trang -->
                 <?php
                    for($i = 1; $i <= $page_count; $i++) { 
                      if($i > $page-2 && $i < $page + 2) {?>
                            <a <?php if($page == $i) echo 'style="background:green";' ?>  href='home_guest.php?page=<?php echo $i?>&filter=<?php echo $filter?>&search=<?php echo $search;?>
                            <?php if($query_add_danh_muc != "") {?>
                                &danhmuc=<?php echo $danhmuc?>
                             <?php
                            }?>' 
                            class="product-link">
                            <span><?php echo $i?></span>
                            </a>
                      <?php
                      }
                 ?>
                <?php
                    }
                ?>

                <!-- Hiển thị icon last page -->
                <?php
                    if ($page < $page_count-1) {
                        $end_page = $page_count;
                        ?>
                        <a href='home_guest.php?page=<?php echo $end_page?>' class="product-link">
                            <span>>></span>
                        </a>
                <?php
                    }   
                ?>

            </div>
        </div>
    </main>
    <footer>
        <div class="footer-column">
            <h4>LIÊN HỆ</h4>
            <p>Số điện thoại: 0923456789</p>
            <p>Địa chỉ: 123, Nguyễn Văn Cừ, P.An Hòa, Q.Ninh Kiều, TP Cần Thơ</p> 
            <div class="social-icons">
                <img src="../images/zalo-icon.png" alt="Zalo">
                <img src="../images/facebook-icon.png" alt="Facebook">
            </div>
        </div>
        <div class="footer-column">
            <h4>HỖ TRỢ KHÁCH HÀNG</h4>
            <ul>
                <li>Hướng dẫn mua hàng</li>
                <li>Chính sách đổi trả</li>
                <li>Cách chúng tôi gửi bé yêu đến bạn</li>
            </ul>
        </div>
        <div class="footer-column">
            <h4>DUDU STORE</h4>
            <ul>
                <li>Về chúng tôi</li>
                <li>Bảng giá</li>
                <li>Thông tin sản phẩm</li>
            </ul>
        </div>
    </footer>

    <!-- Link tới file JavaScript -->
    <!-- <script src="../js/pagination_home.js"></script> -->

    <script>
        // Gửi giá trị danh mục lên php
        function danhmucItem(idDanhMuc) {
            if (idDanhMuc == <?php echo $danhmuc?>) {
                idDanhMuc = 0
            }
            var url = ""; 
            if (idDanhMuc != 0) {
                url = "danhmuc=" + encodeURIComponent(idDanhMuc)+"&"
            }
            window.location.href = "home_guest.php?"+
            url+
            "filter=<?php echo $filter?>"+
            "&search=<?php echo $search?>";
        }
    </script>
    <script>
        // Gửi giá trị lọc lên php
        function locgt(gt) {
            window.location.href = "home_guest.php?danhmuc= <?php echo $danhmuc?>" +"&filter="+encodeURIComponent(gt);
        }
    </script>
    <script>
        const input = document.getElementById("input_search")
        input.addEventListener('keydown', function(event){
            var danhmuc = ""
            <?php 
                if ($danhmuc != 0) {?>
                    danhmuc = "&danhmuc=<?php echo $danhmuc?>"
                <?php
                }
            ?>
            if (event.key === 'Enter') {
                const search = input.value;
                window.location.href = "home_guest.php?search="+
                encodeURIComponent(search)+
                danhmuc+ 
                "&filter=<?php echo $filter?>";
            }
        })
    </script>
    <script>
        function redirectWithId(id) {
            window.location.href = "product_detail.php?id=" +encodeURIComponent(id);
        }
    </script>
    
</body>
</html>
