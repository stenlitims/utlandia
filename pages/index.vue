<template>
  <div class="content">
    <section class="section section1" id="section1">
      <div class="container">
        <div class="main-text">
          <div class="main-heading a-heading" v-html="data.introtext"></div>
          <div class="row">
            <div class="col-lg-5">
              <div class="text-inner a-main-text" v-html="data.content"></div>
            </div>
          </div>
        </div>

        <div class="dom">
          <img class="a-dom" src="images/dom.png" alt>
        </div>

        <div class="t-logo a-t-logo">
          <img src="images/tomin-logo.svg" alt>
        </div>
      </div>
    </section>

    <scrollactive
      tag="div"
      class="scroll-nav"
      :offset="0"
      :class="{'active': activeScrollNav}"
      @itemchanged="onItemChanged"
    >
      <a href="#slide1" data-header="white" class="scrollactive-item">
        <span>01</span>
      </a>
      <a href="#slide2" data-header="blue" class="scrollactive-item">
        <span>02</span>
      </a>
      <a href="#slide3" data-header="white" class="scrollactive-item">
        <span>03</span>
      </a>
      <a href="#slide4" data-header="blue" class="scrollactive-item">
        <span>04</span>
      </a>
      <a href="#slide5" data-header="blue" class="scrollactive-item">
        <span>05</span>
      </a>
    </scrollactive>

    <section class="section slide slide1" id="slide1">
      <div class="lines">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="container">
        <div class="row-slide">
          <div class="num a-num">01</div>
          <div class="text a-text" v-html="data.list[0].text"></div>
        </div>
      </div>
      <div class="a-bg"></div>
      <div class="bg">
        <div class="img1 a-img1">
          <img src="images/slide1/1.svg" alt>
        </div>
        <div class="img2 a-img2">
          <img src="images/slide1/2.svg" alt>
        </div>
        <div class="img3 a-img3">
          <img src="images/slide1/3.svg" alt>
        </div>
      </div>
    </section>
    <section class="section slide slide2" id="slide2">
      <div class="lines">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="container">
        <div class="row-slide">
          <div class="num a-num">02</div>
          <div class="text">
            <div class="a-text" v-html="data.list[1].text"></div>
          </div>
        </div>
      </div>
      <div class="img1 a-img-r">
        <img src="images/slide2.svg" alt>
      </div>
    </section>
    <section class="section slide slide3" id="slide3">
      <div class="lines">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="container">
        <div class="row-slide">
          <div class="num a-num">03</div>
          <div class="text a-text" v-html="data.list[2].text"></div>
        </div>
      </div>
    </section>
    <section class="section slide slide4" id="slide4">
      <div class="container">
        <div class="row-slide">
          <div class="num a-num">04</div>
          <div class="text a-text" v-html="data.list[3].text"></div>
        </div>
      </div>
      <div class="img1 a-img-r2">
        <img src="images/slide4.svg" alt>
      </div>
    </section>
    <section class="section slide slide5" id="slide5">
      <div class="bg">
        <div class="container">
          <div class="row-slide">
            <div class="num a-num">05</div>
            <div class="text a-text" v-html="data.list[4].text"></div>
          </div>
        </div>
      </div>

      <div class="img1 a-img1">
        <img src="images/slide5.svg" alt>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},

  data() {
    return {
      title: "Utlandia",
      scroll: null,
      activeScrollNav: false,
      mobile: false
    };
  },
  asyncData({ params }) {
    let api = process.env.api;
    if (!api) {
      let api = context.env.api;
    }
    return axios.get(api + "1").then(res => {
      return { data: res.data };
    });
  },
  head() {
    let title = this.data.pagetitle + " | Utlandia";
    if (this.data.longtitle) {
      title = this.data.longtitle;
    }
    return {
      title: title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.data.description
        }
      ]
    };
  },
  mounted() {
    //  $("body").addClass("loaded");
    setTimeout(() => {
      this.$store.commit("setHeader", "");
    }, 400);

    if ($(window).width() < 991) {
      this.mobile = true;
    }

    setTimeout(() => {
      $("body").addClass("loaded");
    }, 300);
    var heightSlide = $(".slide1").outerHeight() - 200;
    $(document).scroll(() => {
      var scroll = $(window).scrollTop();
      if (scroll > heightSlide) {
        this.activeScrollNav = true;
      } else {
        this.activeScrollNav = false;
      }
    });

    if ($(window).width() < 991) {
      for (let item of $(".section")) {
        //     console.log(item);
        var mc = new Hammer(item);
        mc.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
        mc.on("swipeup swipedown", ev => {
          //   console.log(ev.type);
          if (ev.type == "swipeup") {
            if ($(".scrollactive-nav .is-active").length > 0) {
              let el = $(".scrollactive-nav .is-active")
                .next()
                .attr("href");
              this.scrollto(el);
            } else {
              let el = $(".scrollactive-nav a:first-child").attr("href");
              this.scrollto(el);
            }
          } else {
            if ($(".scrollactive-nav .is-active").length > 0) {
              let el = $(".scrollactive-nav .is-active")
                .prev()
                .attr("href");
              if (!el) el = "#section1";
              this.scrollto(el);
            }
          }
        });
      }
    }

    $(document).on("mousewheel DOMMouseScroll", event => {
      if ($(".slide").length === 0 || $("html, body").is(":animated")) return;

      event.preventDefault();

      var direction =
        event.originalEvent.wheelDelta || -event.originalEvent.detail;

      if (direction < 0) {
        if ($(".scrollactive-nav .is-active").length > 0) {
          let el = $(".scrollactive-nav .is-active")
            .next()
            .attr("href");
          this.scrollto(el);
        } else {
          let el = $(".scrollactive-nav a:first-child").attr("href");
          this.scrollto(el);
        }
      } else {
        if ($(".scrollactive-nav .is-active").length > 0) {
          let el = $(".scrollactive-nav .is-active")
            .prev()
            .attr("href");
          if (!el) el = "#section1";
          this.scrollto(el);
        }
      }
    });

    // $("body").swipe({
    //   swipe: function(
    //     event,
    //     direction,
    //     distance,
    //     duration,
    //     fingerCount,
    //     fingerData
    //   ) {
    //  //   if ($(".slide").length === 0 || $("html, body").is(":animated")) return;

    //     event.preventDefault();
    //     console.log(direction);
    //   }
    // });
  },
  methods: {
    onItemChanged(event, currentItem, lastActiveItem) {
      let type = $(currentItem).data("header");
      $(".slide").removeClass("active");
      let sec = $(currentItem).attr("href");
      $(sec).addClass("active");
      this.$store.commit("setHeader", type);
    },

    setSection(sec) {
      $(".slide").removeClass("active");
      $(sec).addClass("active");
      $(".scroll-nav a").removeClass("is-active");
      $(".scroll-nav a[href='" + sec + "']").addClass("is-active");
    },

    scrollto(el) {
      if (!el) return;
      // console.log(el);
      // $("html, body").animate(
      //   {
      //     scrollTop: $(el).offset().top
      //   },
      //   500
      // );
      let offset = 0;
      if (this.mobile) {
        offset = 1;
      }
      if (el == "#slide5") {
        offset = 10;
      }
      $("body").scrollTo(el, 500, {
        offset: offset,
        onAfter: () => {
          this.setSection(el);
          //  console.log(234);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.row-slide {
  display: flex;
  align-items: center;
  .num {
    font-size: 184px;
    font-weight: 900;
    color: #ffffff;
    //  text-shadow: -2px 0 #ff0000, 0 2px #ff0000, 2px 0 #ff0000, 0 -2px #ff0000;
    //  text-shadow:
    //    2px 2px 0 #ff0000,
    //  -2px -2px 0 #ff0000,
    //   2px -2px 0 #ff0000,
    //   -2px 2px 0 #ff0000,
    //    2px 2px 0 #ff0000;
    -webkit-text-stroke: 2px red;
    text-stroke: 2px red;
    line-height: 1;
    margin-right: 116px;
  }
  .text {
    font-size: 44px;
    color: #ff0000;
    margin-top: -2%;
  }
  p {
    margin-bottom: 0;
  }
}
.slide {
  position: relative;
  overflow: hidden;
  .container {
    position: relative;
    z-index: 2;
  }
}

.a-num,
.a-bg,
.a-text,
.a-img1,
.a-img2,
.a-img-r,
.a-img-r2,
.a-img3 {
  transition: all 0.5s ease-out;
}

.a-text {
  transform: translate(0, 700px);
  transition-delay: 0.2s;
}

.a-num {
  transform: translate(0, -500px);
  // transition-delay: 0.2s;
}

.a-bg {
  transform: translate(0, 100%);
  transition-delay: 0.4s;
}

.a-img1 {
  transform: translate(0, 800px);
  transition-delay: 1s;
}

.a-img-r {
  transform: translate(100%, 0);
  transition: all 0.3s ease-out;
  transition-delay: 0.7s;
}

.a-img-r2 {
  transform: translate(110%, 0);
  transition: all 0.3s ease-out;
  transition-delay: 0.7s;
}

.a-img2 {
  transform: translate(0, 800px);
  transition-delay: 0.6s;
}
.a-img3 {
  transform: translate(0, 700px);
  transition-delay: 0.8s;
}

.active {
  .a-num {
    transform: translate(0, 0%);
  }
  .a-text,
  .a-img1,
  .a-img2,
  .a-img3,
  .a-img-r,
  .a-img-r2,
  .a-bg {
    transform: translate(0, 0%);
  }
}

.slide1 {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;

  .a-bg {
    height: 50vh;
    background-color: #fbf7f4;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .bg {
    margin-top: auto;
    height: 50vh;

    position: relative;
    z-index: 1;
    img {
      max-width: 100%;
    }
    > * {
      position: absolute;
    }
    .img1 {
      bottom: 23%;
      left: 5%;
      text-align: center;
    }
    .img2 {
      bottom: 65%;
      left: 44%;
      text-align: center;
    }
    .img3 {
      bottom: 23%;
      right: 5%;
      text-align: center;
    }
  }
}

.slide2 {
  background-color: #0031c7;
  .lines {
    > div {
      background: #224fda;
    }
  }

  .row-slide .num {
    -webkit-text-stroke: 2px #fff;
    color: transparent;
    margin-right: 20px;
  }
  .row-slide {
    .text {
      color: #fff;
      transform: translate(0, 90%);
      font-size: 60px;
    }
  }
  .img1 {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    img {
      height: 100%;
    }
  }
}

.slide3 {
  .row-slide {
    max-width: 40%;
    display: block;
    .num {
      margin-bottom: 35px;
    }
    .text {
      font-size: 60px;
    }
  }
}

.slide4 {
  background: #004aff;
  .row-slide {
    display: block;
    .num {
      margin-bottom: 35px;
      -webkit-text-stroke: 2px #fff;
      color: transparent;
    }
    .text {
      font-size: 60px;
      color: #fff;
    }
    p {
      margin-bottom: 0;
    }
  }
  .img1 {
    position: absolute;
    right: 3.7%;
    top: 0;
    height: 72vh;
    img {
      height: 100%;
    }
  }
}

.slide5 {
  .bg {
    background: #004aff;
    position: relative;
    margin-top: -50px;
    &:before {
      position: absolute;
      content: "";
      top: -200px;
      left: 0;
      right: 0;
      height: 200px;
      background: #004aff;
    }
  }
  .row-slide {
    display: block;
    .num {
      margin-bottom: 35px;
      -webkit-text-stroke: 2px #fff;
      color: transparent;
    }
    .text {
      color: #fff;
      padding-bottom: 30px;
    }
  }
  .img1 {
    position: absolute;
    right: 5%;
    top: 27%;
    height: 72vh;
    img {
      height: 100%;
    }
  }
}

.lines {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
  // z-index: -1;
  > div {
    height: 100%;
    width: 1px;
    background: #e5e5e5;
  }
}
.scroll-nav {
  position: fixed;
  bottom: 4%;
  left: 5%;
  transition: all 0.4s ease;
  opacity: 0;
  visibility: hidden;
  display: flex;
  z-index: 300;
  &.active {
    opacity: 1;
    visibility: visible;
  }
  a {
    font-size: 41px;
    font-weight: 900;
    color: #fff;
    text-shadow: 0 0 1px #ff0000;
    display: block;
    margin: 0 15px;
    transition: all 0.3s ease;
    position: relative;
    &.is-active {
      color: #ff0000;
      text-shadow: none;
    }
    // &:before {
    //   content: "";
    //   position: absolute;
    //   width: 80px;
    //   height: 80px;
    //   border-radius: 50%;
    //   top: 50%;
    //   left: 50%;
    //   transform: translate(-50%, -50%);
    //   transition: all 0.3s ease;
    //   opacity: 0;
    //   pointer-events: none;
    //   background: radial-gradient(ellipse at center, rgba(0,61,214,1) 0%,rgba(0,61,214,0) 83%,rgba(0,61,214,0) 100%);
    // }
    &:hover {
      // &:before {
      //   opacity: 1;
      // }
    }
  }
  span {
    position: relative;
    z-index: 1;
  }
}
.dom {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-42%, 0);
  height: 68.5vh;
  img {
    height: 100%;
  }
}
.main-heading {
  text-align: center;
  font-size: 122px;
  font-weight: 900;
  color: #ff0000;
  line-height: 1.2;
  padding-top: 3%;
  margin-bottom: 15px;
}
.section1 {
  position: relative;
  height: 100vh;
  &:before {
    content: "";
    position: absolute;
    left: 48%;
    width: 52%;
    top: 190px;
    bottom: 0;
    transition: all 0.5s ease;
    transition-delay: 0.8s;
    transform: translate(100%, 0);
    background-color: #0031c7;
  }

  .container {
    position: relative;
    height: 100%;
    z-index: 1;
  }
  .t-logo {
    position: absolute;
    bottom: 49px;
    left: 0;
  }

  .text-inner {
    //  padding-right: 30px;
  }
}

.a-heading,
.a-dom,
.a-main-text,
.a-t-logo {
  transition: all 0.4s ease;
}

.a-dom {
  transform: translate(0, 110%);
  transition: all 0.6s ease;
  transition-delay: 0.4s;
}

.a-t-logo {
  transform: translate(-150%, 0);
  opacity: 0;
  transition-delay: 1s;
}

.a-main-text {
  transition-delay: 0.2s;
}

.a-heading,
.a-main-text {
  opacity: 0;
  transform: translate(0, -30px);
}

.loaded {
  .section1 {
    &:before {
      transform: translate(0%, 0);
    }
  }
  .a-heading,
  .a-main-text,
  .a-dom,
  .a-t-logo {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@media (max-width: 1400px) {
  .section {
    padding-top: 130px;
  }
  .section1:before {
    top: 130px;
  }
  .main-heading {
    font-size: 100px;
    padding-top: 2%;
  }
  .dom {
    transform: translate(-35%, 0);
    height: 66.5vh;
  }
  .text-inner {
    font-size: 18px;
  }

  .row-slide .num {
    font-size: 160px;
  }
  .row-slide .text {
    font-size: 40px;
  }
  .slide1 .bg img {
    max-width: 75%;
  }
  .slide1 .bg .img1 {
    bottom: 25%;
  }
  .slide2 .row-slide .text,
  .slide4 .row-slide .text {
    font-size: 46px;
  }
  .slide3 .row-slide .num {
    margin-bottom: 20px;
  }
  .slide3 .row-slide .text {
    font-size: 42px;
  }
}

@media (max-width: 1300px) {
  .row-slide .num {
    font-size: 140px;
  }
}

@media (max-width: 1200px) {
  .section {
    padding-top: 110px;
  }
  .section1 {
    overflow: hidden;
    &:before {
      top: 110px;
    }
  }
  .main-heading {
    font-size: 80px;
  }

  .dom {
    transform: translate(-20%, 0);
    height: 61.5vh;
  }

  .row-slide .num {
    margin-right: 70px;
    font-size: 120px;
  }
  .row-slide .text {
    margin-top: 0;
    font-size: 36px;
  }
  .slide1 .bg img {
    max-width: 60%;
  }
  .scroll-nav {
    bottom: 3.5%;
  }
  .slide1 .bg .img1 {
    bottom: 27%;
  }
  .slide2 .row-slide .text,
  .slide4 .row-slide .text {
    font-size: 38px;
  }
  .slide3 .row-slide .text {
    font-size: 38px;
  }
  .slide3 .row-slide .num {
    margin-bottom: 5px;
  }
  .slide4 .img1 {
    height: 76vh;
  }
  .slide4 .row-slide .num {
    margin-bottom: 24px;
  }
  .slide5 .bg {
    margin-top: 0;
  }
  .slide5 .row-slide .num {
    margin-bottom: 10px;
  }
  .slide5 .row-slide .text {
    font-size: 30px;
  }
}

@media (max-width: 991px) {
  body {
    overflow: hidden;
  }
  .section {
    height: calc(var(--vh, 1vh) * 100);
    min-height: calc(var(--vh, 1vh) * 100);
  }
  .main-text {
    display: flex;
    flex-direction: column;
    .text-inner {
      p:last-child {
        max-width: 50%;
      }
    }
  }
  .main-heading {
    order: 1;
  }
  .section1:before {
    top: 240px;
  }

  .section1 .t-logo {
    display: none;
  }
  .main-heading {
    padding-top: 0;
  }
  .section {
    padding-top: 130px;
    overflow: hidden;
  }
  .dom {
    transform: translate(-50%, 0);
    height: 61.5vh;
  }
  .row-slide {
    display: block;
    .num {
      margin-bottom: 30px;
    }
  }
  .slide2 .row-slide .text {
    transform: none;
  }
  .row-slide .num {
    font-size: 176px;
  }
  .slide4 .img1 {
    right: 0;
    img {
      transform: translate(18%, 0);
    }
  }
  .slide4 .img1 {
    height: 64vh;
  }
  .slide4 .row-slide {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: calc(100vh - 280px);
    .text {
      margin-top: auto;
    }
  }
  .main-heading {
    z-index: 20;
  }
}

@media (max-width: 768px) {
  .section {
    padding-top: 100px;
  }
  .text-inner {
    font-size: 16px;
  }
  .main-heading {
    line-height: 1.1;
    margin-top: -10px;
    position: relative;
  }
  .dom {
    height: 50vh;
  }
  .row-slide .num {
    font-size: 124px;
  }
  .row-slide .text {
    margin-top: 0;
    font-size: 30px;
  }
  .row-slide .num {
    margin-bottom: 10px;
  }
  .section {
    padding-top: 94px;
  }
  .slide1 .bg .img1 {
    left: -2%;
  }
  .slide1 .bg .img3 {
    right: -5%;
  }
  .scroll-nav a {
    font-size: 34px;
  }
  .scroll-nav {
    bottom: 2.5%;
  }
  .slide1 .bg img {
    max-width: 50%;
  }
  .slide1 .a-bg,
  .slide1 .bg {
    height: 40vh;
  }
  .slide2 .row-slide .text,
  .slide4 .row-slide .text,
  .slide3 .row-slide .text {
    font-size: 30px;
  }
  .slide3 .row-slide {
    max-width: 100%;
    br {
      display: none;
    }
  }
}
@media (max-width: 560px) {
  .main-heading {
    font-size: 70px;
  }
  .dom {
    height: 44vh;
  }
}
@media (max-width: 440px) {
  .text-inner {
    font-size: 14px;
  }
  .main-heading {
    font-size: 60px;
  }
  .scroll-nav a {
    font-size: 22px;
    margin: 0 10px;
  }
  .scroll-nav {
    left: 3%;
  }
  .row-slide .num {
    font-size: 120px;
  }
  .row-slide .text {
    font-size: 24px;
  }
  .slide1 .bg .img1 {
    width: 300px;
    left: -17%;
  }
  .slide1 .bg .img3 {
    width: 300px;
    right: -17%;
  }
  .slide1 .bg .img2 {
    width: 120px;
    left: 33%;
    bottom: 72%;
  }
  .slide2 .row-slide .text,
  .slide4 .row-slide .text,
  .slide3 .row-slide .text {
    font-size: 22px;
  }
  .slide2 .row-slide .text {
    width: 60%;
  }
  .slide4 .row-slide {
    height: calc(100vh - 205px);
  }
  .slide5 .img1 {
    display: none;
  }
  .slide5 .row-slide .text {
    font-size: 24px;
  }
}
</style>
