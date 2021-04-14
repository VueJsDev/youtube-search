<template>
	<div class="container-fluid">
		<div class="pull-right">
			<nav aria-label="Page navigation">
			  	<ul class="pagination">
				    <li :class="{ disabled: prevPagination === undefined }">
				      <a  @click="prevPage" href="#" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				      </a>
				    </li>
				    <!-- <li><a href="#" v-for="pages in pageInfo.totalResults">{{pages}}</a></li> -->
				    <li :class="{ disabled: nextPagination === undefined }">
				      <a @click="nextPage" href="#" aria-label="Next">
				        <span aria-hidden="true">&raquo;</span>
				      </a>
				    </li>
			  	</ul>
			</nav>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['nextPagination', 'prevPagination'],
		methods: {
			prevPage() {
		      this.$emit('prevPage');
		    },

		    nextPage() {
		      this.$emit('nextPage');
		    }
		}
	};
</script>