<template>
  <nav id="nav">
    <div class="left" @click="toMainPage">
      <img src="@/assets/logo.svg" alt="logo" />
      <p>FITvt</p>
    </div>
    <div class="right">
      <button class="btn neon-btn" @click="toLogin" v-if="routeIsLogin">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        LOGIN
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    //show the login button only in home ('/') page
    routeIsLogin() {
      return this.$router.currentRoute.path === "/";
    },
  },
  methods: {
    toLogin() {
      this.$router.push("login");
    },
    toMainPage() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/globals.scss";
</style>