<template>
  <div class="other-profile main">
    <aside class="left"><SideBar /></aside>
    <main>
      <sNavBar />
      <section id="saved-posts">
        <h1 style="margin: 2rem auto; color: white">
          <span>workouts of {{ username }}</span>
        </h1>
        <div>
          <ul>
            <ul>
              <li v-for="(workout, index) in workouts" :key="index">
                <p @click="openSavedW(workout)">
                  {{ workout.title }}
                </p>
              </li>
            </ul>
          </ul>
        </div>
      </section>
      <section id="my-posts" style="color: #fff">
        <h1 style="margin: 2rem auto; color: white">
          <span>Posts of {{ username }}</span>
        </h1>
        <br />
        <div class="single-post" v-for="(post, index) in posts" :key="index">
          <div class="profile">
            <img :src="profileURL" alt="avatar" id="avatar" />
            <p>{{ post.username }}</p>
          </div>

          <div class="title_image">
            <h1>{{ post.title }}</h1>
            <div class="desc">
              <h4>Exercise</h4>
              <p>{{ post.wdescription }}</p>
              <img :src="post.url" alt="exercise_image" />
            </div>
          </div>
          <div class="icons">
            <i
              class="fas fa-save fa-2x"
              title="save this post"
              @click="savePost(post)"
              :id="
                post.title.split(' ')[0] +
                '_' +
                (post.title.split(' ')[1] && post.title.split(' ')[1][0])
              "
            >
            </i>
            <i
              class="fas fa-comment fa-2x"
              title="see the comments"
              @click="showComments(post.docId)"
            ></i>
            <i class="fas fa-heart fa-2x" @click="like(post.docId)" :id="post.docId"></i>
        <span style="font-size:1.4rem;margin-left:5px;" id="like_amount">{{likes[post.docId]}}</span>
          </div>
          <form>
            <input
              type="text"
              placeholder="your comment..."
              v-model="comment"
            />
            <button @click.prevent="submitComment(post.docId)">
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
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
import swal from "sweetalert";
import firebase from "firebase/app";
export default {
  components: {
    SideBar,
    CalendarChart,
    sNavBar,
  },
  data() {
    return {
      username: "",
      posts: [],
      profileURL: "",
      comment: "",
      //we are getting the comments dynamicly from db
      comments: [],
      workouts: [],
      likes:{}
    };
  },

  methods: {
    async fetchData(id) {
      console.log(id);
      //getting the username
      let res = await window.db
        .collection("username")
        .where("uid", "==", id)
        .get();
      let name = res.docs.length && res.docs[0].data().username;
      this.username = name;
      //getting posts of respective user
      let res2 = await window.db
        .collection("post")
        .where("uid", "==", id)
        .get();
      res2.docs.length &&
        res2.docs.forEach((post) => {
          this.posts.push(
            Object.assign(post.data(), {
              docId: post.id,
            })
          );
        });

      //getting the url of profile image
      let friends = JSON.parse(localStorage.getItem("friends"));
      let specFriend = friends.filter((friend) => {
        return friend.username == this.username;
      });
      this.profileURL = specFriend[0].url;
      console.log(this.posts);
    },
    async submitComment(docId) {
      //adding the comment inside comment collection the same documentId as the post itself
      //and adding the comments inside an array. the format is array
      try {
        //check if there is a document (not the first time that we want to add smth)
        await window.db
          .collection("comment")
          .doc(docId)
          .update({
            text: firebase.firestore.FieldValue.arrayUnion({
              comment: this.comment,
              name: localStorage.getItem("username"),
            }),
          });
      } catch (err) {
        //if it is the first time that we want to add smth to the collection
        if (err.message.slice(0, 21) == "No document to update") {
          await window.db
            .collection("comment")
            .doc(docId)
            .set({
              text: [
                {
                  comment: this.comment,
                  name: localStorage.getItem("username"),
                },
              ],
            });
        }
      }
      //clearing the input
      this.comment = "";
    },
    async showComments(docId) {
      //clearing the array for not adding the new data to current
      this.comments = [];
      //getting all of the objects which is stored in array
      let res = await window.db
        .collection("comment")
        .where(firebase.firestore.FieldPath.documentId(), "==", docId)
        .get();
      res.docs.length &&
        res.docs[0].data().text.forEach((comment) => {
          this.comments.push(comment);
        });
      //creating a <section><section/> for displaying the comments
      let swalContent = document.createElement("section");
      swalContent.innerHTML = "";
      //looping thorugh the comments array[name,comment] and outputing a div for each item
      this.comments.forEach((comment) => {
        let div = document.createElement("div");
        div.style =
          "display:flex;justify-content:space-between;margin-bottom:5px;border:1px solid gray;padding:10px";
        div.innerHTML = `
          <h4>${comment.name}</h4>
          <h5>${comment.comment}</h5>
          `;
        swalContent.append(div);
      });
      swal({
        title: "comments for this post",
        content: swalContent,
        allowOutsideClick: "true",
      });
    },
    //saving posts
    async savePost(post) {
      console.log(post);
      console.log("wqohooooo");
      //post=>{docId,profileImage(owner),uid(owner),url,description,title}
      await window.db.collection("saved-post").add({
        uid: localStorage.getItem("UID"),
        title: post.title,
        description: post.wdescription,
        url: post.url,
        profile_img: post.profile_img,
      });
      //because space in id is not acceptable we have to replace the space with _
      let id =
        post.title.split(" ")[0] +
        "_" +
        (post.title.split(" ")[1] && post.title.split(" ")[1]) +
        post.docId[3] +
        post.docId[4];
      document.querySelector(`#${id}`).style.color = "#008cff";
      swal("post saved successfully", "", "success");
    },

    openSavedW(workout) {
      console.log(workout);
      var div = document.createElement("div");
      div.innerHTML = `
      <h2>${workout.title}</h2>
      <p>${workout.description}</p>
      `;
      swal({
        content: div,
        button: "ok",
      });
    },

    async fetchWorkout() {
      //fetch the workouts of respective person
      let res2 = await window.db
        .collection("workout")
        .where("uid", "==", this.$route.params.id)
        .get();
      let array = [];
      res2.docs.forEach((post) => {
        array.push(Object.assign(post.data(), { documentId: post.id }));
      });
      //remove duplicates
      this.workouts = array.filter(
        (v, i, a) => a.findIndex((t) => t.title === v.title) === i
      );
    },

    async like(docId){
      try {
        //check if there is a document (not the first time that we want to add smth)
        await window.db
          .collection("like")
          .doc(docId)
          .update({
            text: firebase.firestore.FieldValue.arrayUnion({
              uid:localStorage.getItem('UID')
            }),
          });
      } catch (err) {
        //if it is the first time that we want to add smth to the collection
        if (err.message.slice(0, 21) == "No document to update") {
          await window.db
            .collection("like")
            .doc(docId)
            .set({
              text: [
                {
                  uid:localStorage.getItem('UID')
                },
              ],
            });
        }
      }
      this.$forceUpdate();
    }

  },

  watch: {
    "$route.params": {
      handler(newValue) {
        const { id } = newValue;
        this.posts = [];
        this.workouts = [];
        this.fetchData(id);
        this.fetchWorkout();
      },
      immediate: true,
    },
  },
  async mounted() {
    this.fetchWorkout();
  //  res2.docs.forEach(like=>{
  //    this.likes[like.id] = like.data().text.length;
  //  })
            await window.db.collection('like').onSnapshot((snapshot)=>{
        snapshot.docs.forEach(item=>{
          this.likes[item.id] = item.data().text.length
        })
      });
   this.$forceUpdate()
  },
};
</script>

<style lang="scss" scoped>
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/_globals.scss";
@import "@/../public/sass/_secret.scss";
@import "@/../public/sass/secret-home.scss";
@import "@/../public/sass/secret-profile.scss";
</style>