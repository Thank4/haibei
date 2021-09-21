<template>
	<view class="wrap">
		<view class="header">
			<view class="total">5000</view>
			<view class="text">我的邀请人：coming</view>
		</view>
		<view class="myInvitation">
			<view class="title">我的邀请</view>
			<u-cell-group>
					<u-cell-item  title="176****4679" value="¥ 460" label="2021-09-13" :arrow="false"></u-cell-item>
					<u-cell-item  title="176****4679" value="¥ 460" label="2021-09-13" :arrow="false"></u-cell-item>
					<u-cell-item  title="176****4679" value="¥ 460" label="2021-09-13" :arrow="false"></u-cell-item>
					<u-cell-item  title="176****4679" value="¥ 460" label="2021-09-13" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
</script>

<style>
	page{
		background:#F8F8F8;
	}
	.header{
		width: 686rpx;
		height: 240rpx;
		background: #FFFFFF;
		margin: 16rpx 32rpx;
		border-radius: 8rpx;
	}
	.myInvitation{
	  width: 686rpx;
	  background: #FFFFFF;
	  margin: 0 32rpx;
	  border-radius: 8rpx;
	}
	.total{
		font-size: 60rpx;
		text-align: center;
		padding-top: 52rpx;	
	}
	.text{
		text-align: center;
		margin-top: 18rpx;
	}
	.title{
		text-align: center;
		font-size: 32rpx;
		line-height: 80rpx;
	
		
	}
</style>
