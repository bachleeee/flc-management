<template>
    <div class="container">
        <div class="khungDangKy my-4">
            <div class="noidungDangKy">
                <div class="list-dang-ky m-3">
                    <div class="row d-flex justify-content-center">
                        <div class="col-2 tien-trinh " :class="{ 'isHere': currentPage == 1 }"><i
                                class="mr-2 fa fa-calendar"></i>Thông tin đăng ký</div>
                        <div class="col-1 gach-noi align-self-center"></div>
                        <div class="col-2 tien-trinh" :class="{ 'isHere': currentPage == 2 }"><i
                                class="mr-2 fa fa-address-book"></i>Thông tin học viên</div>
                        <div class="col-1 gach-noi align-self-center"></div>
                        <div class="col-2 tien-trinh" :class="{ 'isHere': currentPage == 3 }"><i
                                class="mr-2 fa fa-usd"></i>Thanh toán học phí</div>
                    </div>
                </div>
                <div id="Trang_1" class="thong-tin-dang-ky p-5" :class="{ 'd-none': currentPage !== 1 }">
                    <div class="row">
                        <div class="col-3">
                            <img src="../assets/img/signupclass/toeic.png" alt="">
                        </div>
                        <div class="col-1"></div>
                        <div class="col-5">
                            <div class="thong-tin-khoa-hoc">
                                <label class="nhan" for="">Khóa học:</label>
                                <label class="ten-dang-ky" for="">{{ myCourse.name }}</label>
                            </div>
                            <div class="thong-tin-khoa-hoc">
                                <label class="nhan" for="">Mã lớp:</label>
                                <label class="ten-dang-ky" for="">{{ myClass.tenlop }}</label>
                            </div>
                            <div class="thong-tin-khoa-hoc">
                                <label class="nhan" for="">Học phí (tạm tính):</label>
                                <label class="ten-dang-ky" for="" style="color: red;">{{ formatCurrency(myCourse.price)
                                    }}</label>
                            </div>
                            <div class="thong-tin-khoa-hoc">
                                <label class="nhan" for="">Lịch học:</label>
                                <label class="ten-dang-ky" for="">Thứ {{ formattedDays(myClass.thu) }}</label>
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
                        <div class="btn btn-success" @click="chuyenTrang(2)">Tiếp tục</div>
                    </div>
                </div>
                <div id="Trang_2" class="thong-tin-dang-ky p-5" :class="{ 'd-none': currentPage !== 2 }">
                    <div class="row">
                        <div class="col-3">
                            <img src="../assets/img/signupclass/toeic.png" alt="">
                        </div>
                        <div class="col-1"></div>
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
                                <label class="nhan" for="">Ngày sinh:</label>
                                <label class="ten-dang-ky" for="">{{ formatDate(authStore.user.birthday) }}</label>
                            </div>
                            <div class="thong-tin-khoa-hoc">
                                <label class="nhan" for="">Số điện thoại:</label>
                                <label class="ten-dang-ky" for="">{{ authStore.user.phone }}</label>
                            </div>
                            <div class="thong-tin-khoa-hoc">
                                <label class="nhan" for="maUuDai">Mã ưu đãi (nếu có):</label>
                                <input class="form" type="text" v-model="voucherCode" style="width: 120px;">
                                <div class="ml-2 btn btn-primary" @click="applyVoucher">Xác nhận</div>
                            </div>
                            <div class="thong-tin-khoa-hoc">
                                <label class="nhan" for="">Học phí:</label>
                                <label v-if="total !== null" class="ten-dang-ky" for=""
                                    style="color">{{ formatCurrency(this.total) }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="btn-bottom d-flex justify-content-between">
                        <div class="btn btn-primary" @click="chuyenTrang(1)">Quay lại</div>
                        <div class="btn btn-success" @click="chuyenTrang(3)">Tiếp tục</div>
                    </div>
                </div>
                <div id="Trang_3" class="thong-tin-dang-ky p-5" :class="{ 'd-none': currentPage !== 3 }">
                    <div class="row mb-2">
                        <div class="col-3">
                            <img src="../assets/img/signupclass/toeic.png" alt="">
                        </div>
                        <div class="col-1"></div>
                        <div class="col-5">
                            <div class="thong-tin-khoa-hoc">
                                <label class="nhan" for="">Họ tên học viên:</label>
                                <label class="ten-dang-ky" for="">{{ authStore.user.name }}</label>
                            </div>
                            <div class="thong-tin-khoa-hoc">
                                <label class="nhan" for="">Email:</label>
                                <label class="ten-dang-ky" for="">{{ authStore.user.email }}</label>
                            </div>
                            <div class="col-1"></div>
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
                                <label id="" class="ten-dang-ky">{{ formatCurrency(this.total) }}</label>
                            </div>

                        </div>
                    </div>
                    <div class="btn-bottom d-flex justify-content-between">
                        <div class="btn btn-primary" @click="chuyenTrang(2)">Quay lại</div>
                        <div class="btn btn-warning" @click="createOrder">Hoàn tất thanh toán</div>
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
import AnounceService from "@/service/announce.service";

import { useAuthStore } from '@/store/auth';
export default {
    data() {
        return {
            myClass: null,
            myCourse: null,
            voucherCode: '',
            total: null,
            currentPage: 1,
        };
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
    },
    watch: {
        '$route.params.slug': 'loadDetails',
    },
    methods: {
        async loadDetails() {
            const slug = this.$route.params.courseName;
            try {
                const response = await CourseService.getBySlug(slug);
                console.log('API Response course:', response);
                if (response) {
                    this.myCourse = response;
                    this.total = this.myCourse.price;
                    const className = this.$route.params.className;
                    try {
                        const myResponse = await ClassService.getClass(className);
                        console.log('API myResponse class:', myResponse);
                        if (myResponse) {
                            this.myClass = myResponse;
                        } else {
                            console.error('Class data not found.');
                        }

                    } catch (error) {
                        console.error('Error fetching Class ', error);
                    }
                } else {
                    console.error('Course data not found.');
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
                if (error.response && error.response.status === 404) {
                    console.error('Course not found (404).');
                }
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
        },

        formattedDays(days) {
            const daysOfWeek = ['Chủ nhật', '2', '3', '4', '5', '6', '7'];
            const selectedDays = days.map(day => daysOfWeek[day]);
            return selectedDays.join(', ');
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
        chuyenTrang(page) {
            this.currentPage = page;
        },
        async applyVoucher() {
            const voucher = this.voucherCode;
            const courseid = this.myCourse._id;

            try {
                const data = {
                    courseid
                }
                console.log('data:', data)
                const response = await UserService.getVoucher(data);
                if (response) {
                    this.total = response.total;

                    window.alert("Áp dụng voucher thành công")
                } else {
                    console.error('Khong tim thay voucher');
                }
            } catch (error) {
                console.error('Loi ap dung voucher ', error);
            }
        },
        async createOrder() {
            try {
                const token = localStorage.getItem('token');
                const data = {
                    total: this.total,
                    className: this.myClass.tenlop,
                    courseName: this.myCourse.name,
                    voucher: this.voucherCode
                }

                if (this.authStore.isLoggedIn) {
                    const result = await UserService.createOrder(token, data);
                    if (result) {
                        console.log("Đăng ký lớp thành công:", result);

                        const dataAnnounce = {
                            noiDung: `${this.authStore.user.name} đã đăng ký lớp ${this.myClass.tenlop}`,
                            toUsers: [{ id: "65940aa9f25be141f8c3f83f" }] 
                        };
                        window.alert("Đăng ký thành công!");
                        await AnounceService.create(token, dataAnnounce);
                    } else {
                        console.error("Lỗi khi đăng ký lớp.");
                    }
                } else {
                    console.error("Người dùng chưa đăng nhập.");
                }
            } catch (error) {
                console.error("Lỗi khi tạo đơn hàng:", error);
            }
        }

    },
    created() {
        this.loadDetails();
    },
};
</script>


<style scoped>
.khungDangKy {
    padding: 1.5% 1.5%;
    background-image: url(../assets/img/signupclass/background.png);
    background-size: cover;
}

.noidungDangKy {
    position: relative;
}

.noidungDangKy::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(38, 37, 37, 0.5);
    /* Điều chỉnh giá trị trong suốt tại đây */
    z-index: -1;
    /* Đặt z-index để nó nằm dưới phần tử chính */
}

.tien-trinh {
    background-color: rgb(236, 73, 73);
    padding: 15px 8px;
    color: white;
}

.fa {
    font-size: 22px;
}

.gach-noi {
    background-color: rgb(236, 73, 73);
    height: 5px;
}

.thong-tin-dang-ky {
    display: block;
}

.d-none {
    display: none;
}

.isHere {
    background-color: white;
    color: black;
}

.nhan {
    font-weight: normal;
}

.thong-tin-khoa-hoc .nhan {
    width: 160px;
}
</style>