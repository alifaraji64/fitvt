<template>
  <div class="chat main">
    <aside class="left"><SideBar /></aside>
    <main>
      <sNavBar />
      <section id="chat">
        <div
          class="single-user"
          v-for="(user, index) in users"
          :key="index"
          @click="goToUser(user.uid, user.username)"
        >
          <img
            :src="
              user.url ||
              'https://img.icons8.com/color/96/000000/circled-user-male-skin-type-1-2.png'
            "
            alt="avatar"
            id="avatar"
          />
          <div class="text">
            <h3>{{ user.username }}</h3>
            <p v-if="!isLast_msg(user.uid)">click to start your conversation</p>
            <p v-if="isLast_msg(user.uid)">{{ last_msg }}</p>
          </div>
        </div>
      </section>
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
export default {
  components: {
    SideBar,
    CalendarChart,
    sNavBar,
  },
  data() {
    return {
      users: [],
      last_msg: "",
    };
  },

  methods: {
    goToUser(uid, username) {
      this.$router.push("/secret/chat/user/" + uid);
      //also add the image url and username to store
      this.$store.commit("setChatUsername", username);
    },
    isLast_msg(uid) {
      let friends_arr = JSON.parse(localStorage.getItem("friends"));
      let friend = friends_arr.find((item) => item.uid == uid);
      if (friend.last_msg) {
        this.last_msg = friend.last_msg;
        return true;
      } else {
        return false;
      }
    },
  },
  async mounted() {
    let friends = JSON.parse(localStorage.getItem("friends"));
    this.users = friends;
    console.log(this.users);
  },
};
</script>

<style lang="scss" scoped>
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/_globals.scss";
@import "@/../public/sass/_secret.scss";
@import "@/../public/sass/chat.scss";
</style>