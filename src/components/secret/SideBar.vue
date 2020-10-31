<template>
  <section>
    <Spinner v-if="loading" />
    <header>
      <div class="profile-image">
        <input type="file" @change="inputChange" />
        <img
          :src="
            profileImageUrl ||
            'https://img.icons8.com/color/96/000000/circled-user-male-skin-type-1-2.png'
          "
          alt="avatar"
          id="avatar"
        />
      </div>
      <div class="logo">
        <img src="@/assets/logo.svg" alt="logo" />
        <p>FITvt</p>
      </div>
    </header>
    <br />
    <br />
    <div class="name">
      <p>{{ username }}</p>
    </div>
    <br />
    <hr />
    <br />
    <div class="friends">
      <p>Friends</p>
      <router-link to="/secret/all-users" style="color: unset">
        <i class="fas fa-plus"></i>
      </router-link>
    </div>
    <br />
    <div class="friends-list">
      <div
        class="friend"
        v-for="(friend, index) in friends"
        :key="index"
        @click="toUserProfile(friend.uid)"
      >
        <img
          :src="
            friend.url ||
            'https://img.icons8.com/color/96/000000/circled-user-male-skin-type-1-2.png'
          "
          alt="profile-image"
          id="avatar"
        />
        <p>
          <span style="font-size: 1rem">
            <strong>{{ friend.username }}</strong>
          </span>

          <br />New York
        </p>
        <i
          class="fas fa-backspace"
          title="unfriend this user"
          @click="removeFriend(friend.username)"
        ></i>
      </div>
      <br />
    </div>
    <button class="btn" @click="logout">LOGOUT</button>
  </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
import Spinner from "@/components/Spinner";
export default {
  components: { Spinner },
  data() {
    return {
      url: "",
      loading: false,
      profileImageUrl: "",
      friends: [],
    };
  },
  methods: {
    async logout() {
      await firebase.auth().signOut();
      localStorage.removeItem("UID");
      this.$store.commit("removeUID");
      this.$router.push("/login");
    },
    inputChange(e) {
      this.loading = true;
      let file = e.target.files[0];

      let storageRef = firebase.storage().ref(`profileImg/${file.name}`);
      //upload the file to storage ref
      let task = storageRef.put(file);
      task.on(
        "state_changed",
        function progress() {
          //console.log(snapshot);
        },
        function error(err) {
          console.log(err);
        },
        async () => {
          let uid = this.$store.state.UID || localStorage.getItem("UID");
          let url = await task.snapshot.ref.getDownloadURL();
          this.url = url;
          //save this url in profile-image collection
          await window.db.collection("profile-image").doc(uid).set({
            uid: uid,
            url: this.url,
          });
          this.loading = false;
          //after saving the url of profile image redirecting to the same page
          this.$router.go(this.$router.currentRoute.path);
        }
      );
    },
    removeFriend(name) {
      //console.log(name);
      let arrOfFriends = JSON.parse(localStorage.getItem("friends"));
      console.log(arrOfFriends.length);
      //if there is one elment in array we dont need any calc just remove it
      if (arrOfFriends.length == 1) {
        arrOfFriends = [];
      } else {
        arrOfFriends.forEach((friend, index) => {
          //remove the user which is clicked
          if (friend.username == name) {
            arrOfFriends.splice(index, 1);
          }
        });
      }
      //clearin the storage
      localStorage.removeItem("friends");
      //setting newArray to local storage with all the changes
      localStorage.setItem("friends", JSON.stringify(arrOfFriends));
      this.$router.go("/secret/all-users");
    },
    //get to the profile of clicked user
    toUserProfile(uid) {
      this.$router.replace({ path: `/secret/profile/user/${uid}` });
    },
  },
  computed: {
    username() {
      return this.$store.state.username || localStorage.getItem("username");
    },
  },
  async mounted() {
    if (localStorage.getItem("activity")) {
      localStorage.removeItem("activity");
    }
    let uid = this.$store.state.UID || localStorage.getItem("UID");
    let res = await window.db
      .collection("profile-image")
      .where("uid", "==", uid)
      .get();
    this.profileImageUrl = res.docs.length && res.docs[0].data().url;

    //retrieving all of the friends from localstorage
    let array = JSON.parse(localStorage.getItem("friends"));
    this.friends = array;
    //console.log(new Date().toString().indexOf(")"));
  },
};
</script>

<style lang="scss" scoped>
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/_sidebar.scss";
</style>