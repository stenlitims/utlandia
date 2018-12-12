<template>
  <div class="content">
    <section class="section section1" id="section1">
      <div class="container">
        <div class="main-heading a-heading">ЖИВИ КЛАСНО</div>
        <div class="row">
          <div class="col-lg-5">
            <div class="text-inner a-main-text">
              <p>Чи бажали б ви жити в затишному, тихому місці? Якомога далі від великих магістралей і міського шуму. Там, де можна спокійно і комфортно відпочити після напруженого трудового дня.</p>
              <p>
                <b>Таке місце є.
                  <br>Це — житловий комплекс «Utlandia».
                </b>
              </p>
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
          <div class="text a-text">Живи класно в Ютландії!
            <br>Поряд з кращим парком у місті.
          </div>
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
            <div class="a-text">Живи класно в Ютландії,
              <br>бо тут в кожній квартирі
              <br>є власна тераса
            </div>
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
          <div class="text a-text">Живи класно
            <br>в Ютландії,
            <br>бо тут є зручний підземний паркінг
          </div>
        </div>
      </div>
    </section>
    <section class="section slide slide4" id="slide4">
      <div class="container">
        <div class="row-slide">
          <div class="num a-num">04</div>
          <div class="text a-text">Живи класно в Ютландії,
            <br>бо тут ти будеш
            <br>цілодобово у безпеці
          </div>
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
            <div class="text a-text">Живи класно в Ютландії,
              <br>бо тут зони відпочинку
              <br>та дитячі майданчики
              <br>по всій території
            </div>
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
export default {
  components: {},
  data() {
    return {
      title: "Utlandia",
      scroll: null,
      activeScrollNav: false
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  },
  mounted() {
    $("body").addClass("loaded");
    var heightSlide = $(".slide1").outerHeight() - 100;
    $(document).scroll(() => {
      var scroll = $(window).scrollTop();
      if (scroll > heightSlide) {
        this.activeScrollNav = true;
      } else {
        this.activeScrollNav = false;
      }
    });

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
  },
  methods: {
    onItemChanged(event, currentItem, lastActiveItem) {
      let type = $(currentItem).data("header");
      $(".slide").removeClass("active");
      let sec = $(currentItem).attr("href");
      $(sec).addClass("active");
      //
      // if($(sec+ ' .js-slideUp').length > 0){
      //   this.slideUp(sec+ ' .js-slideUp', .5);
      // }

      this.$store.commit("setHeader", type);
    },
    scrollto(el) {
      if (!el) return;
      // console.log(el);
      $("html, body").animate(
        {
          scrollTop: $(el).offset().top
        },
        500
      );
    },

    slideUp(el, t = 1, d = 0.3) {
      let tl = new TimelineMax();
      tl.fromTo(el, d, { y: -100 }, { y: 0 }, t);
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
    }
    .img2 {
      bottom: 65%;
      left: 44%;
    }
    .img3 {
      bottom: 23%;
      right: 5%;
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
</style>
