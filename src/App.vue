<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/../public/sass/_variables";
* {
  font-family: "Roboto", sans-serif;
}
.main {
  min-height: 100vh;
}
.loading-page {
  position: fixed;
  min-width: 100%;
  min-height: 100%;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $nav-color;
}
.error {
  color: red;
}
.single-post {
  background-color: lighten($primary, 12%);
  margin-bottom: 100px;
  border-radius: 20px;
  #delete-btn {
    color: $lightgray;
    border: none;
    background-color: darkred;
    padding: 2px;
    cursor: pointer;
  }
  .profile {
    display: flex;
    align-items: center;

    #avatar {
      vertical-align: middle;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      margin: 10px 5px 0 10px;
    }
  }
  .title_image {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      margin: 0 10px;
      font-size: 3rem;
    }
    .desc {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      * {
        margin: 1rem 0;
      }
      p {
        padding: 10px;
      }
      img {
        max-width: 250px;
        float: right;
        position: relative;
        right: 0;
        display: block;
        margin: auto;
        height: 250px;
      }
    }
  }
}
.icons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: $lightgray;
  i {
    margin-left: 10px;
    cursor: pointer;
  }
}
form {
  margin: 10px;
  input {
    width: 70%;
    margin: 10px auto;
    background-color: lighten($primary, 30%);
    color: $lightgray;
    border: none;
    padding: 5px;
    &::placeholder {
      color: $lightgray;
      padding: 5px;
    }
  }
  button {
    background-color: lighten($primary, 30%);
    border: none;
    outline: none;
    padding: 5px 10px;
    cursor: pointer;
    color: $lightgray;
  }
}
</style>
