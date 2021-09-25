<template>
	<view class="wrap">
		<view v-if="vip_price">
			<u-gap height="16" bg-color="#F8F8F8"></u-gap>
		 <view class="header"><view class="name">会员年费</view></view>
		 <view class="body">
		     <view class="block3">
		         <view class="mod5">
		           <view class="mod6">
		             <text lines="1" class="word3">海贝</text>
		           </view>
		           <view class="mod7">
		             <text lines="1" class="word4">海贝会员年费（<text class="del">原价¥9800/年</text>）现价¥{{vip_price}}</text>
		             <text lines="1" class="txt1">到期时间：{{dq_time}}</text>
		           </view>
		         </view>
		         <view class="mod8">
		           <text lines="1" decode="true" class="word5">¥{{vip_price}}/年</text>
		         </view>
		       </view>
		    </view>
			
		</view>
			<u-gap height="16" bg-color="#F8F8F8"></u-gap>
			<view class="header"><view class="name">套餐包</view></view>
			<view class="body">
			    <view class="block3">
			        <view class="mod5">
			          <view class="mod6">
			            <text lines="1" class="word3">套餐包</text>
			          </view>
			          <view class="mod7">
			            <text lines="1" class="word4">{{package_detail.name}}</text>
			            <text lines="1" class="txt1">{{package_detail.num}}条/{{package_detail.price}}元</text>
			          </view>
			        </view>
			        <view class="mod8">
			          <text lines="1" decode="true" class="word5">¥&nbsp;{{package_detail.price/package_detail.num}}/条</text>
			        </view>
			      </view>
			   </view>
			
	     <view class="bar u-flex">
			 <view class="total-fee u-flex-1">总计:{{total_price}}元</view>
			 <view class="payBtn u-flex-1"><u-button type="primary" :customStyle="{'width':'328rpx',height:'100rpx'}" @click="pay">立即支付</u-button></view>
		 </view>
		 <u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				package_id:4,
				package_detail:{},
				dq_time:'',
				vip_price:0,
				total_price:0,
				ip_price_total:0,
				order_no:'',
				prepay:{}
				
			}
		},
		onLoad(data){
			
			this.dq_time = this.getYear()
			let self = this
			uni.getStorage({
			    key: 'order_res',
			    success: function (res) {
			        console.log(res);
					if(res.data.vip_price){
						self.vip_price = res.data.vip_price
						self.total_price = res.data.total_price
						self.ip_price_total = res.data.ip_price_total
						self.order_no = res.data.order_no
						self.prepay = res.data.prepay
						self.getPackage()
					}else{
						self.total_price = res.data.total_price
						self.order_no = res.data.order_no
						self.prepay = res.data.prepay
						self.getPackage()
					}
					
					
			    }
			});
		},
		methods:{
			getPackage(){
				this.$u.api.getPackageInfo({
					id:this.package_id
				}).then(res =>{
					console.log(res)
					if(res.code == 200){
						this.package_detail = res.data
					}
				})
			},
			getYear(){
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				if (month < 10) {
				    month = "0" + month;
				 }
				 if (day < 10) {
				      day = "0" + day;
				 }
				return year + "-" + month + "-" + day
			},
			pay(){
				let self = this
				if(this.vip_price){
					uni.requestPayment({
					    provider: 'wxpay',
						timeStamp:this.prepay.timeStamp,
						nonceStr:this.prepay.nonceStr,
						package: this.prepay.package,
						signType: this.prepay.signType,
						paySign: this.prepay.paySign,
					    success: function (response) {
					        //支付成功回调,并跳转页面
							self.$u.api.setShareHistory({
								order_no:self.order_no
							}).then(res =>{
								if(res.code == 200){
									//TODO 跳转支付成功页面，提示
									self.$u.route('/packageB/pages/distribution/paySuccess')
								}
							})		
					    },
					    fail: function (err) {
							console.log('失败回调订单号',res.data.order_no)
							self.$u.api.cancelPay({
								'order_no':self.order_no
							}).then(res => {
								//TODO,支付失败
								self.$refs.uToast.show({
									title: '支付失败,请重试',
									type: 'error',
					
								})
							})
					        console.log('fail:' + JSON.stringify(err));
					    }
					});
				}else{
					let self = this
					uni.requestPayment({
					    provider: 'wxpay',
						timeStamp:this.prepay.timeStamp,
						nonceStr:this.prepay.nonceStr,
						package: this.prepay.package,
						signType: this.prepay.signType,
						paySign: this.prepay.paySign,
					    success: function (response) {
					        //支付成功
							self.$refs.uToast.show({
								title: '支付成功',
								type: 'success',
								isTab:true,
								url:'/pages/tabBar/distribute/distribute'
								
							})
								
					    },
						fail: function (err) {
							console.log('失败回调订单号',res.data.order_no)
								self.$refs.uToast.show({
									title: '支付失败,请重试',
									type: 'error',					
								})
						
						}
					});
				}
				
			}
		}
	}
</script>

<style>
	page{
		background: #F8F8F8;
	}
	.header {
	  height: 68rpx;
	  background-color: rgba(255,255,255,1);
	  margin-bottom: 30rpx;
	  display: flex;
	  flex-direction: column;
	 
	}
	.name{
		color:#333333;
		margin: 30rpx 0 0 32rpx;
		 z-index: 99;
	}
	.del{
		text-decoration:line-through;
	}
	.body{
	  height: 130rpx;
	  background-color: rgba(255,255,255,1);
	  justify-content: flex-end;
	  align-items: center;
	  display: flex;
	  flex-direction: column;
	}
	.block3 {
	  height: 176rpx;
	  background-color: rgba(255,255,255,1);
	  margin-top: 82rpx;
	  width: 750rpx;
	  display: flex;
	  flex-direction: column;
	}
	.mod5 {
	  width: 264rpx;
	  height: 96rpx;
	  flex-direction: row;
	  display: flex;
	  justify-content: space-between;
	  margin: 16rpx 0 0 32rpx;
	}
	.mod6 {
	  height: 96rpx;
	  border-radius: 8rpx;
	  background-color: rgba(89,126,247,1);
	  width: 96rpx;
	  justify-content: center;
	  align-items: center;
	  display: flex;
	  flex-direction: column;
	}
	.word3 {
	  width: 72rpx;
	  height: 48rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(255,255,255,0.97);
	  font-size: 24rpx;
	  font-family: PingFangSC-Medium;
	  line-height: 48rpx;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}
	.mod7 {
	  width: 152rpx;
	  height: 96rpx;
	  display: flex;
	  flex-direction: column;
	}
	.word4 {
	  width: 140rpx;
	  height: 44rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(0,0,0,0.65);
	  font-size: 28rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 44rpx;
	  align-self: flex-start;
	}
	.txt1 {
	  width: 152rpx;
	  height: 44rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(0,0,0,0.45);
	  font-size: 24rpx;
	  font-family: PingFangSC-Regular;
	  white-space: nowrap;
	  line-height: 44rpx;
	  margin-top: 8rpx;
	}
	.mod8 {
	  width: 98rpx;
	  height: 44rpx;
	  flex-direction: row;
	  display: flex;
	  margin: 8rpx 0 0 144rpx;
	}
	.word5 {
	  width: 98rpx;
	  height: 44rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(51,51,51,1);
	  font-size: 24rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 44rpx;
	}
	.bar{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 208rpx;
		background: #FFFFFF;
	}
	.total-fee{
		color: #428BF4;
		font-size: 32rpx;
		text-align: center;
	}
	.payBtn{
		
	}
</style>
