document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.getElementById('productGrid');
    const paginationContainer = document.getElementById('paginationContainer');
    const itemsPerPage = 12;
    let currentPage = 1;
    let products = []; // Biến để lưu trữ sản phẩm từ API

    // Gọi API PHP để lấy dữ liệu sản phẩm
    function fetchProducts() {
        fetch('../php/get_products.php')
            .then(response => response.json())
            .then(data => {
                products = data; // Lưu sản phẩm vào biến products
                displayProducts();
                createPagination();
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }

    // Hàm hiển thị sản phẩm cho trang hiện tại
    function displayProducts() {
        productGrid.innerHTML = ''; // Xóa nội dung trước đó

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToDisplay = products.slice(startIndex, endIndex);

        productsToDisplay.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';

            // Thêm thẻ <a> bao quanh toàn bộ thông tin sản phẩm
            productItem.innerHTML = `
                <a href='product_management.html?id=${product.id}' class="product-link">
                    <div class="product-info">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="text-info">
                            <p>${product.name}</p>
                            <span>${product.price.toLocaleString()} VND</span>
                            <button onclick="location.href='product_management.html?id=${product.id}'">Sửa</button>
                        </div>
                    </div>
                </a>
            `;
            productGrid.appendChild(productItem);
        });
    }

    // Hàm tạo các nút phân trang
    function createPagination() {
        paginationContainer.innerHTML = ''; // Xóa nội dung trước đó

        const totalPages = Math.ceil(products.length / itemsPerPage);
        const maxVisiblePages = 4; // Số lượng trang tối đa hiển thị

        // Tính toán các trang bắt đầu và kết thúc để hiển thị
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Điều chỉnh startPage nếu endPage được điều chỉnh
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Nút quay lại trang trước
        if (currentPage > 1) {
            const prev = document.createElement('a');
            prev.innerHTML = '&laquo;';
            prev.href = '#';
            prev.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage--;
                displayProducts();
                createPagination();
            });
            paginationContainer.appendChild(prev);
        }

        // Các nút trang
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = document.createElement('a');
            pageLink.innerText = i;
            pageLink.href = '#';
            pageLink.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                displayProducts();
                createPagination();
            });
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            paginationContainer.appendChild(pageLink);
        }

        // Nút chuyển tới trang tiếp theo
        if (currentPage < totalPages) {
            const next = document.createElement('a');
            next.innerHTML = '&raquo;';
            next.href = '#';
            next.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage++;
                displayProducts();
                createPagination();
            });
            paginationContainer.appendChild(next);
        }
    }

    // Gọi hàm lấy sản phẩm khi trang được load
    fetchProducts();
});
