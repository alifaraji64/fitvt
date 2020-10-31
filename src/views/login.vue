<template>
  <div class="login main">
    <NavBar />
    <main>
      <div class="container">
        <section id="text">
          <h1>Welcome back, we’ve missed you!</h1>
        </section>
        <section id="form-image">
          <img src="@/assets/red-login.svg" alt="usain-bolt" width="750" />
          <div class="form">
            <form>
              <input
                type="email"
                id="email"
                placeholder="aaronfit@gmail.com"
                v-model="email"
              />
              <input
                type="password"
                id="password"
                placeholder="*******"
                v-model="password"
              />
            </form>
            <button class="btn" @click="login">Login</button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let res = await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password);
      let uid = res.user.uid;
      this.$store.commit("setUID", uid);
      localStorage.setItem("UID", uid);
      this.$router.push("/secret/profile");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/_globals.scss";
@import "@/../public/sass/home.scss";
</style>