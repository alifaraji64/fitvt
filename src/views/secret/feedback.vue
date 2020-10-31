<template>
  <div class="feedback main">
    <aside class="left"><SideBar /></aside>
    <main>
      <sNavBar />
      <section id="feedback">
        <h2>Help us grow by sharing any feedback with us!</h2>
        <br /><br /><br />
        <label>kind of feedback:</label>
        <br />
        <select v-model="feedbackKind">
          <option value="bugs">bugs</option>
          <option value="general">general feedback</option>
        </select>
        <br />
        <br />
        <br />
        <br />
        <label>datails:</label><br />
        <textarea
          id=""
          cols="70"
          rows="10"
          v-model="feedbackDescription"
          placeholder="details of your feedback"
        >
details of feedback</textarea
        >
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <button class="btn" @click="submit" v-show="showSubmitBtn">
          Submit
        </button>
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
import swal from "sweetalert";
export default {
  components: {
    SideBar,
    CalendarChart,
    sNavBar,
  },
  data() {
    return {
      feedbackKind: "",
      feedbackDescription: "",
      showSubmitBtn: true,
    };
  },
  methods: {
    async submit() {
      //removing the submit button after it is clicked to prevent multiple requests at once
      this.showSubmitBtn = false;
      await window.db.collection("feedback").add({
        "feedback-title": this.feedbackKind,
        "feedback-detail": this.feedbackDescription,
      });
      swal(
        "thanks for your feedback",
        "we will definitaly take it to consideration",
        "success"
      );
      //showing the submit button after ok button has been pressed in alert
      let alert_btn = document.querySelector(".swal-button-container");
      alert_btn.addEventListener("click", () => {
        this.showSubmitBtn = true;
        //also clear the inputs
        this.feedbackKind = "";
        this.feedbackDescription = "";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/_globals.scss";
@import "@/../public/sass/_secret.scss";
@import "@/../public/sass/feedback.scss";
</style>