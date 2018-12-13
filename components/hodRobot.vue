<template>
  <div class="hod-robot">
    <slick>
      <img class="hod-img" v-for="(item, i) in gal" :key="i" :data-id="item.id" :src="item.url">
    </slick>
  </div>
</template>

<script>
let Slick = null;
if (process.browser) {
  /* eslint-disable global-require */
  Slick = require("vue-slick").default;
  /* eslint-enable global-require */
}
export default {
  props: ["data"],
  components: {
    Slick
  },
  computed: {
    gal() {
      return this.data.data.gal;
    }
  },
  data() {
    return {};
  }
};
</script>


<style lang="scss">
.hod-robot {
  position: relative;
  overflow: hidden;
  .slick-slider {
    img {
      height: 100vh;
      object-fit: cover;
    }
    .slick-arrow {
      position: absolute;
    }
  }
  .hod-img {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
}
</style>
