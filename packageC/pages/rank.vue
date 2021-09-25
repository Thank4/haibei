<template>
	<view class="wrap">
		<view class="item" v-for="item in list">
			<view class="cover-img" @click="play(item.url)">
			
				<image :src="item.preview" class="preview"></image>
				<view class="main2">
					<image src="../../static/icon/play_icon.png" class="play"></image>
				</view>
			</view>
			<view class="item-title">
				{{item.name}}
			</view>
			<view class="coment">
				<u-row gutter="16">
							<u-col span="9">
								<view class="num">
									<u-icon name="../../../static/icon/read_icon.png" :custom-style="{'margin-right':'14rpx'}" width="37" height="31"></u-icon>
									{{item.watch ? item.watch:0}}
									</view>
							</u-col>
							<!-- <u-col span="3">
								<view>
									<u-icon name="../../../static/icon/pl_icon.png" :custom-style="{'margin-right':'14rpx'}" width="37" height="31">0</u-icon>
								</view>
							</u-col> -->
							<u-col span="3">
								<view class="num">
									<u-icon name="../../../static/icon/dz_icon.png" :custom-style="{'margin-right':'14rpx'}" width="37" height="31"></u-icon>
									{{item.like ? item.like : 0 }}</view>
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
			uni.setNavigationBarTitle({
			    title: this.name+'热榜'
			});
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
			},
			play(data){
				console.log(data)
				this.$u.route({
					url:"/packageA/pages/videos/play",
					params:{
						url:data
					}
				})
			},
		}
	}
</script>

<style scoped>
	.search{
		margin: 50rpx 50rpx 40rpx 50rpx;
	}
	.tab{
		margin-left: 30rpx;
		width: 600rpx;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.preview{
		position: absolute;
		z-index: 0;
		width: 686rpx;
		height: 386rpx;
		border-radius: 16rpx;
	}
	.main2 {
	  z-index: 99;
	  width: 120rpx;
	  display: flex;
	  flex-direction: column;
	  padding-bottom: 108rpx;
	}
	.play {
	  width: 120rpx;
	  height: 120rpx;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.dropdown{}
	.tab-content{
	
	}
	.item{
		margin: 34rpx 55rpx 20rpx 44rpx;
	}
	.num{
		font-size: 35rpx;
		height: 31rpx;
		line-height: 31rpx;
		vertical-align: top;
	}
	.cover-img{
		height: 386rpx;
		border-radius: 16rpx;
		background-color: rgba(221,221,221,1);
		align-self: center;
		margin-top: 20rpx;
		width: 686rpx;
		justify-content: flex-end;
		align-items: center;
		display: flex;
		flex-direction: column;
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
	.viedoBox{
		width:100%; 
		height:361rpx; 
	}
</style>
