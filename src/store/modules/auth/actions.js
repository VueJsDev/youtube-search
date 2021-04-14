import { authFirebase, db, firebase } from "@/firebase/firebase.js";

export default {

	getCurrentUser() {
	    return new Promise((resolve, reject) => {
	      const unsubscribe = authFirebase.onAuthStateChanged(
	        user => {
	          unsubscribe();
	          resolve(user);
	        },
	        () => {
	          reject();
	        }
	      );
	    });
	},

	async doLogin({ commit }, { email, password }) {
    	await authFirebase.signInWithEmailAndPassword(email, password);
    	commit("setUser", authFirebase.currentUser);
	},
	async doRegister({ commit }, { name, email, password }) {
		console.log('name' + ',' + 'email' + email + ',' + 'password' + password)
		await authFirebase.createUserWithEmailAndPassword(email, password);
		const user = authFirebase.currentUser;
		await user.updateProfile({
			displayName: name
		});
	   	commit("setUser", user);
	},
  	async updateProfile({ commit }, { name, email, password }) {
    	const user = authFirebase.currentUser;
	    if (name) {
	      await user.updateProfile({
	        displayName: name
	      });
	    }
	    if (email) {
	      await user.updateEmail(email);
	    }

	    if (password) {
	      await user.updatePassword(password);
	    }
  	},
	async doLoggedIn({ commit }, user) {
		if (user == null) {
			commit('setUser', null);
		} else {
			let userLogin = {
  				email: user.email,
  				uid: user.uid
			} 
			commit('setUser', userLogin);
		}
	},
	async doLogout() {
    	await authFirebase.signOut();
	},
  	async doReset(context, email) {
    	await authFirebase.sendPasswordResetEmail(email);
  	}
}