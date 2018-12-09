<template>
  <section class="container">
    <div>
    </div>
  </section>
</template>

<script>


export default {
  components: {
  },
   data () {
    return {
      title: 'Hello World!'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
};
</script>

<style lang="scss">
</style>
