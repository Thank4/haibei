<template>
	<view class="wrap">
		<view class="swiper">
			<u-swiper mode="round" :list="list" :height="876" img-mode="widthFix"></u-swiper>
		</view>
		<view class="invitation"  @click="myInvitation">我邀请的人 >></view>
		<view class="btnGroup">
			<u-button type="primary" shape="circle" :customStyle="copyBtn">复制邀请链接</u-button>
			<u-button type="primary" shape="circle" :customStyle="shareBtn" open-type="share">分享邀请</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list: [],
				copyBtn:{
					width:'316rpx',
					background:'none',
					border:'1px solid #428BF4',
					height:'100rpx',
					lineHeight:'100rpx',
					color:'#428BF4',
					margin:'0 26rpx 0 50rpx',
					display:'inline-block'
				},
				shareBtn:{
					width:'316rpx',
					height:'100rpx',
					lineHeight:'100rpx',
					display:'inline-block'
				},
				data:{}
			}
		},
		onLoad(){
			this.init()
		},
		onShareAppMessage(){
			return {
			      title: '海贝，让内容传播无国界',
			      path: '/packageA/pages/login/login?mer_id='+this.vuex_user.id,
				  imageUrl:'https://static.seabeek.cn/weapp/share.png',
				  bgImgUrl:'https://static.seabeek.cn/weapp/share.png'
			    }
		},
	    methods:{
			init(){
				this.$u.api.getInviter().then(res =>{
					this.data = res.data
					this.list = [{
						image:res.data.share_poster
					}] 
					
				})
			},
			myInvitation(){
				this.$u.route({
							url: '/packageE/pages/invitation/index'	
					})
			}
		}  
	}
</script>

<style>
	page{
		background: #000000;
	}
	.swiper{
		margin: 138rpx 144rpx 0;
	}
	.invitation{
		color:#FFFFFF;
		text-align: center;
		font-size:32rpx;
		margin-top:72rpx ;
	}
	.btnGroup{
		margin-top: 88rpx;
	}
</style>
