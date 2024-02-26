<template>
    <footer class="footer">
        <div class="container text-center">
            <div class="row align-items-end">
                <div class="col">
                    <h3>DỊCH VỤ</h3>
                    <ul>
                        <li><a href="#">Điều khoản sử dụng</a></li>
                        <li><a href="#">Chính sách bảo mật thông tin cá nhân</a></li>
                        <li><a href="#">Chính sách bảo mật thanh toán</a></li>
                        <li><a href="#">Giới thiệu Fahasa</a></li>
                        <li><a href="#">Hệ thống trung tâm - nhà sách</a></li>
                    </ul>
                </div>
                <div class="col">
                    <h3>HỖ TRỢ</h3>
                    <ul>
                        <li><a href="#">Chính sách đổi - trả - hoàn tiền</a></li>
                        <li><a href="#">Chính sách bảo hành - bồi hoàn</a></li>
                        <li><a href="#">Chính sách vận chuyển</a></li>
                        <li><a href="#">Chính sách khách sỉ</a></li>
                        <li><a href="#">Phương thức thanh toán và xuất HĐ</a></li>
                    </ul>
                </div>
                <div class="col">
                    <h3>TÀI KHOẢN CỦA TÔI</h3>
                    <ul>
                        <li><a href="#">Đăng nhập/Tạo mới tài khoản</a></li>
                        <li><a href="#">Thay đổi địa chỉ khách hàng</a></li>
                        <li><a href="#">Chi tiết tài khoản</a></li>
                        <li><a href="#">Lịch sử mua hàng</a></li>
                    </ul>
                </div>
                <div class="col">
                    <h3>Theo dõi fanpage</h3>
                    <ul>
                        <li><a href="#" target="_blank"><i class="fab fa-facebook"></i> Facebook</a></li>
                        <li><a href="#" target="_blank"><i class="fab fa-youtube"></i> YouTube</a></li>
                        <li><a href="#" target="_blank"><i class="fab fa-google"></i> Google</a></li>
                    </ul>
                </div>

            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #f7f6f6;
    padding: 20px;
    display: flex;
    flex-direction: column;
    min-height: 40vh;
    left: 0;
    bottom: 0;
    width: 100%;
}

.row {
    display: flex;
}

.col {
    text-align: center;
    flex: 1;
}

.col h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #c92127;
}

.col ul {
    list-style: none;
    padding: 0;
}

.col li {
    margin: 5px 0;
}

.col a {
    color: rgb(0, 0, 0);
    text-decoration: none;
    transition: border-bottom 0.3s ease;
}

.col a:hover {
    border-bottom: 1px solid white;
}
</style>
