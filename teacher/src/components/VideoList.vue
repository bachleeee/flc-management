<template>
  <tr v-for="(video, index) in videos" :key="video._id" @click="updateActiveIndex(index)">
    <td class="col-1 table-items">{{ startIndex + index }}</td>
    <td class="col-2 table-items">
      {{ video.tile }}
    </td>
    <td class="col-2 table-items">
      {{ video.link }}
    </td>
  
    <td class="col-2">
      <button class="btn btn-sm btn-danger mr-4" @click="deleteVideo(index, video._id)">
        Delete
      </button>
      <button class="btn btn-sm btn-info" @click="modifyVideo(index, video._id)">
        Edit
      </button>
    </td>
  </tr>
</template>


<script>
import VideoService from "@/services/video.service";

export default {
  props: {
    videos: { type: Array, default: [] },
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
    async deleteVideo(index, videoId) {
      try {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!confirmDelete) {
          return;
        }
        await VideoService.delete(videoId);
        this.videos.splice(index, 1);
        this.$emit("update:activeIndex", -1);
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    },
    async modifyVideo(index, videoId) {
      this.$router.push({
        name: 'video.edit',
        params: { id: videoId },
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