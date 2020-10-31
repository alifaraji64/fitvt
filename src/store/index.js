import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UID:null,
    username:null,
    chattingUsername:null,
    activity:[]
  },
  mutations: {
    setUID(state,token){
      state.UID = token;
    },
    removeUID(state){
      state.UID=null;
    },
    setuname(state,token){
      state.username = token;
    },
    setChatUsername(state,token){
      state.chattingUsername = token
    },
    setActivity(state){
            let today = new Date().getFullYear() + "/" + new Date().getMonth() +"/" + new Date().getDate()+3;
            let array = [];
        if(localStorage.getItem('chart')){
            array = JSON.parse(localStorage.getItem('chart'));
          if(array[array.length-1].date == today){
            array[array.length - 1].number += 1;
            localStorage.removeItem("chart");
            localStorage.setItem("chart", JSON.stringify(array));
          }else{
              array = JSON.parse(localStorage.getItem("chart"));
              array.push({ date: today, number: 1 });
              localStorage.removeItem("chart");
              localStorage.setItem("chart", JSON.stringify(array));
          }
        }
        //if chart is not in localstorage and it is the first time
        else{
          console.log('in 1');
          localStorage.setItem('chart',JSON.stringify([{date:today,number:1}]))
        }
        let arr = JSON.parse(localStorage.getItem("chart"));
      if (arr.length == 1) {
        arr.unshift({ date: "dddd", number: 1 });
      }
      state.activity = [];
      arr.forEach((i) => {
        state.activity.push(i.number);
      });
      let arr2 = JSON.parse(localStorage.getItem("chart"));
      if (arr2.length == 7) {
        arr2.shift();
      }
      localStorage.removeItem("chart");
      localStorage.setItem("chart",JSON.stringify(arr2));
    }
  },
  actions: {
  },

})
