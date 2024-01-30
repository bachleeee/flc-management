<template>
    <div class="container">
        <div class="login-page">
            <div class="login-container py-5">
                <form @submit="register" :validation-schema="contactFormSchema">
                    <div class="d-flex justify-content-center pb-1">
                        <h4>Chào mừng</h4>
                    </div>
                    <div class="form-group">
                        <label for="name">Họ và tên</label>
                        <input type="text" class="form-control" v-model="name" placeholder="Nhập họ và tên của bạn">
                        <ErrorMessage name="name" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="email">Địa chỉ Email</label>
                        <input type="email" class="form-control" v-model="email" placeholder="Nhập địa chỉ email">
                        <ErrorMessage name="email" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu</label>
                        <input type="password" class="form-control" v-model="password" placeholder="Nhập mật khẩu">
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Nhập lại mật khẩu</label>
                        <input type="password" class="form-control" v-model="confirmPassword"
                            placeholder="Nhập lại mật khẩu">
                        <ErrorMessage name="confirmPassword" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="address">Địa chỉ</label>
                        <input type="text" class="form-control" v-model="address" placeholder="Nhập địa chỉ của bạn">
                        <ErrorMessage name="address" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="phoneNumber">Số điện thoại</label>
                        <input type="tel" class="form-control" v-model="phoneNumber"
                            placeholder="Nhập số điện thoại của bạn">
                        <ErrorMessage name="phone" class="error-feedback" />
                    </div>

                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-dark">Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import UserService from '@/service/user.service';
import * as yup from 'yup';
import { ErrorMessage } from "vee-validate";

export default {
    components: {
        ErrorMessage
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            phoneNumber: '',
            passwordsMatch: true,
            contactFormSchema
        };
    },
    methods: {
        validatePasswordMatch() {
            this.passwordsMatch = this.password === this.confirmPassword;
        },
        async register() {
            try {
                await UserService.create({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    address: this.address,
                    phoneNumber: this.phoneNumber,
                });

                // Xử lý response ở đây nếu cần
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
  
<style scoped>
/* Thêm CSS theo ý muốn */
</style>
  
<style>
.login-page {
    background-color: #f7f7f7;
    height: 110vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-container {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 400px;
}

label {
    font-weight: bold;
}

.form-control {
    border: 1px solid #ccc;
    border-radius: 3px;
}

.btn-primary {
    background-color: #007bff;
    border: none;
    border-radius: 3px;
}

.btn-primary:hover {
    background-color: #0056b3;
    color: #fff;
}
</style>