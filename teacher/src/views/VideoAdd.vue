<template>
      <div class="container-xxl ">
        <div class="p-4">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="bg-white p-3 rounded">
                        <div  class="container my-4 d-flex flex-column align-items-center">
                        <h4>Thêm Phòng học mới</h4>
                        <VideoForm :video="video" @submit:video="createVideo" :isRoleFieldDisabled="isRoleFieldDisabled"/>
                        <p>{{ message }}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VideoForm from "@/components/VideoForm.vue";
import VideoService from "@/services/video.service";
export default {
    components: {
        VideoForm,
    },
    data() {
        return {
            video: {
                sophong: '',
                succhua:'',
                tinhtrang: '',
            },
            message: "",
            isRoleFieldDisabled: false
        };
    },
    methods: {
        async createVideo(data) {
            try {
                await VideoService.create(data);
                window.alert("Phòng học được thêm thành công.");
                setTimeout(() => {
                    this.$router.push({ name: "video" });
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        },

    },
};
</script>