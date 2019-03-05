import Vue from 'vue'
import App from './App'
import route from './router/index'
import axios from 'axios'
import echarts from 'echarts'
import Vuex from 'vuex'
// import Jq from 'jquery'
import 'babel-polyfill'
import wechat from 'weixin-js-sdk'
import store from './vuex/store'
import './assets/less/common.less'
import './assets/less/app.less'
import * as cmJs from './assets/js/commonJs'
import { AlertPlugin } from 'vux'
import { ToastPlugin } from 'vux'
import { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(MintUI)
Vue.use(Vuex)
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$wx = wechat;
// console.log(window.location.href);
// Vue.prototype.$url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfe3aa6c1dd22f053&redirect_uri=" + encodeURIComponent(window.location.href.split('#')[0]) + "&response_type=code&scope=snsapi_base&state=Receivables#wechat_redirect#" + window.location.href.split('#')[1];
Vue.prototype.$url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfe3aa6c1dd22f053&redirect_uri=" + encodeURIComponent(window.location.href) + "&response_type=code&scope=snsapi_base&state=Receivables#wechat_redirect";

Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
// Vue.prototype.$ = Jq;
Vue.prototype.$cmJs = cmJs;
Vue.prototype.$cmBus = new Vue();

import 'element-ui/lib/theme-chalk/index.css'
import { Tree, Button } from 'element-ui'
Vue.use(Tree)
Vue.use(Button)


// 设置默认的token，开发模式下使用
// localStorage.setItem("token", "default");
// // axios.defaults.baseURL = 'http://cc.mingyuanyun.test:9527';  //超哥主机
//  axios.defaults.baseURL = "http://10.5.99.33:8012"; //开发环境 ,陈锐
// 测试环境
// axios.defaults.baseURL = 'http://apitest.mingyuanyun.com:8018';
// 正式环境环境
axios.defaults.baseURL = 'https://api.mingyuanyun.com';


Vue.prototype.$http.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    console.log(err)
    return Promise.reject(err);
  });

// 这里拦截401错误，重新跳入登页重新获取token
// 设置请求超时
axios.defaults.timeout = 60000;
// end

axios.interceptors.response.use(
  response => {
    if (!response.data.Success) {
      if (response.data.Message.indexOf("身份失效") > -1) {  //token过期
        localStorage.removeItem("token");
        // 删掉url中的code等参数，并且重新刷新本页面
        var temp = window.location.href;
        if (temp.split('?')[1]) {
          var deStr = "?" + temp.split('?')[1].split('#')[0];
          window.location.href = temp.replace(deStr, "");
        } else {
          window.location.reload(true);
        }

        return;
      }
      else {  //接口失败
        // response.data.Data=null;
        // console.log(response.data.Data)
        Vue.$vux.alert.show({
          title: '友情提示',
          content: response.data.Message
        })
        return response.data;
      }
    }
    return response.data;
  },
  error => {
    // 设置请求超时反馈信息
    var originalRequest = error.config;  //保存本次请求的信息
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest.retry) { //如果是请求超时
      // console.log(originalRequest);
      Vue.$vux.toast.show({
        type: "text",
        text: '请求超时！',
        time: 1000
      })
      return null;
      // 重新发起本次请求
      // originalRequest.retry = true;
      // return axios.request(originalRequest);
    } else {
      return Promise.reject(error.response)
    }

  });

// 判断身份是否登录
if (window.location.href.match(/code=(\S*)&state/g)) {
  if (localStorage.getItem("token")) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
  } else {
    var str = window.location.href.match(/code=(\S*)&state/g)[0];
    Vue.prototype.$code = str.replace("code=", "").replace("&state", "");
    Vue.prototype.$cmJs.getToken(Vue.prototype, function () {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
      // window.location.reload(true);
    });
  }
} else {
<<<<<<< Updated upstream

  // 外部系统调用的页面排除掉，不走身份验证，给默认的token
  if(window.location.href.indexOf('outSystem')>-1){
    localStorage.setItem("token", "default");
  }
  // end

=======
>>>>>>> Stashed changes
  if (localStorage.getItem("token")) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
  } else {
    window.location.href = Vue.prototype.$url;
  }

}


route.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', { isLoading: true });

  if (to.name == "noRight") { //无权限页面直接跳转
    next();
    return;
  }
  var timer2 = setInterval(function () {
    if (localStorage.getItem("token")) {
      clearInterval(timer2);
      // next();

      setTimeout(function () {
        store.commit('updateLoadingStatus', { isLoading: false })
      }, 300)
      //商机/客户/联系人/线索详情页面跳转时拦截已经被删除的数据
      if(to.name=='kehudetail'||to.name=='shangjidetail'||to.name=='xiansuodetail'||to.name=='lianxirendetail'){ //详情页面找不到对应的id数据,跳到无数据页面
        let type=to.name.replace('detail','');
        let typemodule,typeName;
        switch(to.name){
          case 'kehudetail':typemodule=4;typeName='客户';break;
          case 'shangjidetail':typemodule=2;typeName='商机';break;
          case 'xiansuodetail':typemodule=1;typeName='线索';break;
          case 'lianxirendetail':typemodule=3;typeName='联系人';break;
        }
        axios.post("/api/EnergizaSaleKHInfoController/PrimaryKeyVerification",{
          GUID:to.params.id,
          TYPE:typemodule  //(1：线索、2：商机、3：联系人、4：客户)
        })
        .then(response=>{
          if(response.Message=='datanotfound'&&!response.Success){
              Vue.$vux.alert.show({
                title: '友情提示',
                content: `此条${typeName}数据不存在或已被删除！`,
                onHide(){
                  route.push({name:from.name});
                }
              })
          }else{
            next();
          }
        })
      }else{
        next();
      }
      // end

    }
  }, 10)

})

route.afterEach(function (to) {
  document.title = to.meta.title;

  if (to.name == "home" || to.name == "panel") {
    // 返回首页、仪表盘首页之后，清除缓存的最近搜索
    localStorage.removeItem("lastSearchRes");
    localStorage.removeItem("lastSearchKey");
    // end
  }
  setTimeout(function () {
    store.commit('updateLoadingStatus', { isLoading: false })
  }, 10)
})

// 处理点击延时
const FastClick = require('fastclick')
FastClick.attach(document.body)


// 历史搜索
if (!localStorage.getItem("history")) {
  localStorage.setItem("history", "");
}

new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App },
  router: route
})
