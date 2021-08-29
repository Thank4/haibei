<template>
	<view class="wrap">
		<u-form-item label-width="300rpx" label="手机号" >
			<u-input :value="vuex_user.phone" disabled type="number" @input="onInput" />
			<view slot="right" ><u-icon name="arrow-right"></u-icon></view><!-- @click="changePhone" -->
		</u-form-item>
		<u-form-item label-width="100rpx" label="密码">
			<u-input disabled  placeholder=" "/>
			<view slot="right" @click="changePassword">更换<u-icon name="arrow-right"></u-icon></view>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		methods: {
			changePhone(){
				this.$u.route({
							url: '/packageA/pages/account/changePhone',	
					})
			},
			changePassword(){
				this.$u.route({
							url: '/packageA/pages/account/changePassword',	
					})
			}
		}
	}
</script>

<style scoped>
	.wrap{
		margin: 100rpx 53rpx 0 61rpx;
	}
	
</style>
