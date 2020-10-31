<template>
  <div class="all-users main">
    <Spinner v-if="loading" />
    <aside class="left"><SideBar /></aside>
    <main>
      <sNavBar />
      <section id="all-users">
        <h3>all users</h3>
        <br /><br /><br />
        <input type="text" placeholder="search..." v-model="search" />
        <div
          class="single-user"
          v-for="(user, index) in filteredUsers"
          :key="index"
        >
          <div class="img-name">
            <img
              :src="
                user.url ||
                'https://img.icons8.com/color/96/000000/circled-user-male-skin-type-1-2.png'
              "
              alt="profile-image"
              id="avatar"
            />
            <p>{{ user.username }}</p>
          </div>
          <div class="add-btn">
            <button
              class="btn"
              @click="addToFriends(user.uid, user.username, user.url)"
            >
              <i class="fas fa-plus"></i>
            </button>
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
import Spinner from "@/components/Spinner";
import swal from "sweetalert";
export default {
  components: {
    SideBar,
    CalendarChart,
    sNavBar,
    Spinner,
  },
  data() {
    return {
      users: [],
      loading: true,
      search: "",
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        return user.username.match(this.search);
      });
    },
  },

  methods: {
    addToFriends(uid, username, url) {
      //there is an array in localstorage so we can just push the new friend to it
      if (localStorage.getItem("friends")) {
        let array = JSON.parse(localStorage.getItem("friends"));
        if (array.some((user) => user.uid === uid)) {
          //user is duplicated so we cant add to storage
          console.log("user is already in storage");
        } else {
          //this user is new so we can add it
          array.push({ uid, username, url });
          localStorage.removeItem("friends");
          localStorage.setItem("friends", JSON.stringify(array));
          swal(
            `from now on ${username} is your new friend (:`,
            "",
            "success"
          ).then(() => {
            this.$router.go("/secret/all-users");
          });
        }
      }
      //if it is the first time that we are saving to friends to localstorage
      else {
        console.log(uid, username, url);
        localStorage.setItem(
          "friends",
          JSON.stringify([{ uid, username, url }])
        );
        swal(
          `from now on ${username} is your new friend (:`,
          "",
          "success"
        ).then(() => {
          this.$router.go("/secret/all-users");
        });
      }
    },
  },
  async mounted() {
    this.users = [];
    this.loading = true;
    let uid = this.$store.state.UID || localStorage.getItem("UID");
    //getting all of the usernames except the username of the current user
    let res = await window.db
      .collection("username")
      .where("uid", "!=", uid)
      .get();
    res.docs.forEach((item) => {
      this.users.push(item.data());
      //console.log(item.data());
    });
    //because this.users is not available inside the function Im creating a new variable
    let usersWithProfileImg = [];
    async function addImageToUserArr(users) {
      //looping through the this.users (user) array and fetching the url of the respective uid
      for (let user of users) {
        let res2 = await window.db
          .collection("profile-image")
          .where("uid", "==", user.uid)
          .get();
        //creating a new key in users array
        user.url = res2.docs.length && res2.docs[0].data().url;
        usersWithProfileImg.push(user);
      }
    }
    addImageToUserArr(this.users).then(() => {
      //setting the users array to a new array that is containing the url of the image
      this.users = [...usersWithProfileImg];
      this.loading = false;
    });
    console.log(this.users);
  },
};
</script>

<style lang="scss" scoped>
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/_globals.scss";
@import "@/../public/sass/_secret.scss";
@import "@/../public/sass/all-users.scss";
</style>