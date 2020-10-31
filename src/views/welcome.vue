<template>
  <div class="after-sign-up main">
    <NavBar />
    <main>
      <div class="container">
        <section id="text">
          <h1>Welcome to FITvt, Aaron!</h1>
          <button class="btn">Let's get Started</button>
        </section>
        <section id="form-image">
          <img src="@/assets/white-welcome.svg" alt="usain-bolt" width="750" />
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
.container {
  transform: translateX(-130px);
}
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/globals.scss";
@import "@/../public/sass/home.scss";
</style>