<template>
	<view>
		<view class="payImg">
		<u-image src="../../../static/img/paySuccess.png" width="180rpx" height="180rpx"></u-image>
		</view>
		<view class="status">付款成功</view>
		<view class="tips">请移动到pc端<text class="blue">下载专属浏览器</text></view>
	</view>
</template>

<script>
</script>

<style scoped>
	.payImg{
		margin: 220rpx auto 0;
		width: 180rpx;
		
	}
	.status{
		text-align: center;
		color: #393C4C;
		font-size: 28rpx;
		font-weight: bold;
		margin: 30rpx 0;
	}
	.tips{
		font-size: 24rpx;
		color: #666666;
		text-align: center;
	}
	.blue{
		color: rgb(53, 130, 237);
	}
	
	
</style>
