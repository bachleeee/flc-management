<template>
    <div>
        <ul class="rounded mx-2 py-2 scheduleItems" v-for="scheduleItems in classesOfDay" :key="scheduleItems.id"
            :style="{ backgroundColor: getClassColor(scheduleItems.tenlop, this.thisWeek.date) }">
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
                GV: {{ scheduleItems.teachers[0].name }}
            </li>
            <li>
                Phòng {{ scheduleItems.phong }} <i style="color: red;" v-if="scheduleItems.isCommonRoom == true"
                    class="fa-solid fa-circle-exclamation"></i>
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
        daysOff: {
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

                // Thêm trường isCommonRoom vào mỗi phần tử của classesOfDay với giá trị mặc định là false
                this.classesOfDay.forEach(item => {
                    item.isCommonRoom = false;
                });

                // Kiểm tra nếu các phòng trùng nhau thì isCommonRoom thành true
                this.classesOfDay.forEach((item, index) => {
                    const currentRoom = item.phong;
                    for (let i = index + 1; i < this.classesOfDay.length; i++) {
                        if (this.classesOfDay[i].phong === currentRoom) {
                            item.isCommonRoom = true;
                            this.classesOfDay[i].isCommonRoom = true;
                        }
                    }
                });
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
        getClassColor(className, date) {
            const grayColor = 'gray'; // hoặc bất kỳ màu xám nào bạn muốn

            // Kiểm tra xem date có nằm trong khoảng từ ngayBatDau đến ngayKetThuc của một phần tử trong daysOff hay không
            const isDayOff = this.daysOff.some(dayOff => {
                const ngayBatDau = moment(dayOff.ngayBatDau);
                const ngayKetThuc = moment(dayOff.ngayKetThuc);
                const currentDate = moment(date);

                return currentDate.isBetween(ngayBatDau, ngayKetThuc, 'day', '[]');
            });

            // Nếu date nằm trong khoảng ngày nghỉ của daysOff, trả về màu xám, ngược lại trả về màu của lớp học
            if (isDayOff) {
                return grayColor;
            } else {
                const colorObject = this.classColor.find(item => item.classname === className);
                return colorObject ? colorObject.color : 'white';
            }
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
    display: flex;
    flex-direction: column;
    border: solid 1px black;
    align-items: center;
}

.delete-btn {
    position: relative;
    bottom: 5px;
    left: 80px;
    padding: 0.25rem 0.5rem;
    font-size: 0.5rem;
}
</style>
