<template>
    <div class="container">
        <div style="text-transform: uppercase; font-size: 25px; color: blue" class="mt-4">
            Tìm kiếm
        </div>
        <hr>
        <div class="search-result">
            <div class="d-flex justify-content-between">
                <div style="font-weight: 500; font-size: 20px;">Khóa học liên quan</div>
                <p>Tìm được {{ results.lenght }} kết quả</p>
            </div>
            <div class="row">
                <div class="col-6" v-for="(result,index) in results" :key="index">
                    <SearchResult :result="result"></SearchResult>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchResult from '@/components/SearchResult.vue';
import CourseService from '@/service/course.service.js'

export default { 
    data() {
        return {
            results: []
        }
    },
    components: {
        SearchResult
    },
    methods: {
        async getResults() {
            const courseName = this.$route.params.searchKey; // Thay đổi tại đây
            try {
                const response = await CourseService.getByCourseName(courseName);
                if(response) {
                    this.results = response;
                    console.log(this.results);
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.getResults();
    }
}
</script>
