<template>
  <header class="header" :class="$store.state.headerClass">
    <div class="container">
      <div class="logo">
        <div class="cr"></div>
        <a href="/">
          <img src="images/logo-utlandia.svg" alt>
        </a>
      </div>

      <div class="main-nav">
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
          <nuxt-link to="/" tag="li">
            <a>Хід будівнитства</a>
          </nuxt-link>
          <nuxt-link to="/" tag="li">
            <a>Контакти</a>
          </nuxt-link>
        </ul>
      </div>

      <div class="top-phone">
        <a href="#">0 800 111 22 33</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      title: "Utlandia"
    };
  }
};
</script>


<style lang="scss">
.top-phone {
  font-size: 32px;
  font-weight: 900;
  color: #85a8ff;
  line-height: 1;
  a {
    color: #85a8ff;
  }
}
.logo {
  position: relative;
  img {
    width: 180px;
    position: relative;
    z-index: 2;
  }
  .cr {
    width: 300px;
    height: 250px;
    background-color: #003dd6;
    position: absolute;
    top: -154px;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 50%;
  }
}

.header {
  padding-top: 26px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 800;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    transition: all 0.3s ease;
    background: rgba(251, 247, 244, 1);
    height: calc(100% + 30px);
  }
  a{
    transition: all .3s ease;
  }
  &.white {
    &:before {
      opacity: 0;
    }
  }
  &.blue {
    &:before {
      opacity: 0;
    }
    a {
      color: #fff;
    }
  }
  .container {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}

.main-nav {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a {
    font-size: 17px;
    font-weight: 900;
    color: #0031c7;
  }

  > ul {
    display: flex;
    li {
      margin: 0 15px;
    }
  }
}
</style>
