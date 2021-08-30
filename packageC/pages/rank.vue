<template>
	<view>
		<view class="item" v-for="item in list">
			<view class="cover-img">
				<u-image width="100%" height="361rpx" :src="item.preview"></u-image>
			</view>
			<view class="item-title">
				{{item.name}}
			</view>
			<view class="coment">
				<u-row gutter="16">
							<u-col span="9">
								<view class="num">
									<u-icon name="../../../static/icon/read_icon.png" :custom-style="{'margin-right':'14rpx'}" width="37" height="31"></u-icon>{{item.watch}}</view>
							</u-col>
							<u-col span="3">
								<view  class="num">
									<u-icon name="../../../static/icon/dz_icon.png" :custom-style="{'margin-right':'14rpx'}" width="37" height="31"></u-icon>{{item.like}}</view>
							</u-col>
						</u-row>
			</view>
		</view>
		
		
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				list:[]
			}
		},
		onLoad(data){
			this.name = data.name
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getHotVideo({
				}).then(res =>{
					this.list = res.data[this.name]
					for(let i in res.data[this.name]){
						console.log(res.data[this.name][i])
					}
					//console.log(res)
				})
			}
		}
	}
</script>

<style scoped>
	.item{
		margin: 34rpx 55rpx 20rpx 44rpx;
	}
	.cover-img{
		width: 677rpx;
		height: 374rpx;
	}
	.num{
		font-size: 32rpx;
		height: 31rpx;
		line-height: 31rpx;
		vertical-align: top;
	}
	.item-title{
		margin: 34rpx 0 30rpx 0;
	}
	.coment{
		
	}
	.slot-content{
		margin: 0 78rpx  0 78rpx;
	}
	.labelTitle{
		margin-top: 71rpx;
	}
	.btnGroup{
		margin-top: 86rpx;
	}
</style>
