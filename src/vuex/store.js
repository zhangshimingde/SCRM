import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const store = new Vuex.Store({
 // 定义状态
 state: {
 	area: '',
 	areaList:[],
	jfList:[],
	flName:"",
	KHGUIDs:""

	 
 },
 mutations:{
	 	setArea(state,val){
	 		val.map((el)=>{
	          state.areaList.push({key:el.AreaName,value:el.AreaName})
	        });
	        if (state.areaList.length>1) {
	          state.areaList.unshift({key:"全部区域",value:"全部区域"});
	        };
	        
	        state.area=state.areaList[0].key;
        },
        setJfList(state,val){
        	state.jfList=val
        }
	}
})

// 设置loading，主要是为了异步加载组件时的延时
store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
 
export default store