<template>
  <div class="content p-header">
    <div class="contacts">
      <h1>Контакти та інфраструктура</h1>
      <div class="wrap-inf">
        <div class="list">
          <div
            class="item"
            v-for="(item, i) in data.infrastructure"
            :key="i"
            :class="{'active': activeItem == item.MIGX_id}"
            @click="active = item.MIGX_id"
          >
            <div class="title">{{item.title}}</div>
            <div class="adr" v-html="item.adress"></div>
          </div>
        </div>
        <div class="map">
          <div id="map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},

  data() {
    return {
      active: null
    };
  },
  asyncData({ params }) {
    let api = process.env.api;
    if (!api) {
      let api = context.env.api;
    }
    return axios.get(api + "10").then(res => {
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
    setTimeout(() => {
      this.$store.commit("setHeader", "");
    }, 400);

    this.loadMapBox();
  },
  computed: {
    activeItem() {
      if (!this.active) {
        return this.data.infrastructure[0].MIGX_id;
      } else {
        return this.active;
      }
    }
  },
  methods: {
    loadMapBox() {
      $("head").append(
        $('<link rel="stylesheet" type="text/css" />').attr(
          "href",
          "https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css"
        )
      );
      $.getScript(
        "https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js",
        () => {
          $.getScript(
            "https://mapbox.github.io/mapbox-gl-language/index.js",
            () => {
              mapboxgl.accessToken =
                "pk.eyJ1Ijoic3RlbmxpdGltcyIsImEiOiJjam1uaG9uZ24wcmg0M3FvZXplaTNnZmdsIn0.qFtcVdoa2pzGrH_ykQLdXQ";

              var map = new mapboxgl.Map({
                container: "map", // container id
                style: "mapbox://styles/mapbox/basic-v9", // stylesheet location
                center: [30.231698536778982, 50.51732365110613], // starting position [lng, lat]
                zoom: 13
              });

              // mapboxgl.setRTLTextPlugin(
              //   "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js"
              // );
              map.addControl(
                new MapboxLanguage({
                  defaultLanguage: "ru"
                })
              );
              map.scrollZoom.disable();
            }
          );
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.contacts {
  h1 {
    padding-left: 60px;
    font-size: 44px;
    font-weight: 900;
    color: #ff0000;
    margin-bottom: 37px;
    margin-top: 0;
  }
}

.wrap-inf {
  display: flex;
  //background: #bbaba4;
  height: calc(100vh - 285px);
}

.list {
  width: 390px;
  height: 100%;
  overflow: auto;
  .item {
    cursor: pointer;
    padding: 25px 25px 25px 60px;
    color: #ff0000;
    transition: all 0.3s ease;
    &.active {
      background: #efeae8;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 900;
  }
  .adr {
    font-size: 19px;
  }
}
.map {
  width: 100%;
}
#map {
  height: 100%;
}
@media (max-width: 1400px) {
  .wrap-inf {
    height: calc(100vh - 219px);
  }
}
</style>
