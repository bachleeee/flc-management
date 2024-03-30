<template>
      <div class="container-xxl ">
        <div class="p-4">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="bg-white p-3 rounded">
                        <div  class="container my-4 d-flex flex-column align-items-center">
                        <h4>Thêm Phòng học mới</h4>
                        <RoomForm :room="room" @submit:room="createRoom" :isRoleFieldDisabled="isRoleFieldDisabled"/>
                        <p>{{ message }}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RoomForm from "@/components/RoomForm.vue";
import RoomService from "@/services/room.service";
export default {
    components: {
        RoomForm,
    },
    data() {
        return {
            room: {
                sophong: '',
                succhua:'',
                tinhtrang: '',
            },
            message: "",
            isRoleFieldDisabled: false
        };
    },
    methods: {
        async createRoom(data) {
            try {
                await RoomService.create(data);
                window.alert("Phòng học được thêm thành công.");
                setTimeout(() => {
                    this.$router.push({ name: "room" });
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        },

    },
};
</script>