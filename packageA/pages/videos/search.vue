<template>
	<view>
		<u-navbar>
			<view class="search-wrap">
				<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
				<u-search v-model="keyword" placeholder="输入关键词"  :show-action="showAction" height="68" :action-style="{color: '#fff'}"></u-search>
			</view>
		</u-navbar>
		<view class="labelTitle">
			<u-cell-group :border="false">
				<u-cell-item title="历史搜索" hover-class="none" :border-bottom="false" :title-style="{'margin-left':'45rpx','font-size':'30rpx','font-weight':'bold'}" :arrow="false">
					<u-icon slot="right-icon" name="../../../static/icon/clear_icon.png" size="50"></u-icon>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="list">
			<view class="item">笔记本</view>
			<view class="item">电脑</view>
			<view class="item">口红</view>
			<view class="item">测试测试</view>
			<view class="item">电脑</view>
			<view class="item">口红</view>
		</view>

	</view>
</template>

<script>
</script>

<style scoped>
	.labelTitle{
		margin-top: 90rpx;
	}
	.list{
		margin:0 40rpx 0; 
	}
	.item{
		display: inline-block;
		margin: 20rpx 20rpx 20rpx 0;
		padding:15rpx  35rpx;
		border-radius: 50rpx;
		background:rgb(243,243,243);
	}
</style>
