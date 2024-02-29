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
        <Exam :lesson="lesson" />
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
          console.log("Thông tin bài học:", this.lesson);

          const responseDoc = await LessonService.getDoc(response._id);
          if (responseDoc) {
            this.documents = responseDoc;
            console.log("Dữ liệu tài liệu:", this.documents);
          } else {
            console.error("Không tìm thấy thông tin tài liệu.");
          }

          const responseVid = await LessonService.getVid(response._id);
          if (responseVid) {
            this.videos = responseVid;
            console.log("Dữ liệu video:", this.videos);
          } else {
            console.error("Không tìm thấy thông tin video.");
          }

        } else {
          console.error("Không tìm thấy thông tin bài học.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin bài học:", error);
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
  