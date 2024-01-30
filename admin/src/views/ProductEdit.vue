<template>
    <div v-if="product" class="container mt-4  d-flex flex-column align-items-center">
        <h4>Hiệu chỉnh sản phẩm</h4>
        <ProductForm :product="product" @submit:product="updateProduct" @delete:product="deleteProduct" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ProductForm from "@/components/ProductForm.vue";
import ProductService from "@/services/product.service";
export default {
    components: {
        ProductForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            product: null,
            message: "",
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ProductService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
                window.alert("sản phẩm được cập nhật thành công.");
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct() {
            if (confirm("Bạn muốn xóa sản phẩm này?")) {
                try {
                    await ProductService.delete(this.product._id);
                    this.$router.push({ name: "product" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
};
</script>