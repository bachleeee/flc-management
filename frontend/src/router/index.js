import { createWebHistory, createRouter } from "vue-router";
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Cart from '@/views/Cart.vue';
import Order from '@/views/Order.vue';
import Intro from '@/views/Intro.vue';
import CourseDetail from '@/views/CourseDetail.vue'
import SignUpClass from '@/views/SignUpClass.vue'
import MyClassList from '@/views/MyClassList.vue'

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
        path: "/signup",
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
        path: "/my-class-list",
        name: "MyClassList",
        component: MyClassList,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;