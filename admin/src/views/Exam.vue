<template>
    <div class="container-xxl">
        <div class="p-4">
            <div v-if="authStore.isLoggedIn">
                <div class="bg-white p-3 rounded">
                    <div class="col-12">
                        <div class="semibold pb-4">
                            Danh sách Bài tập
                            <div class="row align-items-center justify-content-between px-3 pt-2">
                                <div class="col-5 ">
                                    <InputSearch v-model="searchText" />
                                </div>
                                <div class="px-4 ">
                                    <button class="btn btn-sm btn-secondary mx-4" @click="goToAddExam">
                                        <i class="fas fa-plus"></i> Thêm
                                    </button>
                                    <button class="btn btn-sm btn-primary" @click="refreshList">
                                        <i class="fas fa-redo"></i> Làm mới
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col" class="col-1">#</th>   
                                    <th scope="col" class="col-5">Câu hỏi</th>
                                    <th scope="col" class="col-2">Loại</th>
                                    <th scope="col" class="col-2">Đáp án</th>
                                    <th scope="col" class="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <ExamList v-if="filteredExamsCount > 0" :exams="paginatedExams" v-model:activeIndex="activeIndex" :start-index="startIndex" />

                                <p v-else>Không có Exam.</p>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="6" class="text-right">
                                        <ul class="pagination">
                                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                                <button class="page-link" @click="changePage(currentPage - 1)"
                                                    :disabled="currentPage === 1">Previous</button>
                                            </li>
                                            <li class="page-item" v-for="page in totalPages" :key="page"
                                                :class="{ active: page === currentPage }">
                                                <button class="page-link" @click="changePage(page)">{{ page }}</button>
                                            </li>
                                            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                                <button class="page-link" @click="changePage(currentPage + 1)"
                                                    :disabled="currentPage === totalPages">Next</button>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import ExamList from "@/components/ExamList.vue";
import ExamService from "@/services/exam.service";
import { useAuthStore } from '@/store/auth';

export default {
    components: {
        InputSearch,
        ExamList,
    },
    data() {
        return {
            exams: [],
            activeIndex: -1,
            searchText: "",
            itemsPerPage: 7,
            currentPage: 1,
            sortDirection: 'asc',
            sortField: 'name',
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
        sortField() {
            this.sortExams();
        },
        sortDirection() {
            this.sortExams();
        }
    },
    computed: {
        examStrings() {
            return this.exams.map((exam) => {
                const { name } = exam;
                return [name].join("").toLowerCase();
            });
        },
        filteredExams() {
            const lowercaseSearchText = this.searchText.toLowerCase();
            if (!lowercaseSearchText) return this.exams;
            return this.exams.filter((_exam, index) =>
                this.examStrings[index].includes(lowercaseSearchText)
            );
        },
        activeExam() {
            if (this.activeIndex < 0) return null;
            return this.filteredExams[this.activeIndex];
        },
        filteredExamsCount() {
            return this.filteredExams.length;
        },
        authStore() {
            return useAuthStore();
        },
        //phân trang
        paginatedExams() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredExams.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.filteredExams.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        }
    },
    methods: {
        async retrieveExams() {
            try {
                this.exams = await ExamService.getAllLessonExam();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveExams();
            this.activeIndex = -1;
        },
        goToAddExam() {
            this.$router.push({ name: "exam.add" });
        },
        //phan trang
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        //sap xep name
        sortExams() {
            const compareFn = (a, b) => {
                const fieldA = a[this.sortField].toUpperCase();
                const fieldB = b[this.sortField].toUpperCase();

                let comparison = 0;
                if (fieldA > fieldB) {
                    comparison = 1;
                } else if (fieldA < fieldB) {
                    comparison = -1;
                }

                return this.sortDirection === 'asc' ? comparison : -comparison;
            };

            this.filteredExams.sort(compareFn);
        },
        changeSort(field) {
            if (this.sortField === field) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortField = field;
                this.sortDirection = 'asc';
            }

            this.searchText = this.searchText.toLowerCase(); // Chuyển đổi sang chữ thường
        },
    },
    mounted() {
        this.refreshList();
    },

};
</script>

<style scoped>
table th {
    background-color: rgb(218, 218, 218);
    font-weight: 500;
    text-transform: uppercase;
}

.semibold {
    font-size: 1.5rem;
    font-weight: 500;
}
</style>