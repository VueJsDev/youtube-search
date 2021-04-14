<template>
	<button :class="cssBoton" @click="click" :disabled="enableButton">
		<appIconsButtons :iconoButtons="icons"/>
		<strong> {{ textButton }} </strong>
	</button>
</template>

<script>

	import Icons from './Icons.vue'
	import AppIconsButtons from './Icons-Buttons.vue'

	export default {
		name: 'Buttons',

		components: {
			Icons,
			AppIconsButtons
		},

		props:{
			typebutton:
	        {
	          type: String,
	          default: 'secondary'
	        },
	        size:
	        {
	          type: String,
	          default: 'xs'
	        },
	        textButton:
	        {
	        	type: String
	        },
	        icons: String,
	        enableButton: ''
		},

		methods: {
			click(){
	          this.$emit('click');
	        }
		},

		computed: {
	        cssBoton() {
	          return `btn btn-${this.typebutton} btn-${this.size}`;
	        }
      	}
	};
</script>