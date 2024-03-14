<template>
    <div class="container">
        <Form @submit="submitSchedule" :validation-schema="scheduleFormSchema">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="tenlop">Tên lớp</label>
                        <Field name="tenlop" type="text" class="form-control" v-model="scheduleLocal.tenlop"
                            :disabled="isRoleFieldDisabled" />
                        <ErrorMessage name="tenlop" class="error-feedback" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="phong">Phòng</label>
                        <Field name="phong" type="text" class="form-control" v-model="scheduleLocal.phong" />
                        <ErrorMessage name="phong" class="error-feedback" />
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="gioBatDau">Giờ học</label>
                        <Field as="input" type="text" name="gioBatDau" class="form-control flatpickr"
                            v-model="scheduleLocal.gioBatDau" />
                        <ErrorMessage name="gioBatDau" class="error-feedback" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="buoi">Buổi</label>
                        <Field as="select" name="buoi" class="form-control" v-model="scheduleLocal.buoi"
                            :disabled="isRoleFieldDisabled">
                            <option value="">Chọn buổi</option>
                            <option value="morning">Sáng</option>
                            <option value="afternoon">Chiều</option>
                            <option value="evening">Tối</option>
                        </Field>
                        <ErrorMessage name="buoi" class="error-feedback" />
                    </div>
                </div>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Lưu</button>
                <button v-if="scheduleLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteSchedule">
                    Xóa
                </button>
            </div>
        </Form>
    </div>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:schedule", "delete:schedule"],
    props: {
        schedule: { type: Object, required: true },
        isRoleFieldDisabled: { type: Boolean }
    },
    data() {
        const scheduleFormSchema = yup.object().shape({
            tenlop: yup
                .string()
                .min(2, "Tên lớp phải có ít nhất 2 ký tự.")
                .max(50, "Tên lớp không được vượt quá 50 ký tự.")
                .required("Vui lòng nhập tên lớp."),
        });
        return {
            scheduleLocal: this.schedule,
            scheduleFormSchema,
        };
    },
    methods: {
        submitSchedule() {
            this.$emit("submit:schedule", this.scheduleLocal);
        },
        deleteSchedule() {
            this.$emit("delete:schedule", this.scheduleLocal.id);
        },
        initializeFlatpickr() {
            flatpickr('.flatpickr', {
                enableTime: true, // Kích hoạt chọn giờ và phút
                dateFormat: 'Y-m-d H:i', // Định dạng ngày và giờ
            });
        },
        updateBuoi() {
            const gioBatDau = new Date(this.scheduleLocal.gioBatDau).getHours();
            console.log(gioBatDau);
            if (gioBatDau >= 0 && gioBatDau < 12) {
                this.scheduleLocal.buoi = "morning";
            } else if (gioBatDau >= 12 && gioBatDau < 18) {
                this.scheduleLocal.buoi = "afternoon";
            } else {
                this.scheduleLocal.buoi = "evening";
            }
        },
    }, watch: {
        'scheduleLocal.gioBatDau': function (newValue, oldValue) {
            this.updateBuoi();
        }
    },
    mounted() {
        this.initializeFlatpickr();
    },
};
</script>


<style scoped>
li {
    list-style: none;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.form-control {
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-check-input {
    margin-right: 5px;
}

.error-feedback {
    color: #dc3545;
    font-size: 14px;
    margin-top: 5px;
}
</style>