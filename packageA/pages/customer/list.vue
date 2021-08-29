<template>
	<view>
		<template v-if="list.length >0">
			<u-card title="6月10日 19:30" :title-color="titleColor" :box-shadow="boxShadow" v-for="item in list">
					<view class="" slot="body">
						<view class="u-body-item">
								<view class="num">客户编号：{{item.id}}</view>
								<view class="email">客户邮箱：{{item.email}}</view>
						</view>
					</view>
			</u-card>
		
		</template>
		<template v-else>
			<u-empty text="暂无客户信息" src="../../../static/img/empty_list.png" icon-size="200rpx" margin-top="133"></u-empty>
		</template>
		
		
			
	</view>
</template>

<script>
	export default{
		data(){
			return {
				boxShadow:'0px 0px 16px 0px rgba(0,0,0,0.14)',
				titleColor:'rgb(189,189,189)',
				list:[]
			}
		},
		onLoad(){
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getUserAll().then(res =>{
					if(res.code == 200){
						if(res.data.length > 0){
							this.list = res.data.data
						}
						
						
					}
				})
			}
		}
	}
</script>

<style scoped>
	.u-body-item {
			font-size: 32rpx;
			color: rgb(104,104,104);
			padding: 20rpx 10rpx;
	}
	.num{
		font-size: 32rpx;
	}
	.email{
		margin-top: 10rpx;
		font-size: 32rpx;
	}
</style>
