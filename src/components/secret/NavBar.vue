<template>
  <nav>
    <router-link v-for="(link, index) in links" :key="index" :to="link.path">
      <i :class="link.class"></i>
      <p>{{ link.text }}</p>
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { text: "Home", class: "fas fa-home fa-3x", path: "/secret/home" },
        {
          text: "Profile",
          class: "far fa-user-circle fa-3x",
          path: "/secret/profile",
        },
        {
          text: "Feedback",
          class: "far fa-newspaper fa-3x",
          path: "/secret/feedback",
        },
        { text: "Chat", class: "fas fa-comments fa-3x", path: "/secret/chat" },
      ],
    };
  },
};
</script>

<style lang='scss' scoped>
@import "@/../public/sass/_variables.scss";
nav {
  display: flex;
  justify-content: space-around;
  a {
    text-decoration: none;
    background-color: $nav-color;
    padding: 10px 20px;
    text-align: center;
    color: lighten($primary, 50%);
    border-radius: 10px;
  }
  .router-link-active {
    background-color: darken($btn-blue, 15%);
    i,
    p {
      color: white;
    }
  }
}
</style>