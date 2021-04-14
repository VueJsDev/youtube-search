<template>
	<div class="divlogin fadeIn">
		<div class="container">
			<div class="divcont">
				<!-- Login Form -->
				<template v-if="action === 'login'">
					<h2 class="login-box-msg" style="color: #fff;">Login to your account</h2>
				  	<form action="#" @submit.prevent="doLogin">
				  		<div class="form-group has-feedback">
					        <input type="email" class="form-control" placeholder="Email Adress" v-model="email">
					        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
				      	</div>
		      	      	<div class="form-group has-feedback">
		      		        <input type="password" class="form-control" placeholder="Password" v-model="password">
		      		        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
		      	      	</div>
		      	      	<div class="pull-right">
		      	      		<button v-if="isLoading" type="submit" class="btn btn-primary btn-block btn-flat">
		      	      			Login <i class="fa fa-sign-out"></i> 
		      	      		</button>
		      	      		<button v-else type="submit" class="btn btn-primary btn-block btn-flat">
		      	      			Login <i class="fa fa-spinner fa-spin"></i> 
		      	      		</button>
		      	      	</div> <br><br>
		      	      	<hr>
		      	      	<a href="javascript:void(0)" @click="action = 'register'" style="color: #3A9C95;">
		      	      		<strong>Don't have an account?</strong>
		      	      	</a> 
		      	      	<strong style="color: #fff;"> | </strong>
		      	      	<a href="javascript:void(0)" @click="action = 'reset'"><strong>Forgot your password?</strong></a>
				  	</form>
				</template>
				<!-- End of login form -->
				<!-- Register from -->
				<template v-if="action === 'register'">
					<h2 class="login-box-msg" style="color: #fff;">Register</h2>
					<form action="#" @submit.prevent="doRegister">
					  	<div class="form-group has-feedback">
					        <input type="text" class="form-control" placeholder="Enter Name" v-model="userName">
					        <span class="glyphicon glyphicon-user form-control-feedback"></span>
				      	</div>
		      	      	<div class="form-group has-feedback">
		      		        <input type="email" class="form-control" placeholder="Enter Email" v-model="email" required>
		      		        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
		      	      	</div>
      	      	      	<div class="form-group has-feedback">
      	      		        <input type="password" class="form-control" placeholder="Enter Password" v-model="password" required>
      	      		        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      	      	      	</div>
      	      	      	<div class="form-group has-feedback">
      	      		        <input type="password" class="form-control" placeholder="Repeat Password" v-model="repeatPassword" :rules="[comparePasword]">
      	      		        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      	      	      	</div><br>
      	      	      	<center>
      	      	      		<button v-if="isLoading" :disabled="!disableButtonRegister" type="submit" class="btn btn-success btn-block btn-flat">
      	      	      			Register <i class="fa fa-angle-double-right"></i> 
      	      	      		</button>
      	      	      		<button v-else type="submit" class="btn btn-success btn-block btn-flat">
      	      	      			Register <i class="fa fa-spinner fa-spin"></i> 
      	      	      		</button>
      	      	      	</center> <br>
      	      	      	<a href="javascript:void(0)" @click="action = 'login'" style="color: #3A9C95;">
      	      	      		<strong>Want to login?</strong>
      	      	      	</a>
					</form>
		            <div class="alert alert-danger alert-dismissible" v-if="errorValidation">
		                <center>{{ errorValidation }}</center>
	              	</div>
				</template>
				<!-- End of register -->
				<!-- Reset form -->
				<!-- End reset form -->
				<template v-if="action === 'reset'">
					<h2 class="login-box-msg" style="color: #fff;">Reset</h2>
					<form @submit.prevent="doReset">
				  		<div class="form-group has-feedback">
					        <input type="email" class="form-control" placeholder="Email Adress" v-model="email">
					        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
				      	</div>
				      	<div class="pull-left">
				      		<button class="btn btn-default" @click="action = 'login'"><i class="fa fa-arrow-circle-left"></i> Back</button>
				      	</div> <br><br>
				      	<div class="pull-right">
				      		<button v-if="isLoading" class="btn btn-success">Reset <i class="fa fa-arrow-circle-right"></i></button>
				      		<button v-else class="btn btn-success">Reset <i class="fa fa-spinner fa-spin"></i></button>
				      	</div>
					</form>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AuthView',
		data() {
			return {
				action: "login",
				isLoading: true,
				errorValidation: false,
				email: '',
				password: '',
				userName: '',
				repeatPassword: ''
			}
		},
		methods: {
			redirect() {
				this.$router.push({ name: "KeywordSearch" });
		    },
		    resetData() {
		    	this.userName = this.email = this.password = "";
	        },
			async doLogin() {
				this.isLoading = false;
		      	try {
			        await this.$store.dispatch("auth/doLogin", {
			          email: this.email,
			          password: this.password
			        });
			        this.$toast.success("Logged in");
			        this.resetData();
			        this.redirect();
		      	} catch (error) {
		      		console.error(error)
			        if (error.code === "auth/wrong-password") {
			        	this.$toast.error(error.message);
			        	this.resetData();
			        }
			        if (error.code === "auth/user-not-found") {
			        	this.$toast.error(error.message);
			        	this.resetData();
			        }
		      	} finally {
			        this.isLoading = true;
		      	}
			},
			async doRegister() {
				this.isLoading = false;
		      	try {
			        await this.$store.dispatch("auth/doRegister", {
			        	name: this.userName,
			        	email: this.email,
			        	password: this.password
			        });
			        this.$toast.success("Account created");
			        this.resetData();
			        this.redirect();
		      	} catch (error) {
			        this.$toast.error(error.message);
			        this.resetData();
			        console.error(error.message);
		      	} finally {
			        this.isLoading = true;
		      	}
			},
			async doReset() {
				this.isLoading = false;
		      	try {
			        await this.$store.dispatch("auth/doReset", this.email);
			        this.$toast.success(
			          `Please check ${this.email} for further instructions`
			        );
			        this.resetData();
		      	} catch (error) {
			        this.$toast.error(error.message);
			        this.resetData();
			        console.error(error.message);
		      	} finally {
			        this.isLoading = true;
		      	}
		    }
		},
		computed: {
			comparePasword() {
				return this.password !== this.repeatPassword ? this.errorValidation = 'Passwords do not match.' : this.errorValidation = ''
			},
			disableButtonRegister() {
				return ( this.password === this.repeatPassword ) && (this.password !== '')
			}
		}
	};
</script>

<style scoped>
	.divlogin{ 
	    background: url(../../static/fondo_7.jpg) no-repeat; 
	    background-size: cover; 
	    background-position: center center; 
	    width: 100%; 
	    height: 100vh; 
	    display: flex;
	    align-content: center;
	    align-items: center; 
	    -webkit-animation-duration: 3s;
        animation-duration: 3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;   
	}
	@-webkit-keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
 	}
     
 	@keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
 	}
     
 	.fadeIn {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
 	}
	.divlogin .container{ 
	    width: 100%;
	    text-align: center;
	}
	.divlogin .container .divcont{
	    width: 100%;
	    max-width: 360px;
	    background: rgb(6, 2, 1, 0.47);
	    padding: 20px;
	    border-radius: 15px;
	    display: inline-block;
	}
	.divlogin .container .divcont h3{
	    margin-top: 0px;
	}
</style>