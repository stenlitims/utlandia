<template>
  <div class="hod-robot">
    <slick class="slider-for" :options="slider1" @afterChange="afterChange">
      <img class="hod-img" v-for="(item, i) in gal" :key="i" :data-id="i" :src="item.url">
    </slick>
    <div class="hod-nav" v-if="!galsh">
      <ul>
        <li v-for="(item, i) in data.data.data" :key="i">
          <div class="date js-date">{{item.name}}</div>
          <ul>
            <nuxt-link
              :class="{'active': activeItem == i2}"
              :to="'/hod-rabot/'+i2"
              tag="li"
              v-for="(item2, i2) in item.res"
              :key="i2"
            >
              <a>{{item2}}</a>
            </nuxt-link>
          </ul>
        </li>
      </ul>
    </div>

    <div class="img-list" v-show="!galsh">
      <slick :options="slider2" class="slider-nav">
        <div class="img-item" v-for="(item, i) in gal" :key="i">
          <img :src="item.url" alt>
        </div>
      </slick>
    </div>

    <div class="info-block">
      <div class="nav">
        <ul>
          <nuxt-link to="/hod-rabot" tag="li" :class="{'nuxt-link-exact-active': !galsh}">
            <a>Хід будівництва</a>
          </nuxt-link>
          <nuxt-link to="/gallary" tag="li">
            <a>Галерея комплекса</a>
          </nuxt-link>
          <nuxt-link to="/" tag="li">
            <a>3D Тур</a>
          </nuxt-link>
        </ul>
      </div>

      <div class="info" v-if="activeImg.alt">
        <h1>{{activeImg.alt}}</h1>
        <div class="text">{{activeImg.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
let Slick = null;
let SlideUpDown = null;
if (process.browser) {
  /* eslint-disable global-require */
  Slick = require("vue-slick").default;
  SlideUpDown = require("vue-slide-up-down").default;
  /* eslint-enable global-require */
}
export default {
  props: ["data", "galsh"],
  data() {
    return {
      slider2: {
        slidesToShow: 6,
        slidesToScroll: 6,
        asNavFor: ".slider-for",
        dots: true,
        //   centerMode: true,
        focusOnSelect: true
      },
      slider1: {
        asNavFor: ".slider-nav"
      },
      activeImg: {}
    };
  },
  components: {
    Slick,
    SlideUpDown
  },
  computed: {
    gal() {
      return this.data.data.gal;
    },
    activeItem() {
      if (this.$route.params.id) {
        return this.$route.params.id;
      } else {
        return this.data.data.last;
      }
    }
  },

  created() {},

  mounted() {
    this.activeImg = this.gal[0];
    $(".js-date").off("click");
    $(".js-date").on("click", function(e) {
      e.preventDefault();
      $(this)
        .next()
        .slideToggle();
    });
  },

  methods: {
    afterChange(e) {
      let id = $(".slider-for .slick-current img").data("id");
      this.activeImg = this.gal[id];
      //
    }
  }
};
</script>


<style lang="scss">
.img-list {
  position: absolute;
  bottom: 0px;
  right: 0;
  left: 0;
  z-index: 50;
  padding-bottom: 20px;
  height: 110px;
  &:before {
    position: absolute;
    content: "";
    bottom: 0;
    right: 0;
    left: 0;
    height: 130%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.85) 100%
    );
  }
  .slider-nav {
    z-index: 3;
    .slick-current {
      img {
        box-shadow: 0 0 0 4px #fe161d;
      }
    }
  }
  img {
    width: 143px;
    height: 81px;
    border-radius: 40px;
    transition: all 0.3s ease;
    cursor: pointer;
    object-fit: cover;
  }
  .img-item {
    padding: 5px;
  }
}

.info-block {
  position: absolute;
  left: 9%;
  top: 50%;
  transform: translate(0, -50%);
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  max-width: 362px;
  .nav {
    padding: 15px 30px;
    background: #fff;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    li {
      margin: 5px 0;
    }
    a {
      color: #002dcb;
      font-size: 24px;
      font-weight: 900;
      transition: all 0.3s ease;
    }
    .nuxt-link-exact-active {
      a {
        color: #ff0000;
      }
    }
  }
  .info {
    padding: 15px 30px;
  }
  h1 {
    font-size: 27px;
    font-weight: normal;
    color: #ff0000;
    margin-bottom: 15px;
  }
  .text {
    padding-bottom: 15px;
    font-size: 14px;
  }
}
.hod-nav {
  position: absolute;
  top: 50%;
  right: 9%;
  z-index: 150;
  transform: translate(0, -50%);
  ul {
    padding: 0;
    list-style: none;
    margin: 0;
  }
  > ul {
    > li {
      &:last-child {
        .date {
          background: #fff;
          color: #ff0000;
          cursor: pointer;
        }
      }
    }

    ul {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
      color: #fff;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
      font-size: 18px;
      li {
        margin: 5px 0;
        &.active {
          a {
            color: #ff0000;
          }
        }
      }
      a {
        color: #fff;
        transition: all 0.3s ease;
      }
    }
  }
  .date {
    background: #ff0000;
    color: #fff;
    padding: 22px 48px;
    border-radius: 45px;
    font-size: 18px;
    cursor: pointer;
    margin-bottom: 10px;
  }
}
.hod-robot {
  position: relative;
  overflow: hidden;
  height: 100vh;
  > .slider-for {
    img {
      height: 100vh;
      object-fit: cover;
    }
    .slick-arrow {
      position: absolute;
      top: 50%;
      width: 50px;
      height: 50px;
      margin-top: -25px;
      border: none;
      border-bottom: 8px solid #fff;
      border-right: 8px solid #fff;
      background: none;
      z-index: 50;
      text-indent: 9999px;
      cursor: pointer;
      z-index: 500;
    }

    .slick-prev {
      left: 2%;
      transform: rotate(135deg);
    }

    .slick-next {
      right: 3%;
      transform: rotate(-45deg);
    }
  }
  .hod-img {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
  svg {
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }
}

@media (max-width: 1400px) {
  .hod-nav .date {
    padding: 14px 31px;
  }
  .img-list {
    height: 94px;
    img {
      width: 120px;
      height: 66px;
    }
  }
  .info-block .nav a {
    font-size: 22px;
  }
  .info-block h1 {
    font-size: 22px;
  }
  .hod-robot > .slider-for .slick-arrow {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 1200px) {
  .info-block .nav a {
    font-size: 20px;
  }
  .info-block h1 {
    font-size: 20px;
  }
}
@media (max-width: 991px) {
  .hod-robot > .slider-for .slick-arrow {
    width: 30px;
    height: 30px;
  }

  .hod-robot > .slider-for img {
    height: calc(var(--vh, 1vh) * 100);
  }
  .info-block {
    max-width: 270px;
  }
  .info-block .nav,
  .info-block .info {
    padding: 11px 20px;
  }
  .img-list {
    .slider-nav {
      display: none;
    }
    //  display: none;
  }
  .hod-robot > .slider-for .slick-arrow {
    top: inherit;
    bottom: 5%;
  }
  .img-list:before {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.55) 100%
    );
  }
  .info-block {
    left: 3%;
  }
  .hod-nav {
    right: 5%;
  }
  .hod-robot > .slider-for .slick-next {
    right: 5%;
  }
  .hod-robot > .slider-for .slick-prev {
    left: 4%;
  }
}
@media (max-width: 556px) {
  .info-block .nav a {
    font-size: 17px;
  }
  .info-block h1 {
    font-size: 17px;
    margin-bottom: 10px;
  }
  .info-block .text {
    font-size: 13px;
    padding-bottom: 7px;
  }
  .info-block {
    max-width: 214px;
    top: 120px;
    transform: none;
  }
  .hod-nav > ul ul {
    display: none;
  }
  .hod-nav .date {
    padding: 11px 25px;
  }
}
</style>
