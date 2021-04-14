<template>
	<div class="modal fade" id="modalDetails">
      	<div class="modal-dialog">
	        <div class="modal-content">
	          	<div class="modal-header">
		            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		              <span aria-hidden="true">&times;</span></button>
		            <h4 class="modal-title text-light-blue"> <i class="fa fa-copy"></i> Click inside the blue line</h4>
	          	</div>
		          	<div class="modal-body">
		          		<div id="global" @click="copyURL">
		          		  <div id="mensajes">
		          		    <div class="texto" :key="data.id" v-for="data in dataDetailsUrls">
		            			{{ data }}
                				<input type="hidden" id="mylink" :value="dataDetailsUrls">
		          		    </div>
		          		  </div>
		          		</div>
		         	</div>
	          	<div class="modal-footer">
		            <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" @click="click"><i class="fa fa-refresh"></i> Close</button>
          		</div>
	        </div>
      	</div>
    </div>
</template>

<script>

	export default {
		data() {
			return {

		    }
		},

		props: ['dataDetailsUrls', 'showModal'],

		methods: {
			click() {
				this.$emit('clearListUrl')
			},

			copyURL() {
				let url = document.querySelector('#mylink')
				url.setAttribute('type', 'textarea')
				url.select()

				try {

		            var successful = document.execCommand('copy');
		            var msg = successful ? 'successful' : 'unsuccessful';
		            this.$toast.success("Has been copied successfully", {position: 'top-right'});
	          	} catch (err) {
	          		this.$toast.error("Oops, there was a problem!", {position: 'top-right'});
	          	}

	          	/* unselect the range */
	          	url.setAttribute('type', 'hidden')
	          	window.getSelection().removeAllRanges()
		    }
		},

	};
</script>

<style scoped>
	#global {
		height: auto;
		width: auto;
		border: 1px solid #3c8dbc;
		background: #f1f1f1;
		overflow-y: scroll;
	}
	#mensajes {
		height: auto;
	}
	.texto {
		padding:4px;
		background:#fff;
	}
</style>