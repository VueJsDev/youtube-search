<template>
	<aside class="main-sidebar">
	    <section class="sidebar">
	      	<div class="user-panel">
		        <!-- <center>
		        	<div class="image">
			          <img src="dist/img/user2-160x160.jpg" width="30px" class="img-circle" alt="User Image">
			        </div>
			        <div class="pull-left info">
			          <p>Alexander Pierce</p>
			        </div>
		        </center> -->
	      	</div>
	      	<ul data-widget="tree" class="sidebar-menu">
	      		<li class="header"></li>
		        <!-- <li :class="{'active treeview':linkCategory}">
		          	<a @click="urlCategory()">
			            <i class="fa fa-edit"></i> <span>Forms</span>
			            <span class="pull-right-container">
			              <i class="fa" :class="iconClasses"></i>
			            </span>
	          		</a>
		          	<ul class="treeview-menu">
			            <li><a href="pages/forms/general.html"><i class="fa fa-circle-o"></i> General Elements</a></li>
			            <li><a href="pages/forms/advanced.html"><i class="fa fa-circle-o"></i> Advanced Elements</a></li>
			            <li><a href="pages/forms/editors.html"><i class="fa fa-circle-o"></i> Editors</a></li>
		          	</ul>
		        </li> -->
		        <li>
		          <router-link to="/search-keywords">
		            <i class="fa fa-keyboard-o"></i> <span>Keywords Search</span>
		            <span class="pull-right-container">
		              <!-- <small class="label pull-right bg-green">new</small> -->
		            </span>
		          </router-link>
		        </li>
		        <li>
		          <router-link to="/search-channel">
		            <i class="fa fa-laptop"></i> <span>Channels Search</span>
		            <span class="pull-right-container">
		              <!-- <small class="label pull-right bg-green">new</small> -->
		            </span>
		          </router-link>
		        </li>
		        <li>
		          <a href="">
		            <i class="fa fa-list-alt"></i> <span>Placements List</span>
		            <span class="pull-right-container">
		              <!-- <small class="label pull-right bg-green">new</small> -->
		            </span>
		          </a>
		        </li>
		        <li>
		          <a href="">
		            <i class="fa fa-cogs"></i> <span>Settings</span>
		            <span class="pull-right-container">
		              <!-- <small class="label pull-right bg-green">new</small> -->
		            </span>
		          </a>
		        </li>
	      	</ul>
	    </section>
  	</aside>
</template>

<script>
	export default {
		name: 'Navigation',
		mounted() {

		},
		data() {
			return {
				linkCategory: false,
			}
		},
		computed: {
			iconClasses() {
		      return {
		        'fa-plus-square-o': !this.linkCategory,
		        'fa-minus-square-o': this.linkCategory
		      }
		    }
		},
		methods: {
			urlCategory() {
				this.linkCategory =! this.linkCategory;
			}
		}
	};
</script>

<style>
	.sidebar .sidebar-menu .active .treeview-menu {
	    display: block;
	}
</style>