<template>
    <div class="container-xxl">
        <div class="p-4">
            <div v-if="authStore.isLoggedIn">
                <div class="bg-white p-3 rounded">
                    <div class="col-12">
                        <div class="semibold pb-4">
                            Danh sách Lớp học
                            <div class="row align-items-center justify-content-between px-3 pt-2">
                                <div class="col-5 ">
                                    <InputSearch v-model="searchText" />
                                </div>
                                <div class="px-4 ">
                                    <button class="btn btn-sm btn-secondary mx-4" @click="goToAddCourse">
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
                                    <th scope="col" class="col-2" @click="changeSort('name')">Lớp học
                                        <i v-if="sortField === 'name' && sortDirection === 'asc'"
                                            class="fas fa-sort-up"></i>
                                        <i v-if="sortField === 'name' && sortDirection === 'desc'"
                                            class="fas fa-sort-down"></i>
                                    </th>
                                    <th scope="col" class="col-1">hình thức</th>
                                    <th scope="col" class="col-1">Sỉ số</th>
                                    <th scope="col" class="col-2">Trạng thái</th>
                                    <th scope="col" class="col-1">Thứ</th>
                                    <th scope="col" class="col-1">Giờ học</th>
                                    <th scope="col" class="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <ClassList v-if="filteredCoursesCount > 0" :courses="paginatedCourses"
                                    v-model:activeIndex="activeIndex" :start-index="startIndex" />
                                <p v-else>Không có Lớp học.</p>
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
import ClassList from "@/components/ClassList.vue";
import ClassService from "@/services/class.service";
import { useAuthStore } from '@/store/auth';

export default {
    components: {
        InputSearch,
        ClassList,
    },
    data() {
        return {
            courses: [],
            activeIndex: -1,
            searchText: "",
            itemsPerPage: 7,
            currentPage: 1,
            sortDirection: 'asc',
            sortField: 'name'
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
        sortField() {
            this.sortCourses();
        },
        sortDirection() {
            this.sortCourses();
        }
    },
    computed: {
        courseStrings() {
            return this.courses.map((course) => {
                const { name, email, phone, role, birthday, gioiTinh } = course;
                return [name, email, phone, role, birthday, gioiTinh].join("").toLowerCase();
            });
        },
        filteredCourses() {
            const lowercaseSearchText = this.searchText.toLowerCase();
            if (!lowercaseSearchText) return this.courses;
            return this.courses.filter((_course, index) =>
                this.courseStrings[index].includes(lowercaseSearchText)
            );
        },
        activeCourse() {
            if (this.activeIndex < 0) return null;
            return this.filteredCourses[this.activeIndex];
        },
        filteredCoursesCount() {
            return this.filteredCourses.length;
        },
        authStore() {
            return useAuthStore();
        },
        //phân trang
        paginatedCourses() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredCourses.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        }
    },
    methods: {
        async retrieveCourses() {
            try {
                this.courses = await ClassService.getAllClass()
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveCourses();
            this.activeIndex = -1;
        },
        goToAddCourse() {
            this.$router.push({ name: "class.add" });
        },
        //phan trang
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        //sap xep name
        sortCourses() {
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

            this.filteredCourses.sort(compareFn);
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