import { defineStore } from 'pinia';
import UserService from '@/services/user.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null
  }),
  actions: {
    async loginTeacher({ email, password }) {
      try {
        const response = await UserService.login({ email, password });
        if (response && response.token) {
          // Lưu thông tin người dùng vào Local Storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.isLoggedIn = true;
          this.user = response.user;
          
          console.log("Đăng nhập thành công");
        } else {
          this.isLoggedIn = false;
          this.user = null;
          this.error = response ? response.message : 'Đăng nhập không thành công';
        }
      } catch (error) {
        console.error("Đăng nhập không thành công", error);
        this.isLoggedIn = false;
        this.error = 'Đăng nhập không thành công';
      }
    },
    logout() {
      // Xóa token và thông tin người dùng từ Local Storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      this.isLoggedIn = false;
      this.user = null;
      this.error = '';
    },
    checkLoginStatus() {
      // Kiểm tra xem có token trong Local Storage không
      const token = localStorage.getItem('token');
      if (token) {
        // Nếu có, đánh dấu là đã xác thực và đăng nhập thành công
        this.isLoggedIn = true;

        // Lấy thông tin người dùng từ Local Storage
        const userString = localStorage.getItem('user');
        if (userString) {
          this.user = JSON.parse(userString);
        }

        console.log("Đã xác thực");
      }
    },
  },
});
