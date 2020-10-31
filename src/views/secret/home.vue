<template>
  <div class="home main">
    <aside class="left"><SideBar /></aside>
    <main>
      <sNavBar />
      <friend-posts />
    </main>
    <aside class="right">
      <CalendarChart />
    </aside>
  </div>
</template>

<script>
import SideBar from "@/components/secret/SideBar";
import CalendarChart from "@/components/secret/Calendar-Chart";
import sNavBar from "@/components/secret/NavBar";
import Friend_posts from "@/components/secret/Friend-posts";
export default {
  components: {
    SideBar,
    CalendarChart,
    sNavBar,
    "friend-posts": Friend_posts,
  },
};
</script>

<style lang="scss" scoped>
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/_globals.scss";
@import "@/../public/sass/_secret.scss";
@import "@/../public/sass/secret-home.scss";
</style>