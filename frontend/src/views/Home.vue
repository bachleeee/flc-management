<template>
  <div class="page">
    <div class="container-xxl">
      <div class="banner">
        <img src="../assets/img/banner.png" alt="">
      </div>
      <div>
        <section class="first-section">
          <h2 class="text-center mb-5">Những gì chỉ có tại <span style="color: rgb(61, 61, 253);">DEVLINGO</span></h2>
          <div class="d-flex justify-content-around">
            <div class="col-3 intro">
              <i class="intro-icon fa-solid fa-video"></i>
              <h5>Video bài giảng chất lượng cao</h5>
              <p>Bởi đội ngũ giáo viên xuất sắc và tận tâm IELTS 8.0 - 8.5, cựu du học sinh, tốt nghiệp tại các trường Đại học danh tiếng</p>
            </div>
            <div class="col-3 intro">
              <i class="intro-icon fa-solid fa-clipboard"></i>
              <h5>Đầy đủ bài mẫu, bài tập, mini test, progress test như thi thật</h5>
              <p>Bộ tài liệu đã giúp 600 học viên đã đạt IELTS 7.0-8.5 tính tới tháng 5/2021</p>
            </div>
            <div class="col-3 intro">
              <i class="intro-icon fa-solid fa-file"></i>
              <h5>Bài Speaking-Writing được chấm chất lượng hơn cả offline</h5>
              <p>Giáo viên chấm bài chính xác từng chữ với Writing, từng giây với Speaking, kết hợp bài kiểm tra phát âm bằng AI</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background-color: rgb(251, 251, 251);
}

.banner {
  width: 100%;
  height: auto;
}

.banner img {
  width: 100%;
  height: auto;
}
.first-section {
    padding-top: 50px;
    padding-bottom: 150px;
}
.intro {
  background-color: rgb(255, 255, 255);
  padding: 30px;
  text-align: center;
  box-shadow: 30px 20px 35px 10px #d4d4d4;
  border-radius: 10%;
}

.intro-icon {
  background-color: rgb(142, 225, 255);
  padding: 25px;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  font-size: 30px;
  margin-bottom: 20px;
  display: inline-block;
}

.fa-video {
  color: rgb(251, 23, 23);
}

.fa-file {
  color: rgb(251, 183, 23);
}

.fa-clipboard {
  color: rgb(145, 23, 251);
}
</style>
