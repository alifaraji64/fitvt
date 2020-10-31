<template>
  <div class="home main">
    <NavBar />
    <main>
      <div class="container">
        <section id="text">
          <h1>The #1 app for Fitness Enthusiasts!</h1>
        </section>
        <section id="form-image">
          <img src="@/assets/bolt.svg" alt="usain-bolt" width="700" />
          <div class="form">
            <h1>join FITvt! <br />it's free.</h1>
            <form>
              <p>{{ error }}</p>
              <input
                type="email"
                id="email"
                placeholder="aaronfit@gmail.com"
                v-model="email"
              />
              <input
                type="text"
                id="username"
                placeholder="aaron"
                v-model="username"
              />
              <input
                type="password"
                id="password"
                placeholder="*******"
                v-model="password"
              />
            </form>
            <button class="btn" @click="signup">Sign Up</button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Home",
  components: {
    NavBar,
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async signup() {
      //check for unique username
      let res = await window.db
        .collection("username")
        .where("username", "==", this.username)
        .get();
      //username is taken
      if (res.docs[0] && res.docs[0].data().username) {
        this.error = "please select another username. this one is in use ";
      }
      //username is valid
      else {
        try {
          let res2 = await firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password);
          let uid = res2.user.uid;
          //set UID to state
          this.$store.commit("setUID", uid);
          //set UID to localstorage in case if user refreshes the page
          localStorage.setItem("UID", uid);
          //save username in firestore,username collection
          window.db.collection("username").doc(uid).set({
            uid,
            username: this.username,
          });
          //redirect the user to profile page
          this.$router.push("/secret/profile");
        } catch (err) {
          this.error = err.message;
        }
      }
    },
  },
};
</script>
<style lang="sass" scoped>
@import '@/../public/sass/_variables.scss'
@import '@/../public/sass/_globals.scss'
@import '@/../public/sass/home.scss'
</style>
