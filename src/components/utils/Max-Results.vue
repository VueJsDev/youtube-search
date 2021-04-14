<template>
	<select v-model="value_results" class="form-control" id="" @change="maxResult">
	  	<option v-for="r in maxResults">
	  		{{ r.results }}
	  	</option>
  	</select>
</template>
<script>

	import {results} from './maxResults.js';

	export default {

		data() {
			return {
				value_results: '',
				maxResults: results
			}
		},

		props: ['cleanSelect'],

		methods:{
			maxResult() {
				this.$emit('maxResults', this.value_results);
			}
		},

		watch: {
			cleanSelect(value) {
				this.value_results = value;
			}
		}
	};
</script>