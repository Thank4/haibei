<template>
	<view class="wrap">
		<view class="header">
			<u-row gutter="16">
						<u-col span="6">
							<view class="total">5000</view>
							<u-icon 
							name="../../../static/icon/tips_icon.png"
							size="32" 
							label="总收益(元)" 
							label-color="#ffffff"
							label-pos="left"
							margin-right="10"
							:custom-style="{'margin':'0 0 36rpx 40rpx'}"
							></u-icon>
						</u-col>
						<u-col span="6">
							<view class="txBtn">
								<u-button 
								type="primary"
								shape="circle"
								:customStyle="txBtn"
								>提现</u-button>
								</view>
							<view class="txlog">查看提现记录 ></view>
						</u-col>
			</u-row>
			<view class="detail">
			<u-row>
				<u-col span="4">
					<view class="num">5000</view>
					<view class="num-text">账户余额(元)</view>
				</u-col>
				<u-col span="4">
					<view class="num">2000</view>
					<u-icon
					name="../../../static/icon/tips_icon.png"
					size="32" 
					label="冻结资金(元)" 
					label-color="#ffffff"
					label-pos="left"
					margin-right="8"
					:custom-style="{'margin':' 6rpx 0 38rpx'}"
					></u-icon>
				</u-col>
				<u-col span="4">
					<view class="num">2000</view>
					<view class="num-text">累积提现(元)</view>
				</u-col>
			</u-row>
			</view>
			
		</view>
	     <view class="today">今日收益: 0</view>
		 <view>
			 <view class="charts-box">
			  <qiun-data-charts
			     type="tline"
			     :chartData="chartData"
			 	:inScrollView="true"
			 	:opts="opts1"
			     background="none"
			   />
			 </view>
		 </view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				txBtn:{
					width:'120rpx',
					height:'48rpx',
					fontSize:'24rpx',
					background:'rgba(242, 244, 255,0.1)',
					color:'rgba(255, 255, 255, 0.5)'
				}
			}
		}
	}
</script>
<style>
	.header{
		background: #4270FF;
		color: #FFFFFF;
	}
	.total{
		font-size: 88rpx;
		margin: 12rpx 0 0 40rpx;
	}
	.txBtn{
		width:120rpx;
		height:48rpx;
		position: absolute;
		top: 50rpx;
		right: 44rpx;
	}
	.txlog{
		position: absolute;
		top: 130rpx;
		right: 44rpx;
		font-size: 20rpx;
		color: rgba(255, 255, 255, 0.5);
	}
	.detail{
		border-top: 2px solid rgba(238, 238, 238, 0.13);
		padding-top: 20rpx;
		margin: 0 32rpx;
	}
	.num{
		text-align: left;
		font-size: 36rpx;
	}
	.num-text{
		font-size: 24rpx;
		text-align: left;
		margin: 6rpx 0 38rpx;
	}
	.today{
		color: #333333;
		font-size: 28rpx;
		height: 100rpx;
		line-height: 100rpx;
		box-shadow: 0px 2px 0px 0px rgba(231,231,231,0.5);
		padding-left: 30rpx;
	}
	.charts-box{
	  width: 100%;
	  height:370rpx;
	}
</style>