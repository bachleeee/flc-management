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
                Phòng {{ scheduleItems.phong }} <i style="color: red;" v-if="scheduleItems.isCommonRoom == true"
                    class="fa-solid fa-circle-exclamation"></i>
            </li>
            <li>
                {{ formatHour(scheduleItems.gioBatDau) }} - {{ formatHour((scheduleItems.gioKetThuc)) }}
            </li>
            <li v-if="isMyClass(scheduleItems.teachers)">
                <button class="btn btn-sm btn-warning" v-if="isToday(scheduleItems.gioBatDau)"
                    @click="showForm[scheduleItems._id] = true">
                    Điểm danh
                </button>
            </li>
            <div class="form-wrapper" v-if="showForm[scheduleItems._id]">
                <div class="form" style="z-index: 999; height: 600px;">
                    <div>
                        <div style="text-align: center; font-size: 20px; font-weight: bold; text-transform: uppercase;">
                            <label for="soluong">Điểm danh lớp {{ scheduleItems.tenlop }}</label>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div v-for="(teacher, teacherIndex) in scheduleItems.teachers">
                                GV: {{ teacher.name }}
                            </div>
                            <div>Ngày {{ formattedDate(scheduleItems.gioBatDau) }}
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên Sinh viên</th>
                                    <th>Có mặt</th>
                                    <th>Vắng có phép</th>
                                    <th>Vắng không phép</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(student, studentIndex) in sortStudents(scheduleItems.students)"
                                    :key="studentIndex">
                                    <td>{{ studentIndex + 1 }}</td>
                                    <td>{{ student.name }}</td>
                                    <td style="text-align: center; color: red">
                                        <input type="radio" :name="student._id" value="CM" v-model="student.absent">
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="radio" :name="student._id" value="CP" v-model="student.absent">
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="radio" :name="student._id" value="KP" v-model="student.absent">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-3" style="text-align: center;">
                        <button class="btn btn-primary mr-4"
                            @click="updateAttendSchedule(scheduleItems._id, scheduleItems.students)">Lưu điểm
                            danh</button>
                        <button class="btn btn-danger" @click="showForm[scheduleItems._id] = false">Đóng</button>
                    </div>
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
import ScheduleService from '@/services/schedule.service';
import { useAuthStore } from '@/store/auth';
import AttendanceForm from './AttendanceForm.vue';
import moment from "moment";
import scheduleService from '../services/schedule.service';

export default {
    components: {
        AttendanceForm
    },
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
    computed: {
        authStore() {
            return useAuthStore();
        },
    },
    data() {
        return {
            classesOfDay: [],
            showForm: {},
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

                this.classesOfDay.forEach(item => {
                    item.isCommonRoom = false;
                });

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
        formattedDate(date) {
            return moment(date).format('DD-MM-YYYY');
        },
        formatHour(dateTimeString) {
            const hour = moment(dateTimeString).format('HH:mm');
            return hour;
        },
        getClassColor(className, date) {
            const grayColor = 'gray'; // hoặc bất kỳ màu xám nào bạn muốn

            const isDayOff = this.daysOff.some(dayOff => {
                const ngayBatDau = moment(dayOff.ngayBatDau);
                const ngayKetThuc = moment(dayOff.ngayKetThuc);
                const currentDate = moment(date);

                return currentDate.isBetween(ngayBatDau, ngayKetThuc, 'day', '[]');
            });

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
        isMyClass(teachers) {
            return teachers.some(teacher => teacher.id === this.authStore.user._id);
        },
        sortStudents(students) {
            students.sort((a, b) => {
                const nameA = a.name.split(' ')
                const lastWordPartA = nameA[nameA.length - 1]
                const nameB = b.name.split(' ')
                const lastWordPartB = nameB[nameB.length - 1]

                return lastWordPartA.localeCompare(lastWordPartB);
            });

            return students;
        },
        isToday(dayOfClass) {
            const d = new Date
            const currentDate = d.toISOString().split('T')[0]

            const classOfToDay = dayOfClass.split('T')[0]

            return currentDate === classOfToDay
        },
        async updateAttendSchedule(scheduleId, students) {
            try {
                const updatedData = { students }
                const response = await scheduleService.update(scheduleId, updatedData)
                if (response) {
                    window.alert("Điểm danh thành công")
                }
            } catch (error) {
                console.log(error)
            }
        }
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

.form-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.form {
    background-color: white;
    padding: 30px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

table,
th,
td {
    border: 1px solid black;
    border-collapse: collapse;
}

table thead th {
    text-transform: uppercase;
    background-color: rgb(238, 238, 238);
    border: 1px solid black;
    text-align: center;
}
</style>
