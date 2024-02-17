import { createWebHistory, createRouter } from "vue-router";
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Cart from '@/views/Cart.vue';
import Order from '@/views/Order.vue';
import Intro from '@/views/Intro.vue';
import CourseDetail from '@/views/CourseDetail.vue'
import SignUpClass from '@/views/SignUpClass.vue'
import MyClass from '@/views/MyClass.vue'
import LessonDetail from '@/views/LessonDetail.vue'

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: Home,
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/User.vue'),
        props: true,
    },

    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/sign-up",
        name: "Signup",
        component: Signup,
    },
    {
        path: "/Cart",
        name: "Cart",
        component: Cart,
    },
    {
        path: "/course/:slug",
        name: "CourseDetail",
        component: CourseDetail,
    },
    {
        path: '/course/:courseName/dangky_:className',
        name: 'SignUpClass',
        component: SignUpClass,
    },
    {
        path: "/my-class/:className",
        name: "MyClass",
        component: MyClass,
    },
    {
        path: "/:lessonName",
        name: "LessonDetail",
        component: LessonDetail,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;