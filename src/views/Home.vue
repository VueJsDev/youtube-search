<template>
	<div class="wrapper">
		<Header />
	  	
	  	<Navigation/>

	  	<div class="content-wrapper">
		    <!-- Aca podemos agregar un breadcrum con algún título siempre dentro de un
		    	tag <section></section> -->
		    	<!-- <section class="content-header">
			      <div></div>
			      <ol class="breadcrumb">
			        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
			        <li class="active">Dashboard</li>
			      </ol>
			    </section> --><br>
		    <section class="content">
		      <div class="row">
		        <!-- acá tiene que ir el <router-view> -->
		        <router-view></router-view>
		      </div>
		    </section>
	  	</div>

	  	<Footer />
	</div>
</template>

<script>

import Header from '../components/layouts/Header.vue'
import Navigation from '../components/layouts/Navigation.vue'
import Footer from '../components/layouts/Footer.vue'

export default {
  name: 'Home',
  components: {
  	Header,
  	Navigation,
    Footer
  }
};

</script>
