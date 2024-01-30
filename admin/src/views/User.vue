<template>
    <div class="container">
        <div class="my-5 " v-if="authStore.isLoggedIn">
            <div class="customer-list">
                <h4>
                    Danh sách khách hàng
                    <i class="fa-solid fa-user"></i>
                </h4>
                <div v-for="customer in customers" :key="customer.id" class="customer-item">
                    <div class="customer-info row">
                        <div class="col-3">
                            <h4>{{ customer.name }}</h4>
                        </div>
                        <div class="col-3">
                            <p>Email: {{ customer.email }}</p>
                        </div>
                        <div class="col-3">
                            <p>Số điện thoại: {{ customer.phone }}</p>
                        </div>
                        <div class="col-3">
                            <p>Địa chỉ: {{ customer.address }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import userService from '@/services/user.service';
import { useAuthStore } from '@/store/auth';

export default {
    data() {
        return {
            customers: [

            ],
        };
    },
    computed: {
        authStore() {
            return useAuthStore();
        }
    },
    methods: {
        async getAlluser() {
            try {
                this.customers = await userService.getAll()
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.getAlluser();
    },
};
</script>
  
<style>
.customer-item {
    list-style: none;
}

.customer-info {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}
</style>
  