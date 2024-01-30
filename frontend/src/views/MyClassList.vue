<template>
    abc
</template>


<script>
import ClassService from '@/service/class.service';
import CourseService from '@/service/course.service';

export default {
    data: {
        classes: [],
        course: []
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
    },
    mounted() {
        this.getClass();
        // this.getCourse();
    },
    methods: {
        async getClass() {
            try {
                const response = await ClassService.getClass();
                
                console.log('API Response class:',response);

            } catch (error) {
                console.error('Error fetching Class ', error);
            }
        },
        // async getCourse() {
        //     try {
        //         const response = await CourseService.getcourse();
                
        //         console.log('API Response course:',response);

        //         if (response) {
        //             console.log(response)
        //         } else {
        //             console.error('course data not found.');
        //         }
        //     } catch (error) {
        //         console.error('Error fetching course ', error);
        //     }
        // },
    },
}
</script>