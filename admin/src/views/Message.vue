<template>
    <div class="container-xxl">
        <div class="p-4">
            <div class="rounded" style="height: 610px; display: flex;">
                <div class="col-3 groups-mess">
                    <div v-for="(group, index) in myGroups" :key="index" class="mb-3" @click="setActiveGroup(index)">
                        <div>{{ group.groupName }}</div>
                        <div>{{ group.members.length }} thành viên</div>
                        <hr>
                    </div>
                </div>
                <div class="col-9 mess-detail">
                    <MessageDetail v-if="activeGroupIndex !== null" :group="myGroups[activeGroupIndex]" :token="token"></MessageDetail>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MessageService from "@/services/message.service";
import MessageDetail from "@/components/MessageDetail.vue"; 

export default {
    components: {
        MessageDetail
    },
    data() {
        return {
            myGroups: [],
            token: '',
            activeGroupIndex: null
        }
    },
    methods: {
        async getMyGroups() {
            try {
                this.token = localStorage.getItem('token');
                if (!this.token) {
                    console.error('Token is not available');
                    return;
                }
                const response = await MessageService.getAllMyGroups(this.token);
                if (response) {
                    this.myGroups = response;
                    console.log("nhom cua ban", this.myGroups);
                }
            } catch (error) {
                console.error('Error while fetching groups:', error);
            }
        },
        setActiveGroup(index) {
            this.activeGroupIndex = index;
        }
    },
    mounted() {
        this.getMyGroups();
    }
}
</script>

<style scoped>
.row {
    margin: 0;
}

.col-3,
.col-9 {
    width: 100%;
    padding: 0;
}

.groups-mess {
    background-color: rgb(169, 190, 244);
}

.mess-detail {
    background-color: white;
}
</style>
