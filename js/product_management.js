document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);
    
    if (!productId) {
        document.getElementById('productDetail').innerHTML = '<p>Khách iu chưa chọn sản phẩm ó</p>';
        return;
    }

    // Gọi API PHP để lấy chi tiết sản phẩm theo ID
    fetch(`../php/get_product_detail.php?id=${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(product => {
            if (product && product.id) {
                // Hiển thị thông tin sản phẩm
                document.getElementById('productDetail').innerHTML = `
                    <div class="product-info">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="upload-container">
                                <button class="upload-btn">Tải lên hình ảnh</button>
                            </div>
                        </div>
                        <div class="product-details">
                            <h2><input type="text" value="${product.name}" id="productName"></h2>
                            <p><strong>Giá:</strong> <input type="number" value="${product.price}" id="productPrice"> VND</p>
                            <p><strong>Phân loại:</strong> <input type="text" value="${product.category}" id="productCategory"></p>
                            <p><strong>Mô tả:</strong> <textarea id="productDescription">${product.description}</textarea></p>
        
                            <p><strong>Tình trạng hàng:</strong> 
                                <select id="productAvailability">
                                    <option value="Còn hàng" ${product.availability === "Còn hàng" ? "selected" : ""}>Còn hàng</option>
                                    <option value="Hết hàng" ${product.availability === "Hết hàng" ? "selected" : ""}>Hết hàng</option>
                                </select>
                            </p>
                            <div class="action-buttons">
                                <button class="cancel-btn">Huỷ</button>
                                <button class="update-btn" onclick="showEditLinks()">Cập nhật</button>
                                <button class="save-btn">Lưu mới</button>
                                <button class="delete-btn">Xoá</button>
                            </div>
                        </div>
                    </div>
                `;

                // Thêm sự kiện cho các nút
                document.querySelector('.cancel-btn').addEventListener('click', function() {
                    // Trở về trang chủ quản lý
                    window.location.href = 'home_admin.html';
                });

                document.querySelector('.save-btn').addEventListener('click', function() {
                    saveProductChanges(productId);
                });

                document.querySelector('.delete-btn').addEventListener('click', function() {
                    deleteProduct(productId);
                });

            } else {
                document.getElementById('productDetail').innerHTML = '<p>Không tìm thấy sản phẩm!</p>';
            }
        })
        .catch(error => {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            document.getElementById('productDetail').innerHTML = '<p>Đã xảy ra lỗi khi tải sản phẩm!</p>';
        });

    // Hàm hiển thị các trường có thể chỉnh sửa
    function showEditLinks() {
        document.querySelectorAll('.edit-link').forEach(link => {
            link.style.display = 'inline';
        });
    }

    // Hàm lưu thay đổi sản phẩm
    function saveProductChanges(productId) {
        // Lấy thông tin sản phẩm từ form hoặc DOM
        const productData = {
            id: productId,
            name: document.getElementById('product-name-input').value,
            price: document.getElementById('product-price-input').value,
            category: document.getElementById('product-category-input').value,
            description: document.getElementById('product-description-input').value,
            availability: document.getElementById('product-status-input').value
        };

        // Gửi yêu cầu cập nhật đến PHP
        fetch(`../php/update_product.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Sản phẩm đã được cập nhật thành công!');
                window.location.reload();
            } else {
                alert('Có lỗi xảy ra khi cập nhật sản phẩm.');
            }
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            alert('Đã xảy ra lỗi khi cập nhật sản phẩm.');
        });
    }

    // Hàm xoá sản phẩm
    function deleteProduct(productId) {
        if (confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?')) {
            fetch(`../php/delete_product.php?id=${productId}`, {
                method: 'POST'
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Sản phẩm đã bị xoá.');
                    window.location.href = 'product_management.html';
                } else {
                    alert('Có lỗi xảy ra khi xoá sản phẩm.');
                }
            })
            .catch(error => {
                console.error('Lỗi khi xoá sản phẩm:', error);
                alert('Đã xảy ra lỗi khi xoá sản phẩm.');
            });
        }
    }
});
