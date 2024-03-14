<template>
    <div class="container-xxl ">
        <div class="p-4">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="bg-white p-3 rounded">
                        <div class="container my-4 d-flex flex-column align-items-center">
                            <h4>Thêm người dùng mới</h4>
                            <UserForm class="py-4" :user="user" @submit:user="createUser"
                                :isRoleFieldDisabled="isRoleFieldDisabled" />
                            <p>{{ message }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/user.service";
export default {
    components: {
        UserForm,
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                role: '',
                phone: '',
                avatar: '',
            },
            message: "",
            isRoleFieldDisabled: false
        };
    },
    methods: {
        async createUser(data) {
            try {
                await UserService.create(data);
                window.alert("Người dung được thêm thành công.");
                setTimeout(() => {
                    this.$router.push({ name: "user" });
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        },

    },
};
</script>