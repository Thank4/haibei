<template>
	<view>
		<video  class="viedoBox"
			      id="myVideo" 
			      :src="url" 
				  autoplay="true"
			      binderror="videoErrorCallback" 
			      controls
				  show-mute-btn
			      bindenterpictureinpicture='bindVideoEnterPictureInPicture'
			      bindleavepictureinpicture='bindVideoLeavePictureInPicture'
			   ></video>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:''
			}
		},
		onLoad(data) {
			this.url = data.url
			console.log(data)
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.viedoBox{
		width:100%;
		height:361rpx; 
	}
</style>
