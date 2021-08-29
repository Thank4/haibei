<template>
	<view class="wrap">
		<u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox 
						@change="checkboxChange" 
						v-model="item.checked" 
						v-for="(item, index) in list" :key="index" 
						:name="item.name"
					>{{item.name}}</u-checkbox>
		</u-checkbox-group>
		<view class="labelTitle">
		   添加标签
		</view>
		<view>
			<u-form-item prop="phone" label-position="top">
				<u-input v-model="form.phone" len="11" placeholder="输入标签名" />
				<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
						@change="codeChange" unique-key="page-login"></u-verification-code>
				<u-button size="mini" shape="circle" slot="right" type="default" @click="addtag">添加</u-button>
			</u-form-item>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list: [
						{
							name: '女装',
							checked: false,
							disabled: false
						},
						{
							name: '通知',
							checked: false,
							disabled: false
						},
						{
							name: '男装',
							checked: false,
							disabled: false
						}
					]
			}
		},
		methods:{
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log(e);
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			addtag(){
				this.list.push({
					name:'测试',
					checked:false,
					disabled:false
				})
			}
		}
	}
</script>

<style scoped>
	.wrap{
		margin: 20rpx 30rpx 30rpx 30rpx;
	}
	.labelTitle{
		margin-top: 30rpx;
	}
</style>
