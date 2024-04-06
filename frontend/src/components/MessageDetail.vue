<template>
    <div class="" style="position: relative;">
        <div style="background-color: aliceblue;" class="p-2">
            <div>{{ group.groupName }}</div>
            <div style="font-size: 12px;">{{ group.members.length }} thành viên</div>
        </div>
        <div style="background-color: white;">
            <ul class="message-list">
                <li v-for="(message, index) in messages" :key="index" class="m-2">
                    <div :class="myMessage(message.userid)">
                        <div class="message-name">{{ message.name }}</div>
                        <div class="message-text">{{ message.text }}</div>
                        <div class="message-time">{{ formatTime(message.createdAt) }}</div>
                    </div>

                </li>
            </ul>
            <div class="textarea-wrapper d-flex">
                <textarea v-model="newMessage" rows="1" placeholder="Nhập tin nhắn" class="form-control"></textarea>
                <button @click="sendMessage" class="btn btn-primary">Gửi</button>
            </div>
        </div>
    </div>
</template>

<script>
import MessageService from "@/service/message.service";
import moment from 'moment';
import { useAuthStore } from '@/store/auth';

export default {
    props: {
        group: {
            type: Object,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
    },
    data() {
        return {
            messages: [],
            newMessage: ''
        }
    },
    methods: {
        async getGroupMessage() {
            try {
                if (!this.token) {
                    console.error('Token is not available');
                    return;
                }
                const response = await MessageService.getAllMessage(this.group._id);
                if (response) {
                    this.messages = response;
                    console.log(this.messages)
                }
            } catch (error) {
                console.error('Error while fetching groups:', error);
            }
        },
        async sendMessage() {
            try {
                if (!this.newMessage.trim()) {
                    return;
                }
                const dataMess = {
                    groupid: this.group._id,
                    text: this.newMessage,
                    loai: "van ban"
                }
                await MessageService.create(this.token, dataMess);
                this.newMessage = '';
                this.getGroupMessage();
            } catch (error) {
                console.error('Error while sending message:', error);
            }
        },
        setActiveGroup(index) {
            this.activeGroupIndex = index;
        },
        formatTime(dateTime) {
            return moment(dateTime).format('HH:mm');
        },
        myMessage(name) {
            const myName = this.authStore.user._id;
            if (name == myName) {
                return 'my-message-item';
            } else {
                return 'message-item';
            }
        }
    },
    mounted() {
        this.getGroupMessage();
        this.interval = setInterval(() => {
        this.getGroupMessage();
    }, 1000);
    },
    watch: {
        group: {
            immediate: true,
            handler(newVal, oldVal) {
                this.getGroupMessage();
            }
        }
    }
};
</script>

<style scoped>
.message-item {
    background-color: antiquewhite;
    width: auto;
    min-width: 100px;
    max-width: 150px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
}

.my-message-item {
    background-color: rgb(164, 219, 248);
    width: auto;
    min-width: 100px;
    max-width: 160px;
    margin-bottom: 10px;
    padding: 10px;
    right: 0;
    margin-left: 180px;
    border-radius: 10px;
}

.message-list {
    padding: 0;
    list-style-type: none;
    max-height: 330px;
    overflow-y: auto;
}

.textarea-wrapper {
    position: absolute;
    width: 100%;
    top: 390px;
    padding: 10px;
}

.message-name {
    font-size: 12px
}
.message-time {
    font-size: 12px
}
.message-text {
    font-size: 15px
}
</style>