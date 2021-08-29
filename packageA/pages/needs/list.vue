<template>
	<view class="wrap">
		<view class="header">
		<u-row gutter="50">
			<u-col span="4">
				<view class="item" @click="mbdz">
					<image class="item_img" src="../../../static/icon/mbdz.png"></image>
					<p>模板定制</p>
				</view>
			</u-col>
			<u-col span="4">
				<view class="item" @click="logodz">
					<image class="item_img" src="../../../static/icon/logodz.png"></image>
					<p>LOGO定制</p>
				</view>
			</u-col>
			<u-col span="4">
				<view class="item" @click="spdz">
					<image class="item_img" src="../../../static/icon/spdz.png"></image>
					<p>视频定制</p>
				</view>
			</u-col>
		</u-row>
	    </view>
		
		<template v-if="isEmpty">
			<view class="empty">
				<u-empty text="暂无客户信息" src="../../../static/img/empty_list.png"></u-empty>
			</view>
			
		</template>
		<template v-else>
			<view class="barTitle">
				<u-cell-group>
					<u-cell-item title="定制信息" :title-style="{'color':'black'}" :arrow="false"></u-cell-item>
				</u-cell-group>
			</view>
			<view class="needslist">
				<u-card v-for="(item,index) in list" :title="item.created_at" :title-color="titleColor" :box-shadow="boxShadow">
						<view class="" slot="body">
							<view class="u-body-item">
									<view class="name">定制名称：{{item.name}}</view>
									<view class="num">客户编号：{{item.id}}</view>
									<view class="email">联系方式：{{item.contact ? item.contact:''}}</view>
							</view>
						</view>
					</u-card>
					<u-loadmore :status="status" />
			</view>
		</template>
	</view>
</template>

<script>
	export default{
		data (){
			return {
				boxShadow:'0px 0px 16px 0px rgba(0,0,0,0.14)',
				titleColor:'rgb(189,189,189)',
				isEmpty:true,
				currentPage:1,
				pageSize:3,
				list:[],
				status:'loadmore'
			}
		},
		onLoad(){
			this.getList(this.currentPage,this.pageSize)
		},
		onReachBottom(){
			if(this.status == 'nomore'){
				return
			}
			this.status = 'loading'
			this.getList(++this.currentPage,this.pageSize)
		},
		methods:{
			//获取定制页面
			getList(page,limit){
				this.$u.api.getNeedsList({
					page:page,
					limit:limit
				}).then(res=>{
					if(res.code == 200){
						if(res.total == 0){
							this.isEmpty = true
						}else{
							this.isEmpty = false
							// res.data.map(function(item){
							// 	this.list.push({
									
							// 	})
							// })
							
							this.list = this.list.concat(res.data)
							res.current_page >= res.last_page ? this.status = 'nomore':'loadmore'
						}
					}
				})
				
			},
			mbdz(){
				this.$u.route({
							url: '/packageA/pages/needs/mbdz',	
					})
			},
			logodz(){
				this.$u.route({
							url: '/packageA/pages/needs/logodz',	
					})
			},
			spdz(){
				this.$u.route({
							url: '/packageA/pages/needs/spdz',	
					})
			}
		}
	}
</script>

<style>
	page{
		background: rgb(246,246,246);

	}
	.wrap {
		margin: 0 auto;
	}
	.header{
		padding: 20rpx;
		background: #fff;
	}
	.item{
		width: 188rpx;
		height: 128rpx;
		margin-bottom: 35rpx;
		border-radius: 20rpx;
		background: #fff;
		box-shadow:0px 0px 16px 0px rgba(0,0,0,0.14);
	}
	.item_img{
		width: 55rpx;
		height: 55rpx;
		display: block;
		margin: 0 auto;
		padding-top: 20rpx;
		
	}
	.item p{
		margin-top: 5rpx;
		color: #393C4C;
		font-size: 26rpx;
		text-align: center;
	}
	.barTitle{
		margin:30rpx auto ;
		background: #fff;
	}
	.u-body-item {
			font-size: 32rpx;
			color: rgb(104,104,104);
			padding: 20rpx 10rpx;
	}
	.empty{
		background: #fff;
		margin-top: 20rpx;
		padding-top: 133rpx;
		height: 500rpx
	}
	.name{
		font-size: 32rpx;
	}
	.num{
		margin-top: 10rpx;
		font-size: 32rpx;
	}
	.email{
		margin-top: 10rpx;
		font-size: 32rpx;
	}
	
</style>
