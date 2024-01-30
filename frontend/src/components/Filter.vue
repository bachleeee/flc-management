<template>
    <div>
        <div class="filter-card mb-3">
            <h3 class="filter-title">Thể loại</h3>
            <ul>
                <li v-for="(category, index) in categories" :key="index" @click="filterByCategory(category)">
                    {{ formatCategory(category) }}
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            categories: ["van-hoc", "kinh-te", "tam-ly-hoc", "ngoai-ngu"],
            statuses: ["Còn hàng", "Hết hàng"],
            selectedStatus: [],
            minPrice: null,
            maxPrice: null,
        };
    },
    methods: {
        filterByCategory(category) {
            this.$router.push(`/${category}`);
        },
        formatCategory(category) {
            switch (category) {
                case 'van-hoc':
                    return 'Văn học';
                case 'tam-ly-hoc':
                    return 'Tâm lý học';
                case 'kinh-te':
                    return 'Kinh tế';
                case 'ngoai-ngu':
                    return 'Ngoại ngữ';
                default:
                    return category;
            }
        },
    },
};
</script>

<style scoped>
.filter-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
}

.filter-title {
    color: #C92127;
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.filter-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.filter-card ul li {
    padding: 8px 0;
    cursor: pointer;
    color: #555;
}

.filter-card ul li:hover {
    color: #000;
}

.sub-title {
    color: #555;
    margin-bottom: 10px;
}

.form-check {
    margin-bottom: 8px;
}

.d-flex {
    display: flex;
    justify-content: space-between;
}

.align-items-center {
    align-items: center;
}
</style>