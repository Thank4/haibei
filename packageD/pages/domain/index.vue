<template>
	<view class="wrap">
		<view class="tab">
			<view class="u-tabs-box">
				<u-tabs-swiper ref="tabs" :list="list" active-color="#497CFF" :current="current" @change="change"
					:is-scroll="true" swiperWidth="750"></u-tabs-swiper>
			</view>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<view class="page-box">
						<view class="labelTitle">绑定流程</view>
						<u-time-line>
							<u-time-line-item nodeTop="2">
								<!-- 此处自定义了左边内容，用一个图标替代 -->
								<template v-slot:node>
									<view class="u-node">
										<!-- 此处为uView的icon组件 -->
										<u-icon name="../../../static/icon/timeline_icon.png" :size="40"></u-icon>
									</view>
								</template>
								<template v-slot:content>
									<view>
										<view class="u-order-title">第一步：选择服务器</view>
										<view class="u-order-desc">可以选择讲网然解析到国内服务器或者国外服务器（若你想了解服务器，请查询<view
												class="text-line">网处服务器/主机</view>）</view>
									</view>
								</template>
							</u-time-line-item>
							<u-time-line-item nodeTop="2">
								<!-- 此处自定义了左边内容，用一个图标替代 -->
								<template v-slot:node>
									<view class="u-node">
										<!-- 此处为uView的icon组件 -->
										<u-icon name="../../../static/icon/timeline_icon.png" :size="40"></u-icon>
									</view>
								</template>
								<template v-slot:content>
									<view>
										<view class="u-order-title">第二步：子域名解析</view>
										<view class="u-order-desc">
											<view>添加以下记录后，你的子域名(比如www.xxx.com)就可以正常访问。</view>
											<view>1、登录云解析DNS控制台。</view>
											<view>2、在“域名解析”页面下，点击相应的域名，进入其解析设置页面。</view>
											<view>3、点击“添加记录”按钮（以解析到国内服务器为例）;</view>
											<view>记录类型CNAME-将域名指向另一个域名</view>
											<view>主机记录：www</view>
											<view>解析线路：默认</view>
											<view>记 录 值：你的<view class="text-blue"> www域名</view>+<view class="text-blue">ssxidnscom</view></view>
											<view>例：www.xxxcomssxldnscom（请将<view class="text-blue">wwwxxxcom</view>更改为你的域名，然后再加入<view class="text-blue">.s.ssxidns.com</view>）</view>
											<view>TTL：默认</view>
											<view>4、点击“确定”</view>
										</view>
									</view>
								</template>
							</u-time-line-item>
							<u-time-line-item nodeTop="2">
								<!-- 此处自定义了左边内容，用一个图标替代 -->
								<template v-slot:node>
									<view class="u-node">
										<!-- 此处为uView的icon组件 -->
										<u-icon name="../../../static/icon/timeline_icon.png" :size="40"></u-icon>
									</view>
								</template>
								<template v-slot:content>
									<view>
										<view class="u-order-title">第三步：主机域名解析</view>
										<view class="u-order-desc">
											<view>1、添加以下记录后，你的主域名(比如xxxcom)就可以正常访问。</view>
											<view>2、同样的也是添加一条“CNAME”记录（以解析到国内服务器为例）。</view>
											<view>记录类型：选择CNAME</view>
											<view>主机记录：@</view>
											<view>解析线路：默认</view>
											<view>记 录 值：你的<view class="text-blue"> 主域名/根域名</view>+<view class="text-blue">ssxidns.com</view></view>
											<view>例：www.xxxcomssxldnscom（请将<view class="text-blue">xxxcom</view>更改为你的域名，然后再加入<view class="text-blue">.ssxidns.com</view>）</view>
											<view>TTL：默认</view>
											<view>4、点击“确定”</view>
										</view>
									</view>
								</template>
							</u-time-line-item>
							<u-time-line-item nodeTop="2">
								<!-- 此处自定义了左边内容，用一个图标替代 -->
								<template v-slot:node>
									<view class="u-node">
										<!-- 此处为uView的icon组件 -->
										<u-icon name="../../../static/icon/timeline_icon.png" :size="40"></u-icon>
									</view>
								</template>
								<template v-slot:content>
									<view>
										<view class="u-order-title">第四步：等待生效</view>
										<view class="u-order-desc">
											<view>好了，完成解析并保存后，就需要耐心等待解析生效（确认域名已完成实名认证）</view>
											<view>解析域名后需要几个小时，最长48小时完全生效。若网站还未完成ICP备案，则需要等待ICP备案完成后访客才能看到网站内容</view>
											<view>自定义域名网站点击上线后，网站可以立即发布，和上线了二级域名先审核才能发布不一样。不过带自定义域名的网站还是会被审核，请确认网站内容与备案信息一致，未完成或需要备案的网站请尽快完成备案。</view>
										</view>
									</view>
								</template>
							</u-time-line-item>
						</u-time-line>

					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<view class="page-box">
						<view class="labelTitle">选择账号</view>
						<view class="content">
							<u-row>
										<u-col span="6">
											<template v-if="aliyun.is_bind">
												<view class="item">
													<view class="item_img">
													<u-image width="73" height="45" src="../../../static/icon/aliyun_icon.png"></u-image>
													</view>
													<view class="text">阿里云</view>
													<view class="jb">
														<u-image width="46" height="45" src="../../../static/icon/lock_icon.png"></u-image>
													</view>
												</view>
											</template>
											<template v-else>
												<view class="item" @click="bindService('阿里云')">
													<view class="item_img">
													<u-image width="73" height="45" src="../../../static/icon/aliyun_icon.png"></u-image>
													</view>
													<view class="text">阿里云</view>
												</view>
											</template>
											
											
										</u-col>
										<u-col span="6">
											<template v-if="txcloud.is_bind">
												<view class="item">
													<view class="item_img" >
													<u-image width="69" height="50" src="../../../static/icon/txcloud_icon.png"></u-image>
													</view>
													<view class="text">腾讯云</view>
													<view class="jb">
														<u-image width="46" height="45" src="../../../static/icon/lock_icon.png"></u-image>
													</view>
												</view>
											</template>
											<template v-else>
												<view class="item" @click="bindService('腾讯云')">
													<view class="item_img" >
													<u-image width="69" height="50" src="../../../static/icon/txcloud_icon.png"></u-image>
													</view>
													<view class="text">腾讯云</view>
												</view>
											</template>
										
										</u-col>
							</u-row>
						</view>
					    
						<view class="labelTitle">
							已绑定账号
						</view>
						<view>
								<u-swipe-action :show="item.show" :index="index" 
									v-for="(item, index) in list2" :key="item.id" 
									@click="click" @open="open"
									disabled="true"
									:options="options"
								>
									<view class="cellItem u-border-bottom">
										<image mode="aspectFill" src="../../../static/icon/email_icon.png" />
										<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
										<view class="title-wrap">
											<text class="title u-line-2">{{ item.domain_name }}</text>
										</view>
										<view class="status">正常</view>
									</view>
								</u-swipe-action>
							</view>
					</view>
				</scroll-view>
			</swiper-item>
	
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '操作指引'
					},
					{
						name: '帮您绑定'
					}
				],
				aliyun:{
					is_bind:true,
				},
				txcloud:{
					is_bind:false
				},
				current: 1,
				swiperCurrent: 1,
				tabsHeight: 0,
				list2: [],   //cell 列表
				disabled: true,
				btnWidth: 180,
				show: false,
				options: [
					{
						text: '修改',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		onLoad(){
			this.getServicesList()
		},
		methods: {
			//获取服务商绑定情况
			//TODO
			getServicesList(){
				this.$u.api.getServices().then(res=>{
					if(res.code == 200){
						console.log(res.data)
						if(res.data.length>0){
							let self = this
							res.data.map(function(item){
								console.log('不为空')
								if(item.service == '阿里云'){
									self.aliyun.is_bind = true
								}else if(item.service == '腾讯云'){
									self.txcloud.is_bind = true
								}
							})
							self.list2 = res.data
							
							
							
						}else{
							this.aliyun.is_bind = false
							this.txcloud.is_bind = false
							console.log('空')
							
						}
						
					}
				})
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			//绑定服务
			bindService(name){
				console.log(name)
				this.$u.route({
								url: '/packageD/pages/domain/addaccount',
								params: {
									name: name
								}
							})
			}
		}
	}
</script>

<style scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.tab {
		width: 400rpx;
		margin: 40rpx auto;
	}

	.labelTitle {
		height: 90rpx;
		line-height: 90rpx;
		padding-left: 30rpx;
		color: rgb(107, 106, 112);
	}

	.cell {
		background: #fff;
		margin: 0 30rpx 0 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.mbdzsubmit {
		margin: 152rpx 48rpx 0 48rpx;
	}

	.tips {
		margin-top: 28rpx;
		text-align: center;
		color: rgb(176, 176, 176);
	}

	.page-box {
		margin: 0 50rpx 0;
	}

	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 30rpx;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 26rpx;
		margin: 6rpx 0 34rpx 0;
		line-height: 50rpx;
	}

	.text-line {
		color: rgb(53, 130, 237);
		text-decoration: underline;
		display: inline;
	}
	.text-blue{
		color: rgb(53, 130, 237);
		display: inline;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
	.item{
		background: rgb(241,245,254);
		width: 310rpx;
		height: 130rpx;
		border-radius: 15rpx;
		position: relative;
	}
	.item_img{
		display: inline-block;
		margin: 49rpx 33rpx 39rpx 59rpx;
	}
	.text{
		display: inline-block;
		vertical-align: top;
		margin-top: 49rpx;
	}
	.label{
		margin: 50rpx 0 37rpx 49rpx;
	}
	.labelTitle{
	}
	.content{
	}
	.jb{
		position: absolute;
		right: 0;
		bottom: 0;
	}
	image {
		width: 60rpx;
		flex: 0 0 60rpx;
		height: 60rpx;
		margin:35rpx 41rpx 35rpx 30rpx;
		border-radius: 12rpx;
	}
	.cellItem {
			display: flex;
			padding:0 20rpx;
		}
	.title-wrap{
			vertical-align: middle;
		}
	.title {
			text-align: left;
			display: inline-block;
			line-height: 120rpx;
			font-size: 28rpx;
			color: $u-content-color;
			
		}
	.status{
		position: absolute;
		right: 0;
		display: inline-block;
		line-height: 120rpx;
		vertical-align: middle;
	}
	
</style>
