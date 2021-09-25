<template>
	<view class="wrap">
		<view class="labelTitle">
			套餐包类型
		</view>
		<view class="name"><u-button type="primary" :customStyle="{width:'300rpx',height:'88rpx'}">固定套餐包</u-button> </view>
		<view class="labelTitle">
			套餐包配额
		</view>
		<view class="content">
			<u-row gutter="16">
				       <u-radio-group v-model="value">
							<u-col span="4" v-for="item in list">
								<template v-if="value == item.id">
									<view class="item-checked" @click="select(item.id)">
										<view class="radio"><u-radio :name="item.id"></u-radio></view>
										<view class="num">{{item.num}}/条</view>
										<view class="sum">¥ {{item.price}}</view>
									</view>
								</template>
								<template v-else>
									<view class="item" @click="select(item.id)">
										<view class="radio"><u-radio :name="item.id"></u-radio></view>
										<view class="num">{{item.num}}/条</view>
										<view class="sum">¥ {{item.price}}</view>
									</view>
								</template>
							</u-col>
							</u-radio-group >
			</u-row>
		</view>
	    <view class="tips">注：购买后套餐包相互叠加!</view> 
		<view class="buyBtn"><u-button type="primary" :customStyle="{width:'670rpx',height:'100rpx'}" @click="buy">立即购买</u-button></view>
		<view class="buyTips">购买套餐包即视为您同意贝予科技<text class="buyTipsColor">《海贝服务协议》</text></view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:'',
				list:[]
			}
		},
		onLoad(){
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getPackageAll().then(res =>{
					if(res.code == 200){
						this.list = res.data.package_list
					}
				})
			},
			select(id){
				console.log(id)
				this.value = id
			},
			buy(){
				if(!this.value){
					this.$refs.uToast.show({
						  title: '请选择套餐包',
						})
						return
				}
				console.log(this.value)
				console.log(this.vuex_openId)
				this.$u.api.buyPackage({
					openId:this.vuex_openId,
					package_id:this.value
				}).then(res =>{
					console.log(res)
					if(res.code == 200){
						if(res.data.status == 1){ //跳去支付
							uni.setStorageSync('order_res', res.data);
							this.$u.route({
								url:'/packageE/pages/packages/pay',
								params:{
									package_id:this.value,
								}
							})
						}else if(res.data.status==4){
							this.$refs.uToast.show({
								  title: '调起支付失败',
								})
								return
						}
					}
				})
				
			}
		}
	}
</script>

<style>
	page{
		background: #F8F8F8;
	}
	.labelTitle{
		 font-size: 28rpx;
		 color: #333333;
		 margin:20rpx 0 0 32rpx;
	}
	.name{
		width: 300rpx;
		height: 88rpx; 
		margin: 34rpx 0 0 32rpx; 
	}
	.content{
		padding: 0 32rpx;
	}
	.item-checked{
		width: 210rpx;
		height: 150rpx;
		border-radius: 16rpx;
		border: 2rpx solid #428BF4;
		background: #FFFFFF;
		margin-top:20rpx;
		position: relative;
	}
	.item{
		width: 210rpx;
		height: 150rpx;
		border-radius: 16rpx;
		border: 2rpx solid #D3DBEB;
		margin-top:20rpx;
		position: relative;
	}
	.radio{
		position: absolute;	
		right: -33rpx;
		bottom: 0;
	}
	
	.num{
		text-align: center;
		font-size: 32rpx;
		margin-top: 38rpx;
	}
	.sum{
		text-align: center;
		font-size: 26rpx;
		margin-top: 18rpx;
	}
	.tips{
		font-size: 28rpx;
		color: #8F9BB3;
		margin: 34rpx 0 0 32rpx;
	}
	.buyBtn{
		margin: 530rpx 32rpx 0;
	}
	.buyTips{
		font-size: 28rpx;
		color: #8F9BB3;
		margin-top: 40rpx;
		text-align: center;
	}
	.buyTipsColor{
		color: #428BF4;
	}
</style>
