// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)

let sendCodeUrl = '/sendCode' //发送验证码
let loginUrl = '/login'       //注册/登录
let passwordLoginUrl = '/passwordLogin' //账号/密码登录
let forgetUrl = '/forget' //忘记密码/更换密码
let getUserInfoUrl = '/getUserInfo' //获取个人信息
let getNeedsListUrl = '/custom'     //获取商户定制需求列表
let getTemplateTypeUrL = '/getTemplateTypeAll' //获取全部模板类型
let getTemplateUrl = '/getTemplate'  //根据模板类型id获取模板列表
let getAllCategoryUrl = '/getAllCategory' //获取该用户的一级，二级分类
let addCustomUrl = '/addCustom' //提交定制服务数据
let getFileAllUrl = '/getFileAll' //获取视频库视频列表
let getServicesUrl = '/getList' //获取域名服务商列表
let getSitesUrl = '/getSites' //获取全部站点
let domainInfoUrl = '/domainInfo' //绑定域名
let getIpAgentListUrl = '/getIpAgentList' //获取ip列表及ip下的平台
let addIpAgentUrl = '/addIpAgent' //新增ip
let updatePlatfromUrl = '/updatePlatfrom' //根据平台id修改ip
let addIpAgentOneUrl = 'addIpAgentOne' //新增单个平台账号
let upIpAgentUrl = '/upIpAgent' //修改ip
let codeUrl = '/code'  //通过微信登录获取openID
let updateFileUrl = '/updateFile' //保存上传视频
let upFilesUrl = '/upFiles'    //上传视频图片
let transUrl = '/trans'    //翻译接口
let shareUrl = '/share'     //一键分发
let getHotVideoUrl = '/getHotVideo' //获取热门视频
let getUserViewUrl ='/getUserView' //获取站点数据分析
let getAllSeCategoryUrl = '/getAllSeCategory' //获取用户的全部二级
let getVideoListUrl = '/getVideoList' //视频数据分析，根据分类id和platform 
let getVideoDataUrl = '/getVideoData' //根据视频id和平台获取数据分析
let setShareHistoryUrl = '/setShareHistory' //支付成功回调函数
let cancelPayUrl = '/cancelPay'      //支付失败回调函数
let getUserAllUrl = '/getUserAll'    //获取客户信息
let getBankListUrl = '/getBankList'  //获取银行卡列表
let setBankDataUrl = '/setBankData'  //设置银行卡
let getProfitDateUrl = '/getProfitDate' //我的钱包
let getInviterUrl = '/getInviter' //我的邀请
let getShareListUrl = '/getShareList' //我邀请的人
let isSetAliUrl = '/isSetAli'   //是否设置阿里国际站点
let setAliIdUrl = '/setAliId' //设置阿里国际站点
let updateAliIdUrl = '/updateAliId' //更新阿里国际站点
let getAliVideoListUrl = '/getAliVideoList' //获取国际站视频
let setIncomeUrl = '/setIncome' //申请提现
let getIncomeListUrl = '/getIncomeList' //提现记录 
let getProfitListUrl = '/getProfitList' //我的资产7天收益
let getMerPackageListUrl = '/getMerPackageList' //获取购买套餐包列表
let getPackageAllUrl = '/getPackageAll' //获取全部在售的套餐包
let getPackageInfoUrl = '/getPackageInfo' //根据套餐id获取套餐明细
let buyPackageUrl = '/buyPackage' //购买套餐包
let getVipLeftDayUrl ='/getVipLeftDay'//会员年费倒计时
let getShareDayListUrl = '/getShareDayList'  //获取每日用户分发条数列表
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	//获取验证码
	let sendCode = (params = {}) =>vm.$u.post(sendCodeUrl,params);
	//注册/登录
	let login = (params = {}) =>vm.$u.post(loginUrl,params);
	//账号密码登录/
	let passwordLogin = (params = {}) =>vm.$u.post(passwordLoginUrl,params);
	//更换密码
	let changePassword = (params = {}) =>vm.$u.post(forgetUrl,params);
	//获取个人信息
	let getUserInfo = (params = {}) =>vm.$u.get(getUserInfoUrl);
	//获取商户定制列表
	let getNeedsList =(params = {}) =>vm.$u.get(getNeedsListUrl,params) 
	//获取全部模板分类
	let getTemplateTypeAll =(params = {}) =>vm.$u.get(getTemplateTypeUrL,params) 
	//根据模板类型id获取模板列表
	let getTemplate = (params = {}) =>vm.$u.get(getTemplateUrl,params) 
	//获取用户的一二级分类
	let getAllCategory = (params = {}) =>vm.$u.get(getAllCategoryUrl,params) 
	//提交定制服务数据
	let addCustom = (params = {}) => vm.$u.post(addCustomUrl,params)
	//获取视频库列表
	let getVideosAll =  (params = {}) =>vm.$u.get(getFileAllUrl,params) 
	//获取域名服务商列表
	let getServices = (params = {}) =>vm.$u.get(getServicesUrl,params) 
	//获取全部站点
	let getSites = (params = {}) =>vm.$u.get(getSitesUrl,params) 
	//绑定域名
	let bindDomain = (params = {}) => vm.$u.post(domainInfoUrl,params)
	//获取ip列表及ip下的平台
	let getIpAgentList = (params = {}) =>vm.$u.get(getIpAgentListUrl,params) 
	//新增ip
	let addIpAgent = (params = {}) =>vm.$u.post(addIpAgentUrl,params) 
	//新增单个平台账号
	let addIpAgentOne= (params = {}) =>vm.$u.post(addIpAgentOneUrl,params) 
	//根据平台id修改ip
	let updatePlatfrom = (params = {}) =>vm.$u.post(updatePlatfromUrl,params) 
	//修改ip
	let upIpAgent = (params = {}) =>vm.$u.post(upIpAgentUrl,params) 
	//通过微信登录获取openID
	let getOpenId = (params = {}) =>vm.$u.post(codeUrl,params) 
	//保存上传视频
	let updateFile = (params = {}) =>vm.$u.post(updateFileUrl,params) 
	//上传视频图片
	let upload = (params = {}) =>vm.$u.post(upFilesUrl,params) 
	//翻译接口
	let trans = (params = {}) =>vm.$u.post(transUrl,params)
	//一键分发
	let share = (params = {}) =>vm.$u.post(shareUrl,params)
	//获取热门视频
	let getHotVideo = (params = {}) =>vm.$u.get(getHotVideoUrl,params)
	//获取站点数据分析
	let getUserView =  (params = {}) =>vm.$u.get(getUserViewUrl,params)
	//获取用户的全部二级
	let getAllSeCategory = (params = {}) =>vm.$u.get(getAllSeCategoryUrl,params)
	//视频数据分析，根据分类id和platform
	let getVideoList = (params = {}) =>vm.$u.get(getVideoListUrl,params)
	//根据视频id和平台获取数据分析
	let getVideoData = (params = {}) =>vm.$u.get(getVideoDataUrl,params) 
	//支付成功回调
	let setShareHistory = (params = {}) =>vm.$u.get(setShareHistoryUrl,params)
	//支付失败回调
	let cancelPay = (params = {}) =>vm.$u.post(cancelPayUrl,params)
	//获取客户信息
	let getUserAll = (params = {}) =>vm.$u.get(getUserAllUrl,params) 
	//获取银行卡列表
	let getBankList = (params = {}) =>vm.$u.get(getBankListUrl,params) 
	//设置银行卡
	let setBankData = (params = {}) =>vm.$u.post(setBankDataUrl,params) 
	//我的钱包
	let getProfitDate = (params = {}) =>vm.$u.get(getProfitDateUrl,params) 
	//我的邀请
	let getInviter = (params = {}) =>vm.$u.get(getInviterUrl,params) 
	//我邀请的人
	let getShareList = (params = {}) =>vm.$u.get(getShareListUrl,params) 
	//是否设置阿里国际站点
	let isSetAli = (params = {}) =>vm.$u.get(isSetAliUrl,params) 
	//设置阿里国际站点
	let setAliId = (params = {}) =>vm.$u.post(setAliIdUrl,params) 
	//更新阿里国际站点
	let updateAliId =  (params = {}) =>vm.$u.post(updateAliIdUrl,params) 
	//获取国际站视频
	let getAliVideoList = (params = {}) =>vm.$u.post(setAliIdUrl,params) 
	//申请提现
	let setIncome = (params = {}) =>vm.$u.post(setIncomeUrl,params) 
	//提现记录
	let getIncomeList = (params = {}) =>vm.$u.get(getIncomeListUrl,params) 
	 //我的资产7天收益
	let getProfitList = (params = {}) =>vm.$u.get(getProfitListUrl,params) 
	//获取已购套餐包列表
	let getMerPackageList = (params = {}) =>vm.$u.get(getMerPackageListUrl,params) 
	//获取全部在售套餐包列表
	let getPackageAll = (params = {}) =>vm.$u.get(getPackageAllUrl,params) 
	//根据ID查明细
	let getPackageInfo = (params = {}) =>vm.$u.get(getPackageInfoUrl,params) 
	//购买套餐包
	let buyPackage = (params = {}) =>vm.$u.post(buyPackageUrl,params) 
	//会员年费倒计时
	let getVipLeftDay = (params = {}) =>vm.$u.get(getVipLeftDayUrl,params) 
	//获取每日用户分发条数列表
	let getShareDayList =  (params = {}) =>vm.$u.get(getShareDayListUrl,params) 
	
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		sendCode,
		login,
		passwordLogin,
		changePassword,
		getUserInfo,
		getNeedsList,
		getTemplateTypeAll,
		getTemplate,
		getAllCategory,
		addCustom,
		getVideosAll,
		getServices,
		getSites,
		bindDomain,
		getIpAgentList,
		addIpAgent,
		upIpAgent,
		addIpAgentOne,
		updatePlatfrom,
		getOpenId,
		updateFile,
		upload,
		trans,
		share,
		getHotVideo,
		getUserView,
		getAllSeCategory,
		getVideoList,
		getVideoData,
		setShareHistory,
		cancelPay,
		getUserAll,
		getBankList,
		setBankData,
		getProfitDate,
		getInviter,
		getShareList,
		isSetAli,
		setAliId,
		updateAliId,
		getAliVideoList,
		setIncome,
		getIncomeList,
		getProfitList,
		getMerPackageList,
		getPackageAll,
		getPackageInfo,
		buyPackage,
		getVipLeftDay,
		getShareDayList
		};
}

export default {
	install
}