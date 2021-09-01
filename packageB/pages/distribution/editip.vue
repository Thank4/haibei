<template>
	<view>
		<view class="labelTitle">
		      <text lines="1" class="info1">选择IP地址</text>
		</view>
		<u-cell-group :border="false">
				<u-cell-item title="地址" :value="area" :border-bottom="false" hover-class @click="show = true"></u-cell-item>
		</u-cell-group>
		<view class="labelTitle">选择要发布的平台</view>
		<view class="list">
		<u-collapse :item-style="itemStyle" @change="setStyle">
			<!--  Youtube begin-->
			<template v-if="platform[0].status == 1">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Youtube</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未分发过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[0].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[0].account,'Youtube')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-else-if="platform[0].status == ''">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Youtube</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未设置
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[0].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[0].account,'Youtube')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[0].status == '2'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Youtube</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[0].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[0].account,'Youtube')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[0].status == '3'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Youtube</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								已通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[0].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[0].status == '4'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Youtube</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								ip被封
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[0].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>
			
			
			<!--  Youtube end-->
			
			<!--  facebook begin -->
			<template v-if="platform[1].status == 1">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> facebook</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未分发过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[1].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[1].account,'facebook')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-else-if="platform[1].status == ''">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> facebook</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未设置
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[1].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[1].account,'facebook')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[1].status == '2'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> facebook</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[1].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[1].account,'facebook')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[1].status == '3'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> facebook</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								已通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[1].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[1].status == '4'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> facebook</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								ip被封
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[1].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>		
			<!--  facebook end -->
			
			<!--  Twitter begin -->
			
			<template v-if="platform[2].status == 1">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> twitter</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未分发过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[2].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[2].account,'twitter')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-else-if="platform[2].status == ''">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> twitter</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未设置
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[2].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[2].account,'twitter')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[2].status == '2'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> twitter</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[2].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[2].account,'twitter')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[2].status == '3'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> twitter</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								已通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[2].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[2].status == '4'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> twitter</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								ip被封
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[2].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>	
			
			<!--  Twitter end -->
			
			<!--  Pinterst begin -->
			<template v-if="platform[3].status == 1">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> pinterest</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未分发过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[3].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[3].account,'pinterest')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-else-if="platform[3].status == ''">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> pinterest</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未设置
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[3].account" placeholder="请输入账号" height="100" />
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[3].account,'pinterest')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[3].status == '2'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> pinterest</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[3].account" placeholder="请输入账号" height="100" disabled="true"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[3].account,'pinterest')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[3].status == '3'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> pinterest</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								已通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[3].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[3].status == '4'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> pinterest</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								ip被封
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[3].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>	
			
			</u-collapse-item>
			<!--  Pinterst end -->
			
			<!--  Linkedin begin -->
			<template v-if="platform[4].status == 1">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> linkedin</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未分发过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[4].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[4].account,'linkedin')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-else-if="platform[4].status == ''">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> linkedin</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未设置
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[4].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[4].account,'linkedin')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[4].status == '2'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> linkedin</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[4].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[4].account,'linkedin')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[4].status == '3'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> linkedin</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								已通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[4].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[4].status == '4'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> linkedin</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								ip被封
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[4].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>	
			</u-collapse-item>
			
			
			<!--  Linkedin end -->
			
			<!--  Vimeo begin -->
			
			<template v-if="platform[5].status == 1">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> vimeo</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未分发过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[5].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[5].account,'vimeo')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-else-if="platform[5].status == ''">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> vimeo</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未设置
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[5].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[5].account,'vimeo')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[5].status == '2'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> vimeo</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[5].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[5].account,'vimeo')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[5].status == '3'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> vimeo</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								已通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[5].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[5].status == '4'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> vimeo</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								ip被封
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[5].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>	
			</u-collapse-item>
			
			
			<!--  Vimeo end -->
			
			<!--  Tiktok begin -->
			
			<template v-if="platform[6].status == 1">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> tiktok</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未分发过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[6].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[6].account,'tiktok')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-else-if="platform[6].status == ''">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> tiktok</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未设置
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[6].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[6].account,'tiktok')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[6].status == '2'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> tiktok</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[6].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[6].account,'tiktok')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[6].status == '3'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> tiktok</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								已通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[6].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[5].status == '4'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> tiktok</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								ip被封
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[6].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>	
			</u-collapse-item>
			
			<!--  Tiktok end -->
			
			<!--  Veoh begin -->
			
			<template v-if="platform[7].status == 1">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> veoh</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未分发过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[7].account" placeholder="请输入账号" height="100"/>
				</view>
				</u-collapse-item>
			</template>
			<template v-else-if="platform[7].status == ''">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> veoh</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未设置
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[7].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[7].account,'veoh')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[7].status == '2'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> veoh</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								未通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[7].account" placeholder="请输入账号" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="editAccount(platform[7].account,'veoh')">修改</u-button></view>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[7].status == '3'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> veoh</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								已通过
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[7].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>
			<template v-if="platform[5].status == '4'">
				<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> veoh</view>
						<view class="cellRight">
							<u-button shape="circle" :custom-style="reviewBtn">
								ip被封
							</u-button>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[7].account" placeholder="请输入账号" height="100" disabled="true"/>
				</view>
				</u-collapse-item>
			</template>	
			</u-collapse-item>
			<!--  Veoh end -->
		</u-collapse>
	    </view>
		<view class="submit">
			<u-button type="primary" shape="circle" @click="updateIp">确定</u-button>
		</view>
		
		<u-action-sheet :list="pricesList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				reviewBtn:{
					width:'111rpx',
					height:'45rpx',
					padding:'23rpx 50rpx 25rpx 50rpx',
					background:'rgb(217,233,253)',
					fontSize:'22rpx',
					color:'#4293F4',
					marginRight:'20rpx'
				},
				confirmBtn:{
					width:'140rpx',
					height:'50rpx',
				},
				index:0,
				platform:[
					{
						id:0,
						name:"YouTube",
						account:'',
						password:''
					},
					{
						id:0,
						name:"facebook",
						account:'',
						password:''
					},
					{
						id:0,
						name:"Twitter",
						account:'',
						password:''
					},
					{
						id:0,
						name:"pinterest",
						account:'',
						password:''
					},
					{
						id:0,
						name:"linkedin",
						account:'',
						password:''
					},
					{
						id:0,
						name:"vimeo",
						account:'',
						password:''
					},
					{
						id:0,
						name:"tiktok",
						account:'',
						password:''
					},
					{
						id:0,
						name:"veoh",
						account:'',
						password:''
					},
				],
				area:'',
				status:'',
				ip_id:'',
				price:'',
				pricesList:[], //地区及价格列表
				show:false,
				
			}
		},
		onLoad(data){
			this.index = data.index
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getIpAgentList().then(res => {
					console.log(res)
					if(res.code == 200){
						
						
						console.log(res.data.ip_agent[this.index])
						this.area = res.data.ip_agent[this.index]['area']
						this.status = res.data.ip_agent[this.index]['status']
						console.log('这个ip的状态'+this.status)
						this.ip_id = res.data.ip_agent[this.index]['id']
						this.price = res.data.ip_agent[this.index]['price']
						
						let self = this
						for(let i in res.data.ip_arr){
							console.log(this.area+'aaaaaaaaaaaaaaaa')
							if(res.data.ip_arr[i]['area'] == self.area){
								self.ip_code = res.data.ip_arr[i]['name']
							}
							self.pricesList.push({
								name:res.data.ip_arr[i]['name'],
								price:res.data.ip_arr[i]['price'],
								area:res.data.ip_arr[i]['area'],
								text:res.data.ip_arr[i]['area'],
								subText:res.data.ip_arr[i]['price'],
							})
							
						}
						
						
						for(let i in res.data.ip_agent[this.index]['platform']){
							//console.log(res.data.ip_agent[this.index]['platform'][i])
							let self = this
							this.platform.map(function(item,index){
								if(item.name == res.data.ip_agent[self.index]['platform'][i]['name']){
									console.log(res.data.ip_agent[self.index]['platform'][i]['id'])
									self.platform[index]['id'] = res.data.ip_agent[self.index]['platform'][i]['id'];
									self.platform[index]['account'] = res.data.ip_agent[self.index]['platform'][i]['account'];
									self.platform[index]['status'] = res.data.ip_agent[self.index]['platform'][i]['status'];
								}
							})
						}
					
					}
				})
			},
			actionSheetCallback(index) {	
				this.area = this.pricesList[index].text
				this.ip_code = this.pricesList[index].name
				console.log(this.area)
				console.log(this.ip_code)
			},
			editAccount(account,name){
				let self = this
				this.$u.api.addIpAgentOne({
					'account':account,
					'ip_id':this.ip_id,
					'platform':name
				}).then(res => {
					if(res.code ==200 ){
						self.$refs.uToast.show({
						title: '提交成功，等待审核',
					})
					}
				})
				console.log(this.ip_id)
				console.log(account)
				console.log(name)
			},
			setStyle(value){ 
				console.log(value)
			},
			updateIp(){
				console.log('修改')
				if(!this.area){
					this.$refs.uToast.show({
						title: '请选择区域',
					})
					return
				}
				console.log(this.platform)
				this.$u.api.upIpAgent({
					ip_id:this.ip_id,
					area:this.ip_code,
					platform:JSON.stringify(this.platform)
				}).then(res =>{
					if(res.code == 200){
						this.$refs.uToast.show({
							title: res.message,
							position:'top',
							back:true
						})	
					}
				})
			
				
			}
		}
	}
</script>

<style>
	page{
		
	}
</style>
<style scoped>
	.labelTitle {
	  height: 64rpx;
	  width: 750rpx;
	  justify-content: flex-end;
	  align-items: flex-start;
	  display: flex;
	  flex-direction: column;
	  padding: 0 0 8rpx 32rpx;
	}
	.info1 {
	  z-index: 53;
	  width: 138rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(187,187,187,1);
	  font-size: 28rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}

	.list{
		margin: 33rpx 46rpx 0 45rpx;
		background: rgb(246,246,248);
	}
	.cellIcon{
		float: left;
		margin-left: 33rpx;
		
	}
	.cellTitle{
		float: left;
		vertical-align: top;
		margin-left: 40rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
	.cellRight{
		position: absolute;
		right: 0;
	}
	.collapse-content{
		background: #FFFFFF;
		padding-left: 10rpx;
	}
	.confirmBtn{
		margin: 27rpx auto 27rpx;
	}
	.ipTitle{
		margin: 50rpx 0 20rpx 40rpx;
		font-size: 28rpx;
		color: #393C4C;
	}
	.choose{
		margin: 0 45rpx 0 45rpx;
		background-color: rgb(246,246,248);
	}
	.submit{
		margin: 152rpx 48rpx 0 48rpx;
	}
</style>
