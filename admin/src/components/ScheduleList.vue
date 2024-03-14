<template>
    <div>
        <ul class="rounded mx-2 py-2 scheduleItems" v-for="scheduleItems in classesOfDay" :key="scheduleItems.id"
            :style="{ backgroundColor: getClassColor(scheduleItems.tenlop) }">
            <!-- <button class="btn btn-sm btn-danger delete-btn" @click="deleteCourse(index, scheduleItems._id)">
                <i class="fa-solid fa-x"></i>
            </button> -->
            <li>
                {{ scheduleItems.tenlop }}
            </li>
            <li>
                Buổi {{ scheduleItems.stt }}
            </li>
            <li>
                Phòng {{ scheduleItems.phong }}
            </li>
            <li>
                {{ formatHour(scheduleItems.gioBatDau) }} - {{ formatHour((scheduleItems.gioKetThuc)) }}
            </li>
            <li>
                <button class="btn btn-sm btn-info" @click="modifyCourse(index, scheduleItems._id)">
                    Edit
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import ScheduleService from '@/services/schedule.service';

export default {
    props: {
        thisWeek: {
            type: Object,
            required: true,
        },
        classColor: {
            type: Array,
            required: true,
        },
        buoi: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            classesOfDay: [],
        };
    },
    watch: {
        'thisWeek.date': function (newValue, oldValue) {
            this.filterClassesOfDay();
        },
    },
    created() {
        this.filterClassesOfDay();
    },
    methods: {
        async filterClassesOfDay() {
            try {
                this.classesOfDay = await ScheduleService.getClassesOfDayAndShift(this.buoi, this.thisWeek.date);
                this.classesOfDay.sort((a, b) => (a.gioBatDau > b.gioBatDau) ? 1 : -1);
                console.log(this.buoi, this.thisWeek.date)
            } catch (error) {
                console.log(error);
            }
        },
        updateScheduleData() {
            this.filterClassesOfDay();
        },

        formatHour(dateTimeString) {
            const hour = moment(dateTimeString).format('HH:mm');
            return hour;
        },
        getClassColor(className) {
            const colorObject = this.classColor.find(item => item.classname === className);
            return colorObject ? colorObject.color : 'white';
        },
        async deleteCourse(index, scheduleId) {
            try {
                const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
                if (!confirmDelete) {
                    return;
                }
                await CourseService.delete(scheduleId);
                this.schedules.splice(index, 1);
                this.$emit("update:activeIndex", -1);
            } catch (error) {
                console.error("Error deleting schedule:", error);
            }
        },
        async modifyCourse(index, scheduleId) {
            this.$router.push({
                name: 'schedule.edit',
                params: { id: scheduleId },
            });
        },
    },
};

</script>


<style scoped>
li {
    list-style-type: none;
}

ul {
    padding: 0;
}

.scheduleItems {
    font-size: 15px;
    font-weight: normal;
    /* display: flex;
    flex-direction: column;
    border: solid 1px black; */
}

.delete-btn {
    position: relative;
    bottom: 5px;
    left: 80px;
    padding: 0.25rem 0.5rem;
    font-size: 0.5rem;
}
</style>
