<template>
	<div class="page home-page">this is {{title}}
		<Input v-model="input"></Input>
	</div>
	
</template>
<script>
	export default {
		data () {
			return {
				title: 'home-index',
				input: '123'
			}
		}
	}
</script>
<style>
	.page {
		color: red;
	}
</style>