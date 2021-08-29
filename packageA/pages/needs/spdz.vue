<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view class="labelTitle">时长</view>
							<view class="cell">
								<u-radio-group v-model="length" size="25">
									<u-radio name="30S-60S" label-size="25rpx">30S-60S</u-radio>
									<u-radio name="3min-5min" label-size="25rpx">3min-5min</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">分辨率/清晰度</view>
							<view class="cell">
								<u-radio-group size="25" v-model="resolving_power">
									<u-radio name="720p" label-size="25rpx">720p</u-radio>
									<u-radio name="1080p" label-size="25rpx">1080p</u-radio>
									<u-radio name="其他" label-size="25rpx">其他</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">尺寸</view>
							<view class="cell">
								<u-radio-group size="25" v-model="size">
									<u-radio name="1080*1920" label-size="25rpx">1080*1920</u-radio>
									<u-radio name="1920*1080" label-size="25rpx">1920*1080</u-radio>
									<u-radio name="其他" label-size="25rpx">其他</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">场景需求</view>
							<view class="cell">
								<u-radio-group size="25" v-model="scene">
									<u-radio name="高级" label-size="25rpx">高级</u-radio>
									<u-radio name="中级" label-size="25rpx">中级</u-radio>
									<u-radio name="无需要" label-size="25rpx">无需要</u-radio>
									<u-radio name="其他" label-size="25rpx">其他</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">服化道需求</view>
							<view class="cell">
								<u-radio-group size="25" v-model="clothing">
									<u-radio name="需要" label-size="25rpx">需要</u-radio>
									<u-radio name="不需要" label-size="25rpx">不需要</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">航拍需求</view>
							<view class="cell">
								<u-radio-group size="25" v-model="aerial_photograph">
									<u-radio name="需要" label-size="25rpx">需要</u-radio>
									<u-radio name="不需要" label-size="25rpx">不需要</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">演员质量</view>
							<view class="cell">
								<u-radio-group size="25" v-model="actor">
									<u-radio name="职业演员" label-size="25rpx">职业演员</u-radio>
									<u-radio name="非职业演员" label-size="25rpx">非职业演员</u-radio>
									<u-radio name="不需要" label-size="25rpx">不需要</u-radio>
								</u-radio-group>
							</view>
							<view class="mbdzsubmit">
								<u-button type="primary" shape="circle" @click="submit">提交</u-button>
								<view class="tips"><u-icon name="info-circle"  :custom-style="{'margin-right':'20rpx'}"  size="35"></u-icon>提交成功后会有专属客服与您联系</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view class="labelTitle">时长</view>
							<view class="cell">
								<u-radio-group size="25" v-model="length">
									<u-radio name="30S-60S" label-size="25rpx">30S-60S</u-radio>
									<u-radio name="1min-3min" label-size="25rpx">1min-3min</u-radio>
									<u-radio name="3min-5min" label-size="25rpx">3min-5min</u-radio>
									<u-radio name="其他" label-size="25rpx">其他</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">分辨率/清晰度</view>
							<view class="cell">
								<u-radio-group size="25" v-model="resolving_power">
									<u-radio name="720p" label-size="25rpx">720p</u-radio>
									<u-radio name="1080p" label-size="25rpx">1080p</u-radio>
									<u-radio name="其他" label-size="25rpx">其他</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">尺寸</view>
							<view class="cell">
								<u-radio-group size="25" v-model="size">
									<u-radio name="1080*1920" label-size="25rpx">1080*1920</u-radio>
									<u-radio name="1920*1080" label-size="25rpx">1920*1080</u-radio>
									<u-radio name="其他" label-size="25rpx">其他</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">演员需求</view>
							<view class="cell">
								<u-radio-group size="25" v-model="actor">
									<u-radio name="需要" label-size="25rpx">需要</u-radio>
									<u-radio name="不需要" label-size="25rpx">不需要</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">特定场景需求</view>
							<view class="cell">
								<u-radio-group size="25" v-model="scene">
									<u-radio name="需要" label-size="25rpx">需要</u-radio>
									<u-radio name="不需要" label-size="25rpx">不需要</u-radio>
								</u-radio-group>
							</view>
							<view class="mbdzsubmit">
								<u-button type="primary" shape="circle" @click="submit">提交</u-button>
								<view class="tips"><u-icon name="info-circle"  :custom-style="{'margin-right':'20rpx'}"  size="35"></u-icon>提交成功后会有专属客服与您联系</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view class="labelTitle">时长</view>
							<view class="cell">
								<u-radio-group size="25" v-model="length">
									<u-radio name="30S-60S" label-size="25rpx">30S-60S</u-radio>
									<u-radio name="3min-5min" label-size="25rpx">3min-5min</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">分辨率/清晰度</view>
							<view class="cell">
								<u-radio-group size="25" v-model="resolving_power">
									<u-radio name="720p" label-size="25rpx">720p</u-radio>
									<u-radio name="1080p" label-size="25rpx">1080p</u-radio>
									<u-radio name="其他" label-size="25rpx">其他</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">尺寸</view>
							<view class="cell">
								<u-radio-group size="25" v-model="size">
									<u-radio name="1080*1920" label-size="25rpx">1080*1920</u-radio>
									<u-radio name="1920*1080" label-size="25rpx">1920*1080</u-radio>
									<u-radio name="其他" label-size="25rpx">其他</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">演员质量</view>
							<view class="cell">
								<u-radio-group size="25" v-model="actor">
									<u-radio name="专业院校" label-size="25rpx">专业院校</u-radio>
									<u-radio name="职业演员" label-size="25rpx">职业演员</u-radio>
									<u-radio name="非职业演员" label-size="25rpx">非职业演员</u-radio>
									<u-radio name="不需要" label-size="25rpx">不需要</u-radio>
								</u-radio-group>
							</view>
							<view class="labelTitle">场景需求</view>
							<view class="cell">
								<u-radio-group size="25" v-model="scene">
									<u-radio name="高级" label-size="25rpx">高级</u-radio>
									<u-radio name="中级" label-size="25rpx">中级</u-radio>
									<u-radio name="无需要" label-size="25rpx">无需要</u-radio>
									<u-radio name="其他" label-size="25rpx">其他</u-radio>
								</u-radio-group>
							</view>
							<view class="mbdzsubmit">
								<u-button type="primary" shape="circle" @click="submit">提交</u-button>
								<view class="tips"><u-icon name="info-circle"  :custom-style="{'margin-right':'20rpx'}"  size="35"></u-icon>提交成功后会有专属客服与您联系</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
			<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list: [
					{
						name: '产品视频'
					},
					{
						name: '企业宣传片'
					},
					{
						name: '信息流视频'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				name:'视频定制',
				content:'产品视频',
				resolving_power:'',//视频分辨率（720p,1080p,）
				length:'', //视频时长
				size:'',//视频大小，
				actor:'',//演员需求
				aerial_photograph:'',//航拍要求
				scene:'', //场景要求
				clothing:'' //服化道要求
			}
		},
		methods:{
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				//console.log(index)
				this.content = this.list[index]['name']
				this.resolving_power = ''
				this.length = ''
				this.size = ''
				this.actor = ''
				this.aerial_photograph = ''
			    this.scene = ''
				this.clothing = ''
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			submit(){
				// console.log(this.name)
				// console.log(this.content)
				// console.log(this.resolving_power)
			 //    console.log(this.length)
				// console.log(this.size)
				// console.log(this.actor)
				// console.log(this.aerial_photograph)
				// console.log(this.scene)
				// console.log(this.clothing)
				this.$u.api.addCustom({
					name:this.name,
					content:this.content,
					resolving_power:this.resolving_power,
					length:this.length,
					size:this.size,
					actor:this.actor,
					aerial_photograph:this.aerial_photograph,
					scene:this.scene,
					clothing:this.clothing
				}).then(res=>{
					if(res.code == 200){
						let self = this
						this.$refs.uToast.show({
							title: res.message,
							position:'top',
							callback:function(){
								self.$u.route({
									type:'navigateBack'
								})
							}
						})
						
					}
					
				})
				
			}
		}
	}
</script>
<style>
	page{
		background: rgb(246,246,246);
	}
</style>
<style scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.labelTitle{
		height: 90rpx;
		line-height: 90rpx;
		padding-left: 30rpx;
		color: rgb(107,106,112);
	}
	.cell{
		background: #fff;
		margin: 0 30rpx 0 30rpx;
		padding:30rpx;
		border-radius: 20rpx;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.mbdzsubmit{
		margin: 152rpx 48rpx 0 48rpx;
	}
	.tips{
		margin-top: 28rpx;
		text-align: center;
		color: rgb(176,176,176);
	}
</style>
