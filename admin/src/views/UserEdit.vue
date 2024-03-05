<template>
    <div class="container-xxl ">
      <div class="p-4">
        <div class="bg-white p-3 rounded">
          <div class="row justify-content-center">
            <div class="col-8">
            <div v-if="user" class="container mt-4 d-flex flex-column align-items-center">
              <h4>Hiệu chỉnh người dùng </h4>
              <UserForm :user="user" @submit:user="updateUser" @delete:user="deleteUser" />
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
        user: null,
        message: "",
      };
    },
    methods: {
      async getUser() {
        try {
          this.user = await UserService.get(this.$route.params.id);
        } catch (error) {
          console.log(error);
          this.$router.push({
            name: "notfound",
            params: {
              pathMatch: this.$route.path.split("/").slice(1),
            },
            query: this.$route.query,
            hash: this.$route.hash,
          });
        }
      },
      async updateUser(data) {
        try {
          await UserService.update(this.user._id, data);
          window.alert("người dùng được cập nhật thành công.");
        } catch (error) {
          console.log(error);
        }
      },
      async deleteUser() {
        if (confirm("Bạn muốn xóa người dùng này?")) {
          try {
            await UserService.delete(this.user._id);
            this.$router.push({ name: "user" });
          } catch (error) {
            console.log(error);
          }
        }
      },
    },
    created() {
      this.getUser();
      this.message = "";
    },
  };
  </script>
  