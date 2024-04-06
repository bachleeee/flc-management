<template>
    <div class="search-result p-3 mb-4">
        <div class="bg-blue">
             <div class="row">
        <div class="col-3">
            <img src="" alt="">
            <router-link :to="'/course/' + result.slug" class="btn btn-warning">Chi tiết khóa học</router-link>
        </div>
        <div class="col-9">
            <div class="course-category my-3" >
               <span :class="getClassByCategory(result.category)" class="p-1 rounded">
                 {{ result.category }}
               </span>
            </div>
            <div class="course-name my-4">
                {{ result.name }}
            </div>
            <div class="course-description">
                {{ result.des }}
            </div>
        </div>
    </div>
        </div>
       
    </div>
</template>

<script>
export default {
    props: {
        result: {
            type: Object,
            required: true
        }
    },
    methods: {
        getClassByCategory(category) {
            if (category === 'toeic') {
                return 'toeic-category';
            } else if (category === 'ielts') {
                return 'ielts-category';
            } else {
                return '';
            }
        }
    }
}
</script>

<style scoped>
.toeic-category {
    background-color: rgb(103, 251, 103);
}

.ielts-category {
    background-color: orange;
}

.course-category {
    text-transform: uppercase;
}

.course-name {
    font-size: 20px;
}

.search-result {
    background-color: rgb(231, 246, 246);
    height: 370px;
    
}
</style>
