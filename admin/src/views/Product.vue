<template>
    <div class="container">
        <div v-if="authStore.isLoggedIn" class="page row my-3">
            <!-- <div class="col-md-10">
                <InputSearch v-model="searchText" />
            </div> -->
            <div class=" col-md-12">
                <h4 class=" d-flex justify-content-center">
                    Danh sách sản phẩm
                    <i class="fa-solid fa-book"></i>
                </h4>

                <div class="d-flex justify-content-center mb-3">
                    <div class="col-5"><strong>Tên sản phẩm</strong></div>
                    <div class="col-2 mr-4"><strong>Thể loại</strong></div>
                    <div class="col-2"><strong>Giá</strong></div>
                    <div class="col-1"><strong>SL</strong></div>
                    <div class="col-1">
                        <button class="btn btn-sm btn-success" @click="goToAddProduct">
                        <i class="fas fa-plus"></i> Thêm
                    </button>
                </div>
                </div>
                <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts"
                    v-model:activeIndex="activeIndex" />
                <p v-else>Không có sản phẩm.</p>
                <div class="m-3 d-flex justify-content-around">
                    <button class="btn btn-sm btn-primary" @click="decreasePage" :disabled="currentPage === 1">
                        <i class="fa-solid fa-arrow-right fa-rotate-180"></i>
                    </button>
                    <div>
                        <h3>{{ filteredProductsCount }} /10</h3>
                    </div>
                    <button class="btn btn-sm btn-primary" @click="increasePage">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
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
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/ProductList.vue";
import ProductService from "@/services/product.service";
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
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
        currentPage: {
            immediate: true, // Để khởi tạo lần đầu tiên
            handler(newPage) {
                this.retrieveProducts();
            },
        },
    },
    computed: {
        soluong() {
            // Tính tổng số lượng từ mảng products
            return this.products.reduce((total, product) => total + product.quantity, 0);
        },
        // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.products.map((product) => {
                const { name, category, description, price, quantity, img } = product;
                return [name, category, description, price, quantity, img].join("");
            });
        },
        // Trả về các product có chứa thông tin cần tìm kiếm.
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
                const limit = 10;
                this.products = await ProductService.getAll(this.currentPage, limit);
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
.page {
    text-align: left;

}
</style>