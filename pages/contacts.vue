<template>
  <div class="content">
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
    dfgsdfg

    {{data}}
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},

  data() {
    return {};
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

  },
  methods: {
  }
};
</script>

<style lang="scss">

</style>
