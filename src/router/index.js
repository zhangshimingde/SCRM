import Vue from 'vue'
import VueRouter from 'vue-router'
// (全部采用异步组件加载的方式，优化首屏加载)
const cmwrap=resolve => require(['../components/common/cmwrap.vue'], resolve)
const noRight=resolve => require(['../components/noRight.vue'], resolve)
const test=resolve => require(['../components/test.vue'], resolve)
// 模块主页外层
const main=resolve => require(['../view/wrappage/main.vue'], resolve)
const addWrap=resolve => require(['../view/wrappage/addWrap.vue'], resolve)
const panelWrap=resolve => require(['../view/wrappage/panelWrap.vue'], resolve)
const searchwrap=resolve => require(['../view/wrappage/searchwrap.vue'], resolve)
// 主屏的几个页面(首屏要展示的页面)
const home=resolve => require(['../view/fullpage/main/home.vue'], resolve)
const panel=resolve => require(['../view/fullpage/main/panel.vue'], resolve)
const mine=resolve => require(['../view/fullpage/main/mine.vue'], resolve)
const login=resolve => require(['../view/fullpage/main/login.vue'], resolve)
// 全屏页面
const saleRank=resolve => require(['../view/fullpage/panelWrap/saleRank.vue'], resolve)
const getachive=resolve => require(['../view/fullpage/panelWrap/getachive.vue'], resolve)
const analysisachive=resolve => require(['../view/fullpage/panelWrap/analysisachive.vue'], resolve)
const analysiseffect=resolve => require(['../view/fullpage/panelWrap/analysiseffect.vue'], resolve)
const analysiserror=resolve => require(['../view/fullpage/panelWrap/analysiserror.vue'], resolve)
const analysissale=resolve => require(['../view/fullpage/panelWrap/analysissale.vue'], resolve)
const marketreport=resolve => require(['../view/fullpage/panelWrap/marketreport.vue'], resolve)

const msgListyj=resolve => require(['../view/fullpage/others/msgListyj.vue'], resolve)
const msgListtz=resolve => require(['../view/fullpage/others/msgListtz.vue'], resolve)
const msgListdb=resolve => require(['../view/fullpage/others/msgListdb.vue'], resolve)
const msgListsp=resolve => require(['../view/fullpage/others/msgListsp.vue'], resolve)

const search=resolve => require(['../components/search.vue'], resolve)
const searchmore=resolve => require(['../view/fullpage/others/searchmore.vue'], resolve)
const tab13x=resolve => require(['../components/marketreport/tab13x.vue'], resolve)
// 商机
const shangjiWrap=resolve => require(['../view/fullpage/menus/shangji/shangjiWrap.vue'], resolve)
const shangji=resolve => require(['../view/fullpage/menus/shangji/shangji.vue'], resolve)
// const shangjisearch=resolve => require(['../view/fullpage/menus/shangji/shangjisearch.vue'], resolve)
const shangjiadd=resolve => require(['../view/fullpage/menus/shangji/shangjiadd.vue'], resolve)
const shangjidetail=resolve => require(['../view/fullpage/menus/shangji/shangjidetail.vue'], resolve)

const shangjistage=resolve => require(['../view/fullpage/menus/shangji/shangjistage.vue'], resolve)
const shangjistagefwsj=resolve => require(['../view/fullpage/menus/shangji/shangjistageFwsj.vue'], resolve)
const shangjicontract=resolve => require(['../view/fullpage/menus/shangji/compo/contract.vue'], resolve)
const sjhetong=resolve => require(['../view/fullpage/menus/shangji/compo/sjhetong.vue'], resolve)
//竞争对手
const competitor=resolve => require(['../view/fullpage/menus/shangji/competitor.vue'], resolve)
const competitoradd=resolve => require(['../view/fullpage/menus/shangji/competitoradd.vue'], resolve)
const competitordetail=resolve => require(['../view/fullpage/menus/shangji/competitordetail.vue'], resolve)
// 线索
const xiansuoWrap=resolve => require(['../view/fullpage/menus/xiansuo/xiansuoWrap.vue'], resolve)
const xiansuo=resolve => require(['../view/fullpage/menus/xiansuo/xiansuo.vue'], resolve)
const xiansuoadd=resolve => require(['../view/fullpage/menus/xiansuo/xiansuoadd.vue'], resolve)
const xiansuodetail=resolve => require(['../view/fullpage/menus/xiansuo/xiansuodetail.vue'], resolve)
const toshangji=resolve => require(['../view/fullpage/menus/xiansuo/toshangji.vue'], resolve)
const changestatus=resolve => require(['../view/fullpage/menus/xiansuo/changestatus.vue'], resolve)



// 客户
const kehuWrap=resolve => require(['../view/fullpage/menus/kehu/kehuWrap.vue'], resolve)
const kehu=resolve => require(['../view/fullpage/menus/kehu/kehu.vue'], resolve)
const kehuadd=resolve => require(['../view/fullpage/menus/kehu/kehuadd.vue'], resolve)
const kehulist=resolve => require(['../view/fullpage/menus/kehu/kehulist.vue'], resolve)
const kehudetail=resolve => require(['../view/fullpage/menus/kehu/kehudetail.vue'], resolve)

const chanpinpanel=resolve => require(['../view/fullpage/menus/kehu/compo/chanpinpanel.vue'], resolve)
const chanpindetail=resolve => require(['../view/fullpage/menus/kehu/compo/chanpindetail.vue'], resolve)
const jiaofupanel=resolve => require(['../view/fullpage/menus/kehu/compo/jiaofupanel.vue'], resolve)
const jiaofudetail=resolve => require(['../view/fullpage/menus/kehu/compo/jiaofudetail.vue'], resolve)

const yunweipanel=resolve => require(['../view/fullpage/menus/kehu/compo/yunweipanel.vue'], resolve)

const khtree=resolve => require(['../view/fullpage/menus/kehu/compo/khtree.vue'], resolve)

const chaxunjieguo=resolve => require(['../view/fullpage/menus/kehu/chaxunjieguo.vue'], resolve)
// const searchmsg=resolve => require(['../view/fullpage/menus/kehu/searchmsg.vue'], resolve)

//工商信息
const gongshangmsg=resolve => require(['../view/fullpage/menus/kehu/gongshangmsg.vue'], resolve)


// 联系人
const lianxirenWrap=resolve => require(['../view/fullpage/menus/lianxiren/lianxirenWrap.vue'], resolve)
const lianxiren=resolve => require(['../view/fullpage/menus/lianxiren/lianxiren.vue'], resolve)
const lianxirenadd=resolve => require(['../view/fullpage/menus/lianxiren/lianxirenadd.vue'], resolve)
const sjaddlxr=resolve => require(['../view/fullpage/menus/lianxiren/sjaddlxr.vue'], resolve)
const lianxirendetail=resolve => require(['../view/fullpage/menus/lianxiren/lianxirendetail.vue'], resolve)
const jobrecord=resolve => require(['../view/fullpage/menus/lianxiren/jobrecord.vue'], resolve)
const marketactivity=resolve => require(['../view/fullpage/menus/lianxiren/marketactivity.vue'], resolve)
const actionrecord=resolve => require(['../view/fullpage/menus/lianxiren/actionrecord.vue'], resolve)


// 合同
const hetongpanel=resolve => require(['../view/fullpage/menus/hetong/hetongpanel.vue'], resolve)
const hetongdetail=resolve => require(['../view/fullpage/menus/hetong/hetongdetail.vue'], resolve)

// 我的
const cmtabwrap=resolve => require(['../view/fullpage/my/cmtabwrap.vue'], resolve)
const mingpianjia=resolve => require(['../view/fullpage/my/mingpianjia.vue'], resolve)

//开票申请
const openReceipt=resolve => require(['../components/receipt/openReceipt.vue'], resolve)

// 我的
const warnwrap=resolve => require(['../view/fullpage/warn/warnwrap.vue'], resolve)
const warnsj=resolve => require(['../view/fullpage/warn/warnsj.vue'], resolve)
const warnxs=resolve => require(['../view/fullpage/warn/warnxs.vue'], resolve)
const yjxs=resolve => require(['../view/fullpage/warn/yjxs.vue'], resolve)

Vue.use(VueRouter)

const routes = [
{path:'/test',component: test,name:'test',meta:{title:"test"}},
					{path:'/noRight',component: noRight,name:'noRight',meta:{title:"认证失败"}},
					{path:'/login',component: login,name:'login',meta:{title:"授权登录"}},
					{path:'/',component: main,redirect: { name: 'home' },name:'/',children:[
							{ path: 'home', name: 'home', component: home ,meta:{title:"SCRM",keepAlive: true}},
							{ path: 'panel', name: 'panel', component: panel ,meta:{title:"仪表盘",keepAlive: true}},
							{ path: 'mine', name: 'mine', component: mine ,meta:{title:"我的",keepAlive: true}}
						]
          },


          // 异常预警穿透
          {path:'/warnwrap',component: warnwrap,name:'warnwrap',children:[
              {path:'warnsj/:title/:type/:id',component: warnsj,name:'warnsj',meta:{title:""}},
              {path:'warnxs/:title/:type/:id',component: warnxs,name:'warnxs',meta:{title:""}},
              {path:'yjxs/:type',component: yjxs,name:'yjxs',meta:{title:"线索预警"}},
            ]
          },


					{path:'/panelWrap',component: panelWrap,name:'panelWrap',redirect: { name: 'saleRank' },children:[
							{ path: 'saleRank', name: 'saleRank', component: saleRank ,meta:{title:"销售排行"}},
							{ path: 'getachive', name: 'getachive', component: getachive ,meta:{title:"业绩达成"}},
							{ path: 'analysisachive', name: 'analysisachive', component: analysisachive ,meta:{title:"业绩分析"}},
							{ path: 'analysiseffect', name: 'analysiseffect', component: analysiseffect ,meta:{title:"营销效能分析"}},
							{ path: 'analysiserror', name: 'analysiserror', component: analysiserror ,meta:{title:"异常分析"}},
							{ path: 'analysissale', name: 'analysissale', component: analysissale ,meta:{title:"销售分析"}},
							{ path: 'marketreport', name: 'marketreport', component: marketreport ,meta:{title:"市场报表"}}
						]
					},

					{path:'/msgList',component: cmwrap,redirect: { name: 'msgListyj' },name:'cmwrap',children:[
							{path:'msgListyj',component: msgListyj,name:'msgListyj',meta:{title:"预警"}},
							{path:'msgListtz',component: msgListtz,name:'msgListtz',meta:{title:"通知"}},
							{path:'msgListdb',component: msgListdb,name:'msgListdb',meta:{title:"待办"}},
							{path:'msgListsp',component: msgListsp,name:'msgListsp',meta:{title:"审批"}},
						]
					},

					{path:'/tab13x/:type/:year/:area',component: tab13x,name:'tab13x',meta:{title:"市场报表"}},
					{path:'/searchwrap',component: searchwrap,redirect: { name: 'searchmore' },name:'searchwrap',children:[
							{path:'searchmore/:type/:key',component: searchmore,name:'searchmore',meta:{title:""}},
							{path:'search',component: search,name:'search',meta:{title:"搜索"}},
						]
					},

					//开票申请
					{path:'/openReceipt',component: openReceipt,name:'openReceipt',meta:{title:"开票申请"}},


					//新建客户，线索
					{path:'/addWrap',component: addWrap,name:'addWrap',children:[
							{path:'/kehuadd',component: kehuadd,name:'kehuadd',meta:{title:"新建客户",keepAlive: false}},
							{path:'/xiansuoadd/:lxrId?',component: xiansuoadd,name:'xiansuoadd',meta:{title:"添加线索",keepAlive: true}}
						]
					},


					{path:'/kehuWrap',component: kehuWrap,name:'kehuWrap',children:[
							{path:'kehu', name: 'kehu', component: kehu ,meta:{title:"客户",keepAlive: true}},
							{path:'khtree/:id',component: khtree,name:'khtree',meta:{title:"公司层级",keepAlive: false}},
							{path:'kehudetail/:id',component: kehudetail,name:'kehudetail',meta:{title:"客户详情",keepAlive: false}},
							{path:'khchanpinpanel/:id',component: chanpinpanel,name:'khchanpinpanel',meta:{title:"产品信息",keepAlive: false}},
							{path:'khchanpindetail/:id',component: chanpindetail,name:'khchanpindetail',meta:{title:"产品详情",keepAlive: false}},
							{path:'khjiaofupanel/:id',component: jiaofupanel,name:'khjiaofupanel',meta:{title:"交付信息",keepAlive: false}},
							{path:'jiaofudetail/:id',component: jiaofudetail,name:'jiaofudetail',meta:{title:"交付详情",keepAlive: false}},
							{path:'yunweipanel/:id',component: yunweipanel,name:'yunweipanel',meta:{title:"运维服务",keepAlive: false}}
						]
					},
					// {path:'/kehuadd',component: kehuadd,name:'kehuadd',meta:{title:"新建客户",keepAlive: false}},
					{path:'/gongshangmsg/:FullName/:id',component: gongshangmsg,name:'gongshangmsg',meta:{title:"工商信息",keepAlive: false}},


					{path:'/shangjiWrap',component: shangjiWrap,name:'shangjiWrap',children:[
							{path:'shangji/:type?/:id?',component: shangji,name:'shangji',meta:{title:"商机",keepAlive: true}},
							{path:'shangjidetail/:id/:sptype?',component: shangjidetail,name:'shangjidetail',meta:{title:"商机详情",keepAlive: false}},
							{path:'sjhetong/:id',component: sjhetong,name:'sjhetong',meta:{title:"合同",keepAlive: false}},
							{path:'shangjistage/:id/:company/:oppType',component: shangjistage,name:'shangjistage',meta:{title:"修改商机阶段",keepAlive: false}},
							{path:'shangjistagefwsj/:id/:company/:oppType',component: shangjistagefwsj,name:'shangjistagefwsj',meta:{title:"修改商机阶段",keepAlive: false}},
							{path:'shangjicontract/:id',component: shangjicontract,name:'shangjicontract',meta:{title:"关联合同",keepAlive: false}},
							{path:'competitor/:id',component: competitor,name:'competitor',meta:{title:"竞争对手",keepAlive: false}},
							{path:'competitoradd/:id',component: competitoradd,name:'competitoradd',meta:{title:"添加竞争对手",keepAlive: false}},
							{path:'competitordetail/',component: competitordetail,name:'competitordetail',meta:{title:"竞争对手",keepAlive: false}},
						]
					},
					{path:'/shangjiadd/:type?/:id?',component: shangjiadd,name:'shangjiadd',meta:{title:"添加商机",keepAlive: false}},

					{path:'/xiansuoWrap',component: xiansuoWrap,name:'xiansuoWrap',children:[
							{path:'xiansuo/:type?/:id?/:phone?',component: xiansuo,name:'xiansuo',meta:{title:"线索",keepAlive: true}},
							{path:'xiansuodetail/:id/',component: xiansuodetail,name:'xiansuodetail',meta:{title:"线索详情",keepAlive: false}},
							{path:'toshangji/:id/',component: toshangji,name:'toshangji',meta:{title:"转商机",keepAlive: false}},
							{path:'changestatus/:id/:type',component: changestatus,name:'changestatus',meta:{title:"状态变更",keepAlive: false}},
						]
					},
					// {path:'/xiansuoadd',component: xiansuoadd,name:'xiansuoadd',meta:{title:"添加线索",keepAlive: false}},


					{path:'/lianxirenWrap',component: lianxirenWrap,name:'lianxirenWrap',children:[
							{path:'lianxiren/:type?/:id?',component: lianxiren,name:'lianxiren',meta:{title:"联系人",keepAlive: true}},
							{path:'lianxirendetail/:id',component: lianxirendetail,name:'lianxirendetail',meta:{title:"联系人详情",keepAlive: false}},
							{path:'jobrecord/:id',component: jobrecord,name:'jobrecord',meta:{title:"任职履历",keepAlive: false}},
							{path:'marketactivity/:id',component: marketactivity,name:'marketactivity',meta:{title:"市场活动",keepAlive: false}},
							{path:'actionrecord/:id',component: actionrecord,name:'actionrecord',meta:{title:"行为轨迹",keepAlive: false}},
							{path:'sjaddlxr/:scan/:id/:roleType?',component: sjaddlxr,name:'sjaddlxr',meta:{title:"添加联系人",keepAlive: false}},
						]
					},
					{path:'/lianxirenadd/:scan/:type?/:id?',component: lianxirenadd,name:'lianxirenadd',meta:{title:"添加联系人",keepAlive: false}},





					{path:'/hetongWrap',component: cmwrap,name:'hetongWrap',children:[
							{path:'khhetongpanel/:id/:type?',component: hetongpanel,name:'khhetongpanel',meta:{title:"合同信息",keepAlive: false}},
							{path:'khhetongdetail/:id',component: hetongdetail,name:'khhetongdetail',meta:{title:"合同详情",keepAlive: false}},
						]
					},

					// 我的 关注、最近浏览
					{path:'/cmtabwrap/:type',component: cmtabwrap,name:'cmtabwrap',meta:{title:"我的",keepAlive: false}},

					//我的 名片夹
					{path:'/mingpianjia',component: mingpianjia,name:'mingpianjia',meta:{title:"名片夹",keepAlive: false}},
				]



export default new VueRouter({ routes: routes,linkActiveClass:'link-active'})
