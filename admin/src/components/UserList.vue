<template>
  <tr v-for="(user, index) in users" :key="user._id"
    :class="{ active: index === activeIndex }"
    @click="updateActiveIndex(index)">
    <td class="col-1 table-items">{{ startIndex + index }}</td>
    <td class="col-2 table-items"><img style="width: 31px;" src="../assets/img/user/avatar-defult.png"></td>
    <td class="col-2 table-items">
      {{ user.name }}
    </td>
    <td class="col-2 table-items">{{ user.email }}</td>
    <td class="col-2 table-items">{{ user.status }}</td>
    <td class="col-2">
      <button class="btn btn-sm btn-danger mr-4" @click="deleteUser(index, user._id)">
        Delete
      </button>
      <button class="btn btn-sm btn-info" @click="modifyUser(index, user._id)">
        Edit
      </button>
    </td>
  </tr>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  props: {
    users: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    startIndex: Number,
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async deleteUser(index, userId) {
      try {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!confirmDelete) {
          return;
        }
        await UserService.delete(userId);
        this.users.splice(index, 1);
        this.$emit("update:activeIndex", -1);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    async modifyUser(index, userId) {
      this.$emit("addBreadcrumb", { label: "Chỉnh sửa người dùng", to: null });
    this.$router.push({
      name: 'user.edit',
      params: { id: userId },
    });
    },
  }
};
</script>

<style>
.table td,
.table th {
  padding: 0.45rem;
  vertical-align: top;
}

.delete-icon {
  cursor: pointer;
}

.modify-icon {
  cursor: pointer;
}

</style>