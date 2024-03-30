<template>
  <tr v-for="(room, index) in rooms" :key="room._id" @click="updateActiveIndex(index)">
    <td class="col-1 table-items">{{ startIndex + index }}</td>
    <td class="col-2 table-items">
      {{ room.sophong }}
    </td>
    <td class="col-2 table-items">
      {{ room.succhua }}
    </td>
    <td class="col-2 table-items">
      {{ room.tinhtrang }}
    </td>
  
    <td class="col-2">
      <button class="btn btn-sm btn-danger mr-4" @click="deleteRoom(index, room._id)">
        Delete
      </button>
      <button class="btn btn-sm btn-info" @click="modifyRoom(index, room._id)">
        Edit
      </button>
    </td>
  </tr>
</template>


<script>
import RoomService from "@/services/room.service";

export default {
  props: {
    rooms: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    startIndex: Number,
  },
  emits: ["update:activeIndex"],
  methods: {
    formatCurrency(price) {
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
      return `${formattedPrice}`;
    },
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    async deleteRoom(index, roomId) {
      try {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!confirmDelete) {
          return;
        }
        await RoomService.delete(roomId);
        this.rooms.splice(index, 1);
        this.$emit("update:activeIndex", -1);
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    },
    async modifyRoom(index, roomId) {
      this.$router.push({
        name: 'room.edit',
        params: { id: roomId },
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