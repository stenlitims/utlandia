<template>
  <div class="main-wrap">
    <mainHeader/>
    <nuxt/>

    <div class="mob-nav">
      <div class="close-modal hidden-lg"></div>
      <div class="mob-main-nav">
        <ul>
          <nuxt-link to="/" tag="li">
            <a>Переваги</a>
          </nuxt-link>
          <nuxt-link to="/" tag="li">
            <a>Планування</a>
          </nuxt-link>
          <nuxt-link to="/" tag="li">
            <a>Тур комплексом</a>
          </nuxt-link>
          <nuxt-link to="/hod-rabot" tag="li">
            <a>Хід будівнитства</a>
          </nuxt-link>
          <nuxt-link to="/contacts" tag="li">
            <a>Контакти</a>
          </nuxt-link>
        </ul>
      </div>
      <div class="phone">
        <a href="#">0 800 111 22 33</a>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from "@/components/header";

export default {
  data() {
    return {};
  },
  components: {
    mainHeader
  },
  mounted() {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    
    var g = {
      getOs: function() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/windows phone/i.test(userAgent)) {
          return "Windows Phone";
        }
        if (/android/i.test(userAgent)) {
          return "Android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return "iOS";
        }
        return "unknown";
      }
    };

    var os = g.getOs(),
      eventClick = os == "iOS" ? "touchstart" : "click";

    // mob mav
    $(document).on(eventClick, ".js-open-nav", function() {
      $(".mob-nav").addClass("active");
      $("body").append('<div class="mask-site"></div>');
      setTimeout(function() {
        $("body").addClass("o-hide");
      }, 10);
    });

    $(document).on(
      eventClick,
      ".mask-site, .close-modal, .mob-main-nav a",
      function() {
        $(".mob-nav").removeClass("active");
        $(".mask-site").remove();
        setTimeout(function() {
          $("body").removeClass("o-hide");
        }, 100);
      }
    );
  }
};
</script>


<style lang="scss">
</style>
