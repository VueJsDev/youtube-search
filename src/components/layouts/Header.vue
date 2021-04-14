<template>
	<header class="main-header">
	    <!-- Logo -->
	    <a href="index2.html" class="logo">
	      <!-- mini logo for sidebar mini 50x50 pixels -->
	      <span class="logo-mini"><b>A</b>LT</span>
	      <!-- logo for regular state and mobile devices -->
	      <span class="logo-lg"><b>Admin</b>LTE</span>
	    </a>
	    <nav class="navbar navbar-static-top">
	      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
	        <span class="sr-only">Toggle navigation</span>
	      </a>

	      <div class="navbar-custom-menu">
	        <ul class="nav navbar-nav">
	          <li class="dropdown messages-menu">
	          </li>
	          <li class="dropdown user user-menu">
	            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
	              <img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
	              <!-- <span class="hidden-xs">{{ GET_USER_LOGIN.email }}</span> -->
	            </a>
	            <ul class="dropdown-menu">
	              <!-- User image -->
	              <li class="user-header">
	                <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
	                <p>
	                  {{ user.displayName }}
	                  <small>Member since Nov. 2012</small>
	                </p>
	              </li>
	              <li class="user-footer">
	                <div class="pull-left">
	                	<router-link class="btn btn-default btn-flat" :to="{ name: 'Profile' }">
	                		<i class="fa fa-user"></i> <strong>Profile</strong>
	                	</router-link>
	                </div>
	                <div class="pull-right">
	                  <a href="#" @click="doLogout" class="btn btn-default btn-flat">
	                  	<strong>Sign out</strong> <i class="fa fa-sign-out"></i>
	                  </a>
	                </div>
	              </li>
	            </ul>
	          </li>
	        </ul>
	      </div>
	    </nav>
  	</header>
</template>

<script>
	
	import { mapState } from 'vuex';

	export default {
		data() {
			return {

			}
		},

		methods: {
			async doLogout() {
		      try {
		        await this.$store.dispatch("auth/doLogout");
		        this.$router.push({ name: "Home" });
		        this.$toast.success("Logged out");
		      } catch (error) {
		        this.$toast.error(error.message);
		        console.error(error.message);
		      }
		    }
		},

		computed: {
			...mapState("auth", ["user"])
		}
	};


</script>