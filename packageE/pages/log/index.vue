<template>
	<view class="log">
		<view class="item" v-for="item in list">
		        <view class="top">
		          <text  class="title">余额提现-到{{item.bank_name}}</text>
		          <text  class="sum">¥&nbsp;{{item.money}}</text>
		        </view>
		        <view class="bottom">
		          <text class="desc">余额提现-到{{item.bank_name}}</text>
		          <text class="status" v-if="item.status =='0'">提现处理中…</text>
				  <text class="status" v-if="item.status =='1'">到账成功</text>
				  <text class="status" v-if="item.status =='2'">提现失败</text>
		        </view>
		  </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		onLoad(){
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getIncomeList().then(res =>{
					this.list = res.data.data
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F8F8F8;
	}
	.item {
	  height: 170rpx;
	  background-color: rgba(255,255,255,1);
	  width: 750rpx;
	  display: flex;
	  flex-direction: column;
	}
	.top {
	  width: 694rpx;
	  height: 44rpx;
	  flex-direction: row;
	  display: flex;
	  justify-content: space-between;
	  margin: 40rpx 0 0 24rpx;
	}
	.title {
	  width: 340rpx;
	  height: 44rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(51,51,51,1);
	  font-size: 32rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 44rpx;
	  text-align: center;
	}
	.sum {
	  width: 108rpx;
	  height: 44rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(51,51,51,1);
	  font-size: 32rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 44rpx;
	  text-align: center;
	}
	.bottom {
	  width: 694rpx;
	  height: 38rpx;
	  flex-direction: row;
	  display: flex;
	  justify-content: space-between;
	  margin: 14rpx 0 0 24rpx;
	}
	.desc {
	  width: 256rpx;
	  height: 34rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(153,153,153,1);
	  font-size: 24rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 34rpx;
	  text-align: center;
	}
	.status {
	  width: 144rpx;
	  height: 34rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(51,51,51,1);
	  font-size: 24rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 34rpx;
	  text-align: center;
	  margin-top: 4rpx;
	}
</style>
