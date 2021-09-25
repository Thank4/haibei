<template>
	<view class="wrap">
		<view class="header">
			<view class="total">{{data.share_money}}</view>
			<view class="text">我的邀请人：{{data.share_name}}</view>
		</view>
		<view class="myInvitation">
			<view class="title">我的邀请</view>
			<u-cell-group>
					<u-cell-item v-for="item in list"  :title="item.from_merchant_id" :value="'¥'+item.income_money" :label="item.created_at" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				data:{},
				list:[]
			}
		},
		onLoad(){
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getInviter().then(res =>{
					this.data = res.data
				})
				this.$u.api.getShareList().then(res =>{
					this.list = res.data.data
				})
			},
			
		}
	}
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
