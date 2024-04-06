<template>
  <div class="container-xxl ">
    <div class="p-4">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="bg-white p-3 rounded">
            <div v-if="schedule" class="container mt-4 d-flex flex-column align-items-center">
              <h4>Hiệu chỉnh Lịch học </h4>
              <ScheduleForm :schedule="schedule" @submit:schedule="updateSchedule" @delete:schedule="deleteSchedule"
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
import ScheduleForm from "@/components/ScheduleForm.vue";
import ScheduleService from "@/services/schedule.service";
import AnounceService from "@/services/announce.service";
import { useAuthStore } from "@/store/auth";
import Cookies from 'js-cookie';
export default {
  components: {
    ScheduleForm,
  },
  data() {
    return {
      schedule: null,
      message: "",
      isRoleFieldDisabled: true,
      isAddForm: false,
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },

  },
  methods: {
    async getSchedule() {
      try {
        this.schedule = await ScheduleService.getById(this.$route.params.id);
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
    async updateSchedule(updatedSchedule) {
      try {
        await ScheduleService.update(this.schedule._id, updatedSchedule);

        const token = Cookies.get('token');

        const receiveList = this.schedule.students.concat(this.schedule.teachers);

        const data = {
          noiDung: "Lịch học của lớp " + this.schedule.tenlop + " đã được cập nhật",
          toUsers: receiveList,
        };

        await AnounceService.create(token, data);

        this.schedule = updatedSchedule;
        console.log(this.schedule);
        window.alert("Lịch học được cập nhật thành công.");
      } catch (error) {
        console.log(error);
      }
    }

    ,
    async deleteSchedule() {
      // if (confirm("Bạn muốn xóa Lịch học này?")) {
      //   try {
      //     await ScheduleService.delete(this.schedule._id);
      //     this.$router.push({ name: "schedule" });
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      console.log("click")
    },
  },
  created() {
    this.getSchedule();
    this.message = "";
  },
};
</script>