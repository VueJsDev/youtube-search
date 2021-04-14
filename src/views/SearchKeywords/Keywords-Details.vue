<template>
	<div class="row"><br>
		<div class="form-horizontal">
          	<div class="box-body">
          		<div class="col-md-1"></div>
                <div class="col-md-5">
                	<div class="form-group">
	                  <label for="inputEmail3" class="col-sm-2 control-label">Keyword</label>
	                  <div class="col-sm-8">
	                    <input type="text" v-model="searchString" ref="searchString" @keydown.13.prevent="parseSearchString" class="form-control">
	                  </div>
	                </div>
                </div>
                <div class="col-md-5">
                	<div class="form-group">
	                  <label for="inputEmail3" class="col-sm-3 control-label">Max Results</label>
	                  <div class="col-sm-8">
	                    <MaxResults @maxResults="maxResults" :cleanSelect="cleanSelectOptions"/>
	                  </div>
	                </div>
                </div>
                <div class="col-md-1"></div>
          	</div><br>

          	<template v-if="GET_LOADING_DATA_GIF">
          		<center>
          			<img src="../../../public/img/loading.gif" width="40px" alt="">
          		</center>
          	</template>

          	<br>
          	<center>
          		<button type="submit" class="btn btn-success btn-sm" @click="parseSearchString">
          			<i class="fa fa-search"></i> Search
          		</button>
          	</center>
          	<br>
        </div>
	</div>
</template>

<script>
	
	import { mapActions, mapState, mapGetters} from 'vuex';

	import MaxResults from '../../components/utils/Max-Results.vue'
	export default {
		name: 'KeywordsDetails',
		data() {
			return {
				searchString: '',
				searchMaxResult: '',
				cleanSelectOptions: null
			}
		},
		components: {
			MaxResults
		},
		methods: {

			parseSearchString() {

		      	if (this.searchString === '' || this.searchMaxResult === '') {
			      	//this.$toastr.e("Ingrese un criterio de búsqueda para continuar!");
			      	this.$toast.error("Enter a search criteria to continue!", {position: 'top-right', duration: '1500'});
			      	this.focusInput();
		      	} else {
				    const trimmedSearchString = this.searchString.trim();
				    if (trimmedSearchString !== '') {
				        const searchParams = trimmedSearchString.split(/\s+/);
				        this.$emit('search', {'searchParams': searchParams, 'searchMaxResult': this.searchMaxResult});
				    }
				    this.searchString = '';
				    this.cleanSelectOptions = Math.random() * (100 - 1) + 1
		      	}

		    },

			maxResults(value) {
				let seleccionado = value;
				this.searchMaxResult = seleccionado
			},

			focusInput() {
		      this.$refs.searchString.focus();
		    }
		},
		computed: {
	        ...mapGetters('videos', ['GET_LOADING_DATA_GIF']),
	    },
	};
</script>