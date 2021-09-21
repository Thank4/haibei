<template>
	<view class="wrap">
		<view class="labelTitle">海贝会员</view>
		<view class="vip u-flex">
			<view class="vip-img">海贝</view>
			<view class="info">
				<view class="annualFee">海贝会员年费（<text class="del">原价¥9800/年</text>）</view>
				<view class="expire">到期时间 2022-09-03</view>
			</view>
			<view class="now-price">¥ 980</view>
		</view>
		<view class="labelTitle">IP套餐包列表</view>
		<view class="package-item u-flex">
			<view class="package-img">套餐包</view>
			<view class="info">
				<view class="annualFee">固定套餐包</view>
				<view class="num">1000条/100元</view>
			</view>
			<view class="status">
				<view class="allowance">余量：300</view>
				<view class="expireTime">2016-06-16 14:03</view>
			</view>
		</view>
		<view class="progress u-flex">
			<view class="u-flex-1"><u-line-progress active-color="#1890FF" :percent="50"></u-line-progress></view>
			<view class="u-flex-1 buy">继续购买</view>
		</view>
		<u-gap height="16" bg-color="#F8F8F8"></u-gap>
		<view class="package-item u-flex">
			<view class="package-img">套餐包</view>
			<view class="info">
				<view class="annualFee">固定套餐包</view>
				<view class="num">1000条/100元</view>
			</view>
			<view class="status">
				<view class="allowance">余量：300</view>
				<view class="expireTime">2016-06-16 14:03</view>
			</view>
		</view>
		<view class="progress u-flex">
			<view class="u-flex-1"><u-line-progress active-color="#52C41A" :percent="100"></u-line-progress></view>
			<view class="u-flex-1 buy">继续购买</view>
		</view>
		<u-gap height="16" bg-color="#F8F8F8"></u-gap>
		
		<view class="labelTitle">IP套餐包列表</view>
		<view class="packageInfo">
			<view class="u-flex package-header">
				<view class="u-flex-1 u-text-left package-title">固定套餐包</view>
				<view class="u-flex-1 u-text-right">2000/200元</view>
			</view>
			<view class="u-flex info-item">
				<view class="u-flex-1 u-text-left">使 用 IP</view>
				<view class="u-flex-1 u-text-right">2000/200元</view>
			</view>
			<view class="u-flex info-item">
				<view class="u-flex-1 u-text-left">用 量</view>
				<view class="u-flex-1 u-text-right">2000/200元</view>
			</view>
			<view class="u-flex info-item">
				<view class="u-flex-1 u-text-left">余 量</view>
				<view class="u-flex-1 u-text-right">2000/200元</view>
			</view>
			<view class="u-flex info-item">
				<view class="u-flex-1 u-text-left">分发类型</view>
				<view class="u-flex-1 u-text-right">2000/200元</view>
			</view>
			<view class="u-flex info-item">
				<view class="u-flex-1 u-text-left">分发时间</view>
				<view class="u-flex-1 u-text-right">2000/200元</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
</script>

<style>
	page{
		background: #F8F8F8;
	}
	.labelTitle{
		font-size: 28rpx;
		color: #333333;
		padding-left: 32rpx;
		line-height: 80rpx;
		height: 80rpx;
		
	}
	.vip{
		height: 130rpx;
		background: #FFFFFF;
	}
	.vip-img{
		background: #597EF7;
		font-size: 24rpx;
		width: 96rpx;
		height: 96rpx;
		line-height: 48rpx;
		margin: 16rpx 0 18rpx 32rpx;
		padding:24rpx;
		border-radius: 8rpx;
		color: #FFFFFF;
	}
	.info{
		margin-left: 16rpx;
		vertical-align: top;
		display: block;
		height: 100%;
	}
	.annualFee{
		color: #000000;
		font-size: 28rpx;
		margin-top: 16rpx;
		
	}
	.del{
		text-decoration:line-through;
	}
	.expire{
		color: rgba(0, 0, 0, 0.45);
		font-size: 24rpx;
		margin-top: 10rpx;
	}
	.now-price{
		color: #1890FF;
		font-size: 24rpx;
		display: block;
		height: 100%;
		margin-left: 102rpx;
		margin-top: 32rpx;
	}
	.package-item{
		height: 130rpx;
		background: #FFFFFF;
	}
	.package-img{
		background: #597EF7;
		font-size: 24rpx;
		width: 96rpx;
		height: 96rpx;
		line-height: 48rpx;
		margin: 16rpx 0 18rpx 32rpx;
		padding:24rpx 12rpx;
		border-radius: 8rpx;
		color: #FFFFFF;
	}
	.num{
		color: rgba(0, 0, 0, 0.45);
		font-size: 28rpx;
		margin-top: 10rpx;
	}
	.status{
		color: rgba(0, 0, 0, 0.45);
		font-size: 24rpx;
		display: block;
		height: 100%;
		margin-left: 196rpx;
		margin-top: 32rpx;
	}
	.allowance{
		margin-left: 90rpx;
	}
	.expireTime{
		margin-top:8rpx;
		height: 44rpx;
		line-height: 44rpx;
	}
	.progress{
		height: 82rpx;
		background: #FFFFFF;
		padding: 0 32rpx;
	}
	.buy{
		text-align: right;
		color: #1890FF;
		font-size: 24rpx;
	}
	.packageInfo{
		background: #FFFFFF;
		padding: 0 40rpx;
		
	}
	.package-header{
		border-bottom: 1px solid #E5E5E5;
	}
	.package-title{
		font-size: 30rpx;
		color: #888888;
		height: 118rpx;
		line-height: 118rpx;
		
	}
	.info-item{
		height: 76rpx;
		line-height: 76rpx;
		color: #888888;
	}
</style>
