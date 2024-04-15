<template>
    <div class="row" style="position: relative;">
        <div class="col-9" style="padding: 0;">
            <div style="background-color: #4585f5cc;" class="p-2">
                <div>{{ group.groupName }}</div>
                <div style="font-size: 12px;">{{ group.members.length }} thành viên</div>
            </div>
            <div style="background-color: white;">
                <ul class="message-list">
                    <li v-for="(message, index) in messages" :key="index" class="message m-2">
                        <div v-if="message.loai === 'van_ban'">
                            <div :class="myMessage(message.userid)">
                                <div class="d-flex justify-content-between">
                                    <span style="font-size: 12px;">{{ message.name }}</span>
                                    <i class="fa-solid fa-ellipsis" @click="showOptions(index)"></i>
                                </div>
                                <div class="message-text">{{ message.text }}</div>
                                <div class="message-time">{{ formatTime(message.createdAt) }}</div>
                            </div>
                        </div>
                        <div v-else-if="message.loai === 'hinh_anh'">
                            <div :class="myMessage(message.userid)">
                                <div class="d-flex justify-content-between">
                                    <span style="font-size: 12px;">{{ message.name }}</span>
                                    <i class="fa-solid fa-ellipsis" @click="showOptions(index)"></i>
                                </div>
                                <div class="image-wrapper">
                                    <img :src="'http://localhost:5000/uploads/' + message.fileName" alt=""
                                        class="fit-image">
                                </div>
                                <div class="message-time">{{ formatTime(message.createdAt) }}</div>
                            </div>
                        </div>
                        <div v-else>
                            <div :class="myMessage(message.userid)">
                                <div class="d-flex justify-content-between">
                                    <span style="font-size: 12px;">{{ message.name }}</span>
                                    <i class="fa-solid fa-ellipsis" @click="showOptions(index)"></i>
                                </div>
                                <div class="image-wrapper">
                                    <embed :src="'http://localhost:5000/uploads/' + message.fileName" />{{
                                        message.fileName }}
                                </div>
                                <div class="message-time">{{ formatTime(message.createdAt) }}</div>
                            </div>
                        </div>
                        <div v-if="showDropdown[index]" class="dropdown-container">
                            <div class="d-flex" style="flex-direction: column; background-color: white;;">
                                <button class="btn btn-secondary my-1" @click="">Chỉnh sửa</button>
                                <button class="btn btn-secondary my-1" @click="">Xóa</button>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="textarea-wrapper d-flex">
                    <textarea v-model="newMessage" rows="1" placeholder="Nhập tin nhắn" class="form-control"></textarea>
                    <!-- <form @submit.prevent="photoSubmit">
                        <input type="file" name="image" accept="image/*" />
                        <input type="submit" value="Upload Photo" />
                    </form>
                    <form @submit.prevent="fileSubmit">
                        <input type="file" name="file" accept="application/msword, application/pdf" />
                        <input type="submit" value="Upload File" />
                    </form> -->
                    <input type="file" name="image" ref="photoInput" accept="image/*" style="display: none"
                        @change="handlePhotoChange">
                    <i class="fa-solid fa-image" @click="openPhotoInput"></i>
                    <input type="file" name="file" ref="fileInput" accept="application/msword, application/pdf"
                        style="display: none" @change="handleFileChange">
                    <i class="fa-solid fa-file" @click="openFileInput"></i>
                    <button @click="sendMessage" class="btn btn-primary">Gửi</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MessageService from "@/services/message.service";
import moment from 'moment';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

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
            showDropdown: [],
            messages: [],
            newMessage: '',
            lastMessage: null
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
                    loai: "van_ban"
                }
                await MessageService.create(this.token, dataMess);
                this.newMessage = '';
                this.getGroupMessage();
            } catch (error) {
                console.error('Error while sending message:', error);
            }
        },
        async photoSubmit(file) {
            try {

                if (!file) {
                    console.error('No file selected');
                    return;
                }

                const formData = new FormData();
                formData.append('image', file);

                const fileName = file.name;
                formData.append('groupid', this.group._id);
                formData.append('loai', "hinh_anh");
                formData.append('fileName', fileName);
                formData.append('userid', this.authStore.user._id);

                const uploadResponse = await axios.post('http://localhost:5000/api/message/img/sendImg', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Image uploaded successfully!', uploadResponse);
            } catch (error) {
                console.error('Error while submitting file:', error);
            }
        },
        async fileSubmit(file) {
            try {
                if (!file) {
                    console.error('No file selected');
                    return;
                }

                const formData = new FormData();
                formData.append('file', file);

                const fileName = file.name;
                formData.append('groupid', this.group._id);
                formData.append('loai', "tep");
                formData.append('fileName', fileName);
                formData.append('userid', this.authStore.user._id);

                const uploadResponse = await axios.post('http://localhost:5000/api/message/file/sendFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Image uploaded successfully!', uploadResponse);
            } catch (error) {
                console.error('Error while submitting file:', error);
            }
        },
        openFileInput() {
            this.$refs.fileInput.click();
        },
        async handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = async () => {
                await this.fileSubmit(file);
            };

            reader.readAsDataURL(file);
        },
        openPhotoInput() {
            this.$refs.photoInput.click();
        },
        async handlePhotoChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = async () => {
                await this.photoSubmit(file);
            };

            reader.readAsDataURL(file);
        },
        showOptions(index) {
            if (this.showDropdown[index]) {
                this.showDropdown[index] = false;
            } else {
                this.showDropdown[index] = true;
            }
        },
        // async sendImg(file) {
        //     try {
        //         const dataMess = {
        //             groupid: this.group._id,
        //             originalname: file.name,
        //             loai: "hinh_anh"
        //         };
        //         // const response = await MessageService.createMessImg(this.token, dataMess);
        //         console.log(dataMess);
        //     } catch (error) {
        //         console.error('Error while sending image:', error);
        //     }
        // },
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
    max-width: 260px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    position: relative;

}

.my-message-item {
    position: relative;
    background-color: rgb(164, 219, 248);
    width: auto;
    min-width: 100px;
    max-width: 260px;
    margin-bottom: 10px;
    padding: 10px;
    right: 0;
    margin-left: 400px;
    border-radius: 10px;
}

.message-list {
    padding: 0;
    list-style-type: none;
    max-height: 470px;
    overflow-y: auto;
    background-color: #f4f8ffcc;
}

.textarea-wrapper {
    position: absolute;
    width: 100%;
    top: 540px;
    padding: 10px;
}

.message-name {
    /* font-size: 12px */
}

.message-time {
    font-size: 12px
}

.message-text {
    font-size: 15px
}

.image-wrapper {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.fit-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* .message{
    position: relative;
} */

.dropdown-container {
  position: fixed;
  top: 100;
  left: 100;
  z-index: 999;
}
</style>