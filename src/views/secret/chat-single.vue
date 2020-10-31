<template>
  <div class="chat-single main">
    <aside class="left"><SideBar /></aside>
    <main>
      <sNavBar />
      <section id="chat-single">
        <h2>{{ unameOfChattingPerson }}</h2>
        <div
          class="container"
          v-for="(message, index) in messages"
          :key="index"
        >
          <div :class="message.to == myUID ? 'other' : 'me'">
            <div v-if="message.to == myUID">
              <img
                :src="
                  other_profile_img ||
                  'https://img.icons8.com/color/96/000000/circled-user-male-skin-type-1-2.png'
                "
                id="avatar"
              />
              <p>{{ message.text }}</p>
            </div>
            <div v-if="message.to !== myUID">
              <p>{{ message.text }}</p>
              <img
                :src="
                  self_profile_img ||
                  'https://img.icons8.com/color/96/000000/circled-user-male-skin-type-1-2.png'
                "
                id="avatar"
              />
            </div>
          </div>
        </div>
        <div id="re">
          <input
            type="text"
            v-model="message"
            placeholder="write your message and click enter"
            @keypress.enter="sendMessage"
          />
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
      message: "",
      unameOfChattingPerson: "",
      messages: [],
      myUID: localStorage.getItem("UID"),
      self_profile_img: "",
      other_profile_img: "",
    };
  },
  methods: {
    async sendMessage() {
      await window.db.collection("chat").add({
        from: localStorage.getItem("UID"),
        to: this.$route.params.id,
        text: this.message,
        date: new Date(),
      });
      this.message = "";
      console.log("sent");
      let chatBox = document.querySelector("#chat-single");
      setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 300);
    },
  },
  async mounted() {
    this.unameOfChattingPerson = this.$store.state.chattingUsername;
    await window.db
      .collection("chat")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (
            change.type == "added" &&
            (change.doc.data().to == this.$route.params.id ||
              change.doc.data().to == localStorage.getItem("UID")) &&
            (change.doc.data().from == localStorage.getItem("UID") ||
              change.doc.data().from == this.$route.params.id)
          ) {
            this.messages.push(change.doc.data());
          }
        });
        //saving the last message of each chat in local storage for display in chat page
        let last_msg =
          this.messages.length && this.messages[this.messages.length - 1];
        let friends_arr = JSON.parse(localStorage.getItem("friends"));
        friends_arr.forEach((friend, index) => {
          if (friend.username == this.$store.state.chattingUsername) {
            friends_arr[index].last_msg = last_msg.text;
          }
        });
        console.log(friends_arr);
        localStorage.removeItem("friends");
        localStorage.setItem("friends", JSON.stringify(friends_arr));
      });
    let chatBox = document.querySelector("#chat-single");
    setTimeout(() => {
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 700);
    //getting profile images for display beside the chat(text)
    let res = await window.db
      .collection("profile-image")
      .where("uid", "==", this.myUID)
      .get();
    this.self_profile_img = res.docs.length && res.docs[0].data().url;
    let res2 = await window.db
      .collection("profile-image")
      .where("uid", "==", this.$route.params.id)
      .get();
    this.other_profile_img = res2.docs.length && res2.docs[0].data().url;
  },
};
</script>

<style lang="scss" scoped>
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/_globals.scss";
@import "@/../public/sass/_secret.scss";
@import "@/../public/sass/chat-single.scss";
</style>