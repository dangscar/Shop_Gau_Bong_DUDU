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
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-details">
                        <h2>${product.name}</h2>
                        <p><strong>Giá:</strong> ${product.price.toLocaleString()} VND</p>
                        <p><strong>Phân loại:</strong> ${product.category}</p>
                        <p><strong>Mô tả:</strong> ${product.description}</p>
                        <p><strong>Tình trạng hàng:</strong> ${product.availability}</p>
                        <div class="action-buttons">
                            <button class="add-cart-btn">THÊM VÀO GIỎ HÀNG</button>
                            <button class="buy-now-btn">MUA NGAY</button>
                        </div>
                    </div>
                `;

                // Thêm sự kiện cho nút "THÊM VÀO GIỎ HÀNG"
                document.querySelector('.add-cart-btn').addEventListener('click', function() {
                    addToCart(product);
                });

                // Thêm sự kiện cho nút "MUA NGAY"
                document.querySelector('.buy-now-btn').addEventListener('click', function() {
                    buyNow(product);
                });

            } else {
                document.getElementById('productDetail').innerHTML = '<p>Không tìm thấy sản phẩm!</p>';
            }
        })
        .catch(error => {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            document.getElementById('productDetail').innerHTML = '<p>Đã xảy ra lỗi khi tải sản phẩm!</p>';
        });

    // Thêm sản phẩm vào giỏ hàng
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(p => p.id === product.id);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showSuccessModal();
    }

    // Mua ngay
    function buyNow(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(p => p.id === product.id);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'cart.html';
    }

    // Hiển thị modal thành công
    function showSuccessModal() {
        const successModal = document.getElementById('successModal');
        successModal.style.display = 'block';
    }

    // Đóng modal khi bấm vào chỗ nào ngoài modal
    window.onclick = function(event) {
        const successModal = document.getElementById('successModal');
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    };

    // Đóng modal khi bấm vào nút đóng
    document.querySelector('.close').onclick = function() {
        document.getElementById('successModal').style.display = 'none';
    };
});
