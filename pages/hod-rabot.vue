<template>
  <div class="content">
    <hodRobot :data="data"></hodRobot>
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
    return {};
  },
  asyncData({ params }) {
    let api = process.env.api;
    if (!api) {
      let api = context.env.api;
    }
    return axios.get(api + "7").then(res => {
      return { data: res.data };
    });
  },
  head() {
    let title = 'Хід будівнитства - ' + this.data.pagetitle + " | Utlandia";
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
    this.$store.commit("setHeader", "shadow");
  },
  methods: {}
};
</script>

<style lang="scss">
</style>
