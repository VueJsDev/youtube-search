<template>
	<section class="content">
		<div class="col-md-6">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title"><i class="fa fa-user"></i> Edit Profile</h3>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-12">
							<form @submit.prevent="updateProfile">
								<div class="box-body">
									<div class="form-group">
									  <label for="">Name</label>
									  <input type="text" class="form-control" v-model="userName" :placeholder="user.displayName">
									</div>
									<div class="form-group">
									  <label for="">Email address</label>
									  <input type="email" class="form-control" v-model="email" :placeholder="user.email">
									</div>
									<div class="form-group">
									  <label for="">Password</label>
									  <input type="password" class="form-control" v-model="password" placeholder="Password">
									</div>
								</div>
								<div class="box-footer text-center">
								  <button v-if="isLoading" :disabled="!hasDataChanged" class="btn btn-warning">
								  	<i class="fa fa-refresh"></i> Update
								  </button>
								  <button v-else class="btn btn-warning">
								  	<i class="fa fa-spinner fa-spin"></i> Update
								  </button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>

	import { mapState } from "vuex";

	export default {
		name: 'UserProfileView',
		data() {
			return {
				isLoading: true,
				userName: '',
				email: '',
				password: ''
			}
		},
		methods: {
		    async updateProfile() {
		      this.isLoading = false;
		      try {
		        await this.$store.dispatch("auth/updateProfile", {
		          name: this.userName,
		          email: this.email,
		          password: this.password
		        });
		        this.$toast.warning("Account data updated");
		        this.userName = this.email = this.password = "";
		      } catch (error) {
		        this.$toast.error(error.message);
		        console.error(error.message);
		      } finally {
		        this.isLoading = true;
		      }
		    }
	  	},
		computed: {
			...mapState("auth", ["user"]),
			hasDataChanged() {
		      return (
		        // Name exists and is different
		        (this.userName && this.userName !== this.user.displayName) ||
		        // Email exists and is different
		        (this.email && this.email !== this.user.email) ||
		        // Password exists
		        this.password.length
		      );
		    }
		},
	};
</script>