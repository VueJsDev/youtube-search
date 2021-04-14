<template>
  <span :class="claseIcono" aria-hidden="true"></span>
</template>


<script>

	export default {

		name:'appIconos',

		props: ['iconoButtons'],

		template: '#appiconos',

		computed: {
		  claseIcono:  function(){
		    return 'fa ' + this.iconoButtons;
		  }
		}
	};

</script>