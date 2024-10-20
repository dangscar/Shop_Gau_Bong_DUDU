document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product-item');
    const pagination = document.getElementById('pagination');
    const productsPerPage = 4;
    const totalPages = Math.ceil(products.length / productsPerPage);
    let currentPage = 1;

    function showPage(page) {
        // Giới hạn trang trong khoảng 1 đến totalPages
        if(page < 1) page = 1;
        if(page > totalPages) page = totalPages;

        currentPage = page;

        // Ẩn tất cả sản phẩm
        products.forEach(product => {
            product.style.display = 'none';
        });

        // Hiển thị các sản phẩm cho trang hiện tại
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        for(let i = start; i < end && i < products.length; i++) {
            products[i].style.display = 'block';
        }

        // Cập nhật active class cho phân trang
        const pageLinks = pagination.querySelectorAll('a');
        pageLinks.forEach(link => {
            link.classList.remove('active');
        });
        pagination.querySelector(`a[data-page="${page}"]`).classList.add('active');
    }

    function createPagination() {
        // Nút "«" để quay lại trang trước
        const prev = document.createElement('a');
        prev.innerHTML = '&laquo;';
        prev.href = '#';
        prev.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(currentPage - 1);
        });
        pagination.appendChild(prev);

        // Tạo các nút số trang
        for(let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.innerHTML = i;
            pageLink.href = '#';
            pageLink.setAttribute('data-page', i);
            if(i === 1) pageLink.classList.add('active');
            pageLink.addEventListener('click', function(e) {
                e.preventDefault();
                showPage(i);
            });
            pagination.appendChild(pageLink);
        }

        // Nút "»" để chuyển tới trang tiếp theo
        const next = document.createElement('a');
        next.innerHTML = '&raquo;';
        next.href = '#';
        next.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(currentPage + 1);
        });
        pagination.appendChild(next);
    }

    // Khởi tạo phân trang và hiển thị trang đầu tiên
    createPagination();
    showPage(1);
});
