<template>
	<view>
		<image :src="url" mode="widthFix" class="img"></image>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:''
			}
		},
		onLoad(data){
			this.url = data.url
			console.log(this.url)
		}
	}
</script>

<style scoped>
	.img{
		width: 100%;
	}
</style>
