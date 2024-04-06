import { createWebHistory, createRouter } from "vue-router";
import User from '@/views/User.vue';
import UserEdit from '@/views/UserEdit.vue';
import Course from '@/views/Course.vue';
import CourseEdit from '@/views/CourseEdit.vue';
import Class from '@/views/Class.vue';
import ClassEdit from '@/views/ClassEdit.vue';
import Schedule from '@/views/Schedule.vue';
import ScheduleEdit from '@/views/ScheduleEdit.vue';
import Room from '@/views/Room.vue';
import RoomEdit from '@/views/RoomEdit.vue';
import Lesson from '@/views/Lesson.vue';
import LessonEdit from '@/views/LessonEdit.vue';
import Video from '@/views/Video.vue';
import VideoEdit from '@/views/VideoEdit.vue';
import Exam from '@/views/Exam.vue';
import ExamEdit from '@/views/ExamEdit.vue';
import Order from '@/views/Order.vue';
import OrderEdit from '@/views/OrderEdit.vue';
import Login from '@/views/Login.vue';
import Message from '@/views/Message.vue';
import Product from '@/views/Product.vue';
const routes = [
    {
        path: "/user",
        name: "user",
        component: User,
    },
    {
        path: "/user/:id",
        name: "user.edit",
        component: UserEdit,
    },
    {
        path:"/user.add",
        name: "user.add",
        component: () => import("@/views/UserAdd.vue"),
        props: true
    },
    {
        path: "/course",
        name: "course",
        component: Course,
    },
    {
        path: "/course/:id",
        name: "course.edit",
        component: CourseEdit,
    },
    {
        path:"/course.add",
        name: "course.add",
        component: () => import("@/views/CourseAdd.vue"),
        props: true
    },
    {
        path: "/class",
        name: "class",
        component: Class,
    },
    {
        path: "/class/:id",
        name: "class.edit",
        component: ClassEdit,
    },
    {
        path:"/class.add",
        name: "class.add",
        component: () => import("@/views/ClassAdd.vue"),
        props: true
    },
    {
        path: "/schedule",
        name: "schedule",
        component: Schedule,
    },
    {
        path: "/schedule/:id",
        name: "schedule.edit",
        component: ScheduleEdit,
    },
    {
        path:"/schedule.add",
        name: "schedule.add",
        component: () => import("@/views/ScheduleAdd.vue"),
        props: true
    },
    {
        path: "/room",
        name: "room",
        component: Room,
    },
    {
        path: "/room/:id",
        name: "room.edit",
        component: RoomEdit,
    },
    {
        path: "/room.add",
        name: "room.add",
        component: () => import("@/views/RoomAdd.vue"),
        props: true
    },
    {
        path: "/lesson",
        name: "lesson",
        component: Lesson,
    },
    {
        path: "/lesson/:id",
        name: "lesson.edit",
        component: LessonEdit,
    },
    {
        path:"/lesson.add",
        name: "lesson.add",
        component: () => import("@/views/LessonAdd.vue"),
        props: true
    },
    {
        path: "/video/:lessonid",
        name: "video",
        component: Video,
    },
    {
        path: "/video/:id",
        name: "video.edit",
        component: VideoEdit,
    },
    {
        path:"/video.add/:lessonid",
        name: "video.add",
        component: () => import("@/views/VideoAdd.vue"),
        props: true
    },
    {
        path: "/exam",
        name: "exam",
        component: Exam,
    },
    {
        path: "/exam/:id",
        name: "exam.edit",
        component: ExamEdit,
    },
    {
        path:"/exam.add",
        name: "exam.add",
        component: () => import("@/views/ExamAdd.vue"),
        props: true
    },
    {
        path: "/order/:id",
        name: "order.edit",
        component: OrderEdit,
    },
    {
        path: "/order",
        name: "order",
        component: Order,
    }, 
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/message",
        name: "message",
        component: Message,
    },
    {
        path: "/products/:id",
        name: "product.edit",
        component: () => import("@/views/ProductEdit.vue"),
        props: true 
    },
    {
        path:"/product.add",
        name: "product.add",
        component: () => import("@/views/ProductAdd.vue"),
        props: true
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;