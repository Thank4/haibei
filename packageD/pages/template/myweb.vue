<template>
	<view>
		<view class="empty">
			<view class="empty-img">
			<u-image src="../../../static/img/empty_web.png" width="500" height="500"></u-image>
			</view>
			<u-button shape="circle" :custom-style="copyBtn">
				<u-icon name="../../../static/icon/copy_icon.png" :custom-style="{'margin-right':'20rpx'}" size="39"></u-icon>www.seabeeksea..com</u-button>
			<view class="tips">复制链接请到PC端上传您的网站</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				copyBtn:{
					width:'500rpx',
					height:'76rpx',
					background:'linear-gradient(to right, #4293f4, #4276f4)',
					fontSize:'34rpx',
					color:'#fff',
					marginTop:'80rpx'
				}
			}
		}
	}
</script>

<style scoped>
	.empty{
		text-align: center;
	}
	.empty-img{
		width:500rpx;
		height:500rpx;
		margin:20rpx auto;
	}
	.tips{
		margin-top: 24rpx;
		color: #393C4C;
	}
</style>
