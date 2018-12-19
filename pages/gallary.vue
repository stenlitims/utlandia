<template>
  <div class="content">
    <hodRobot :data="data" :galsh="gal"></hodRobot>
  </div>
</template>

<script>
import axios from "axios";
import hodRobot from "@/components/hodRobot";

export default {
  components: {
    hodRobot
  },

  data() {
    return {
      gal: true
    };
  },
  asyncData({ params }) {
    let api = process.env.api;
    if (!api) {
      let api = context.env.api;
    }
    let url = api + "17";
    if (params.id) {
      url = url + "&m=" + params.id;
    }
    return axios.get(url).then(res => {
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
      this.$store.commit("setHeader", "shadow");
    }, 400);
  },
  methods: {}
};
</script>

<style lang="scss">
</style>
