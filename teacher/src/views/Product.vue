<template>
    <div class="container-xxl">
        <div class="px-2 py-4">
            <div v-if="authStore.isLoggedIn">
                <div class="col-12">
                    <div class="semibold d-flex justify-content-start">
                        Danh sách khóa học
                    </div>
                    <div class="bg-grey p-3">
                        <div class="row">
                            <div class="col-8">
                                <InputSearch v-model="searchText" />
                            </div>
                            <div class="col-3">
                                Kết quả:
                            </div>
                            <div class="col-1">
                                <button class="btn btn-sm btn-success" @click="goToAddProduct">
                                    <i class="fas fa-plus"></i> Thêm
                                </button>
                            </div>

                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" class="col-1">STT</th>
                                <th scope="col" class="col-5">Tên khóa học</th>
                                <th scope="col" class="col-3">Giá</th>
                                <th scope="col" class="col-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts" productIndex="pro"
                                v-model:activeIndex="activeIndex" />
                            <p v-else>Không có khóa học.</p>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5" class="text-right">
                                    <button class="btn btn-sm btn-success" @click="goToAddProduct">
                                        <i class="fas fa-plus"></i> Thêm
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <!-- <div class="m-3 d-flex justify-content-around">
                    <button class="btn btn-sm btn-primary" @click="decreasePage" :disabled="currentPage === 1">
                        <i class="fa-solid fa-arrow-right fa-rotate-180"></i>
                    </button>
                    <div>
                        <h3>{{ filteredProductsCount }} /10</h3>
                    </div>
                    <button class="btn btn-sm btn-primary" @click="increasePage">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div> -->
                    <!-- <div class="mt-3 row justify-content-around align-items-center">
                    <button class="btn btn-sm btn-primary" @click="refreshList()">
                        <i class="fas fa-redo"></i> Làm mới
                    </button>
                    
                    <button class="btn btn-sm btn-danger" @click="removeAllProducts">
                        <i class="fas fa-trash"></i> Xóa tất cả
                    </button>
                </div> -->
                </div>
                <!-- <div class="mt-3 col-md-4">
                <div v-if="activeProduct">
                    <h4>
                        Chi tiết Sản phẩm
                        <i class="fas fa-address-card"></i>
                    </h4>
                    <ProductCard :product="activeProduct" />
                    <router-link :to="{
                        name: 'product.edit',
                        params: { id: activeProduct._id },
                    }">
                        <span class="mt-2 badge badge-warning">
                            <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                    </router-link>
                </div>
            </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/ProductList.vue";
import CourseService from "@/services/course.service";
import { useAuthStore } from '@/store/auth';

export default {
    components: {
        ProductCard,
        InputSearch,
        ProductList,
    },
    data() {
        return {
            products: [],
            activeIndex: -1,
            searchText: "",
            currentPage: 1,
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
        currentPage: {
            immediate: true,
            handler(newPage) {
                this.retrieveProducts();
            },
        },
    },
    computed: {
        soluong() {
            return this.products.reduce((total, product) => total + product.quantity, 0);
        },
        productStrings() {
            return this.products.map((product) => {
                const { name, category, description, price, quantity, img } = product;
                return [name, category, description, price, quantity, img].join("");
            });
        },
        filteredProducts() {
            if (!this.searchText) return this.products;
            return this.products.filter((_product, index) =>
                this.productStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredProducts[this.activeIndex];
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
        authStore() {
            return useAuthStore();
        },
    },
    methods: {
        increasePage() {
            this.currentPage++;
            this.retrieveProducts();
        },
        decreasePage() {
            this.currentPage--;
            this.retrieveProducts();
        },
        async retrieveProducts() {
            try {
                this.products = await CourseService.getAllCourse()
                console, log(this.products)
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
        },
        async removeAllProducts() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await ProductService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddProduct() {
            this.$router.push({ name: "product.add" });
        },
    },
    mounted() {
        this.refreshList();
    },

};
</script>  

<style scoped>
.bg-grey {
    background-color: #e8e5e5
}

.semibold {
    font-size: 2rem;
    font-weight: 600;
}
</style>