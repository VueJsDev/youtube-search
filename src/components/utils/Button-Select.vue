<template>
	<div class="box-tools pull-right">
		<div class="btn-group-toggle btn-sm" data-toggle="buttons" @click="click" :disabled="enableButtonSelectAll" style="margin-top: -4px; margin-right: -5px;">
		  	<label class="btn btn-default btn-sm">
			    <input type="checkbox" v-model="allSelected"><i class="fa fa-check"></i><strong> Select All</strong>
		  	</label>
		</div>
	</div>
	</div>
</template>
<script>

	export default {

		data() {
			return {
				allSelected: false
			}
		},
		methods: {
			click() {
				this.$emit('click');
			}
		},
		props:['enableButtonSelectAll']
	};
</script>