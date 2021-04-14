import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth/index'
import channel  from './modules/channels/index'
import videos  from './modules/videos/index'

import { authFirebase } from '../firebase/firebase.js'

Vue.use(Vuex)

const store = new Vuex.Store({

	actions: {
		checkAuth({ dispatch, commit }) {
			authFirebase.onAuthStateChanged(async function (user) {
				if (user) {
					commit("auth/setUser", user);
				} else {
					commit("auth/setUser", null);
				}
			})
		}
	},

  	modules: {
	  	auth,
	  	channel,
	  	videos
  	}
});

export default store;

// Initial load
store.dispatch("checkAuth");