<template>
    <div class="container">
        <div class="formDangKy my-4">
            <div class="khungDangKy">
                <div class="noidungDangKy">
                    <div class="list-dang-ky m-3">
                        <div class="row">
                            <div class="col-3 tien-trinh">Thông tin đăng ký</div>
                            <div class="col-3 tien-trinh">Thông tin học viên</div>
                            <div class="col-3 tien-trinh">Xem biên lai</div>
                            <div class="col-3 tien-trinh">Thanh toán học phí</div>
                        </div>
                    </div>
                    <div class="thong-tin-dang-ky p-5" :class="{ 'd-none': showThongTinDangKy }">
                        <div class="row">
                            <div class="col-3">
                                <img src="../assets/img/signupclass/toeic.png" alt="">
                            </div>
                            <div class="col-1"></div>
                            <div class="col-4">
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Khóa học:</label>
                                    <label class="ten-dang-ky" for="">{{ myCourse.name }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Mã lớp:</label>
                                    <label class="ten-dang-ky" for="">{{ myClass.tenlop }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Học phí:</label>
                                    <label class="ten-dang-ky" for="">{{ formatCurrency(myCourse.price) }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Lịch học:</label>
                                    <label class="ten-dang-ky" for=""></label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Ngày khai giảng:</label>
                                    <label class="ten-dang-ky" for="">{{ formatDate(myClass.ngaybatdau) }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Địa điểm:</label>
                                    <label class="ten-dang-ky" for=""></label>
                                </div>
                            </div>
                        </div>
                        <div class="btn-bottom d-flex justify-content-between">
                            <div class="btn btn-secondary" @click="huyDangKy">Huỷ đăng ký</div>
                            <div class="btn btn-success" @click="tiepTuc">Tiếp tục</div>
                        </div>
                    </div>
                    <div class="thong-tin-dang-ky p-5" :class="{ 'd-none': !showThongTinDangKy }">
                        <div class="row">
                            <div class="col-5">
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Họ tên học viên:</label>
                                    <label class="ten-dang-ky" for="">{{ authStore.user.name }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Email:</label>
                                    <label class="ten-dang-ky" for="">{{ authStore.user.email }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Nơi sinh:</label>
                                    <label class="ten-dang-ky" for="">{{ authStore.user.email }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="maUuDai">Mã ưu đãi:</label>
                                    <input class="form" type="text" v-model="voucherCode" style="width: 120px;">
                                    <div class="ml-2 btn btn-primary" @click="applyVoucher">Xác nhận</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Ngày sinh:</label>
                                    <label class="ten-dang-ky" for="">{{ formatDate(authStore.user.birthday) }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Số điện thoại:</label>
                                    <label class="ten-dang-ky" for="">{{ authStore.user.phone }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Giới tính:</label>
                                    <label class="ten-dang-ky" for="">{{ authStore.user.gioiTinh }}</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="thong-tin-khoa-hoc">
                                <label class="nhan" for="">Học phí:</label>
                                <label class="ten-dang-ky" for="">{{ formatCurrency(myCourse.price) }}</label>
                                <label v-if="total !== null" class="ten-dang-ky" for="">{{ formatCurrency(this.total)
                                }}</label>
                            </div>
                        </div>
                        <div class="btn-bottom d-flex justify-content-between">
                            <div class="btn btn-primary" @click="quayLai">Quay lại</div>
                            <div class="btn btn-success" @click="tiepTuc">Tiếp tục</div>
                        </div>
                    </div>
                    <div class="thong-tin-dang-ky p-5" :class="{ 'd-none': !showThongTinDangKy }">
                        <div class="row">
                            <div class="col-4">
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Họ tên học viên:</label>
                                    <label class="ten-dang-ky" for="">{{ authStore.user.name }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Email:</label>
                                    <label class="ten-dang-ky" for="">{{ authStore.user.email }}</label>
                                </div>
                            </div>
                            <div class="col-1"></div>
                            <div class="col-4">
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Khóa học:</label>
                                    <label class="ten-dang-ky" for="">{{ myCourse.name }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Mã lớp:</label>
                                    <label class="ten-dang-ky" for="">{{ myClass.tenlop }}</label>
                                </div>
                                <div class="thong-tin-khoa-hoc">
                                    <label class="nhan" for="">Học phí:</label>
                                    <label class="ten-dang-ky" for="">{{ formatCurrency(this.total) }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="btn-bottom d-flex justify-content-between">
                            <div class="btn btn-primary">Quay lại</div>
                            <div class="btn btn-warning" @click="createOrder">Hoàn tất thanh toán</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
</script>

<script>
import ClassService from '@/service/class.service';
import CourseService from '@/service/course.service';
import UserService from '@/service/user.service';
import { useAuthStore } from '@/store/auth';
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            myClass: null,
            myCourse: null,
            showThongTinDangKy: true,
            voucherCode: '',
            total: null,
        };
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
    },
    created() {
        this.getClass();
        this.getCourse();
    },
    methods: {
        async getClass() {
            const className = this.$route.params.className;
            try {
                const response = await ClassService.getClass(className);
                console.log('API Response class:', response);
                if (response) {
                    this.myClass = response;
                } else {
                    console.error('Class data not found.');
                }
            } catch (error) {
                console.error('Error fetching Class ', error);
            }
        },
        async getCourse() {
            const courseName = this.$route.params.courseName;

            try {
                const response = await CourseService.getBySlug(courseName);
                console.log('API Response class:', response);
                if (response) {
                    this.myCourse = response;
                    this.total = response.price;
                } else {
                    console.error('Class data not found.');
                }
            } catch (error) {
                console.error('Error fetching Class ', error);
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
        },
        formatCurrency(price) {
            const formattedPrice = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(price);
            return `${formattedPrice}`;
        },
        quayLai() {

        },
        tiepTuc() {
            this.showThongTinDangKy = !this.showThongTinDangKy;
            console.log(this.showThongTinDangKy)
        },
        async applyVoucher() {
            const voucher = this.voucherCode;
            const courseid = this.myCourse._id;

            try {
                const data = {
                    voucher,
                    courseid
                }
                console.log('data:', data)
                const response = await UserService.getVoucher(data);
                console.log('API Response class:', response);
                if (response) {
                    this.total = response.total;
                    console.log(this.total)
                } else {
                    console.error('Khong tim thay voucher');
                }
            } catch (error) {
                console.error('Loi ap dung voucher ', error);
            }
        },
        async createOrder() {
            try {
                const cookieValue = Cookies.get('token');

                const data = {
                    total: this.total,
                    classid: this.myClass._id,
                    voucher : this.voucherCode
                }

                if (this.authStore.isLoggedIn) {
                    const result = await UserService.crateOrder(cookieValue, data);
                    this.showAddToCartMessage = true;
                    console.log(result);
                }

                if (this.showAddToCartMessage) {
                    window.alert("Thanh toán thành công");
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
};
</script>


<style scoped>
.khungDangKy {
    padding: 1.5% 1.5%;
    background-image: url(../assets/img/signupclass/background.png);
    background-size: cover;
}

.tien-trinh {
    background-color: rgb(236, 73, 73);
    padding: 15px 20px;
    color: white;
}

.thong-tin-dang-ky {
    display: block;
}
</style>
<style scoped>
.d-none {
    display: none;
}
</style>