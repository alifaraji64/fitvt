import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import Trend from "vuetrend"
import firebase from 'firebase/app'
import 'firebase/firestore';
//for chart
Vue.use(Trend)
// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});
Vue.config.productionTip = false;


 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
router.beforeEach((to, from, next) => {
	//page is restricted
	if (to.meta.requiresAuth) {
		//user is logged in
		if (firebase.auth().currentUser) {
			next();
		}
		//user is not logged in
		else {
			next('/login');
		}
	} else {
		next();
	}
});
let db = firebase.firestore();
window.db = db;
let app;

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
      store,
			render: (h) => h(App),
		}).$mount('#app');
	}
});