import { createWebHistory, createRouter } from "vue-router";
import User from '@/views/User.vue';
import UserEdit from '@/views/UserEdit.vue';
import Course from '@/views/Course.vue';
import CourseEdit from '@/views/CourseEdit.vue';
import Class from '@/views/Class.vue';
import ClassEdit from '@/views/ClassEdit.vue';
import Schedule from '@/views/Schedule.vue';
import ScheduleEdit from '@/views/ScheduleEdit.vue';
import Login from '@/views/Login.vue';
import Product from '@/views/Product.vue';
import Order from '@/views/Order.vue';
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
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/product",
        name: "product",
        component: Product,
    },
    {
        path: "/order",
        name: "order",
        component: Order,
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