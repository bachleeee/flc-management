<template>
  <div class="container-xxl">
    <div class="sub-nav d-flex justify-content-around">
      <ul class="d-flex justify-content-around" style="margin: 0px;">
        <li class="tab-option" @click="switchTab('lesson')" :class="{ 'active': activeTab === 'lesson' }">Bài học</li>
        <li class="tab-option" @click="switchTab('exercise')" :class="{ 'active': activeTab === 'exercise' }">Bài tập</li>
      </ul>
    </div>
    <div class="container">
      <div v-if="activeTab === 'exercise'">
        <Exam :lesson="lesson" :myProgress="myProgress" />
      </div>
      <div v-if="videos.length > 0 && activeTab === 'lesson'">
        <h5 style="color:rgb(255, 255, 255)" class="d-flex justify-content-center pt-3">{{ lesson.name }}</h5>
        <div class="row">
          <div class="col-1 d-flex align-items-center">
            <button class="btn btn-outline-dark" @click="preVideo"><i class="fa-solid fa-arrow-left"></i></button>
          </div>
          <div class="col-10">
            <ul style="padding-left: 0;">
              <li v-for="(video, index) in videos" :key="index" v-show="index === currentVideoIndex">
                <iframe width="100%" height="400px" :src="'https://www.youtube.com/embed/' + video.link" frameborder="0"
                  allowfullscreen></iframe>
              </li>
            </ul>
          </div>
          <div class="col-1 d-flex align-items-center">
            <button class="btn btn-outline-dark" @click="nextVideo"><i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
      <div v-if="documents.length > 0 && activeTab === 'lesson'" class="bg-blue d-flex justify-content-center">
        <div v-if="documents.length > 0" class="image-list pt-4">
          <ul>
            <li class="" v-for="(doc, index) in documents" :key="index">
              <img :src="doc.link" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LessonService from "@/service/lesson.service";
import ProgressService from "@/service/progress.service";
import { useAuthStore } from "@/store/auth";
import Exam from "@/components/Exam.vue";

export default {
  components: {
    Exam
  },
  data() {
    return {
      lesson: null,
      videos: [],
      documents: [],
      currentVideoIndex: 0,
      activeTab: 'lesson',
      exams: [],
      myProgress: null
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  methods: {
    async getLesson() {
    try {
      const slug = this.$route.params.lessonName;
      const response = await LessonService.getBySlug(slug);
      if (response) {
        this.lesson = response;
        await this.getProgress();
        await this.getDocuments();
        await this.getVideos();
      } else {
        console.error("Không tìm thấy thông tin bài học.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin bài học:", error);
    }
  },
  async getProgress() {
    try {
      const token = localStorage.getItem('token');
      const classid = null;
      const responseProgress = await ProgressService.getMyProgress(token,classid, this.lesson._id);
      if (responseProgress) {
        this.myProgress = responseProgress;
      } else {
        console.error("Không tìm thấy thông tin tiến độ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin tiến độ:", error);
    }
  },
  async getDocuments() {
    try {
      const responseDoc = await LessonService.getDoc(this.lesson._id);
      if (responseDoc) {
        this.documents = responseDoc;
      } else {
        console.error("Không tìm thấy thông tin tài liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin tài liệu:", error);
    }
  },
  async getVideos() {
    try {
      const responseVid = await LessonService.getVid(this.lesson._id);
      if (responseVid) {
        this.videos = responseVid;
      } else {
        console.error("Không tìm thấy thông tin video.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin video:", error);
    }
  },
    nextVideo() {
      if (this.currentVideoIndex < this.videos.length - 1) {
        this.currentVideoIndex += 1;
      } else {
        this.currentVideoIndex = 0;
      }
    },
    preVideo() {
      if (this.currentVideoIndex > 0) {
        this.currentVideoIndex -= 1;
      } else {
        this.currentVideoIndex = this.videos.length - 1;
      }
    },
    switchTab(tab) {
      this.activeTab = tab;
    },
  },
  created() {
    this.getLesson();
  },
};
</script>
  
<style scoped>
li {
  list-style: none;
  cursor: pointer;
  padding: 10px 20px 0px 20px;
  border-radius: 10px 10px 0 0;
  transition: background-color 0.3s ease;
}

.active {
  background-color: #f0f7ff;
  color: #0C0928;
}

.sub-nav {
  background-color: #e0e7fa;
  padding-top: 50px;
}

.container-xxl {
  background-color: #f0f7ff;
}

.bg-blue {
  background-color: rgb(32, 114, 255);
}

.image-list {
  max-height: 600px;
  overflow-y: auto;
}

.image-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.image-list li {
  margin-bottom: 10px;
}

.tab-option {
  width: 150px;
  height: 60px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}
</style>
  