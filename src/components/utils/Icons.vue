<template>
	<h3 class="box-title" :class="classText">
		<strong>
			<i :class="claseIcono"></i>
			{{ title }}
		</strong>
	</h3>
</template>

<script>
	export default {
		computed: {
			classText() {
				return 'card-body text-' + this.color;
			},
			claseIcono:  function(){
			    return 'fa ' + this.icon;
		  	}		
		},

		props:['color', 'icon', 'size', 'title']
	};
</script>