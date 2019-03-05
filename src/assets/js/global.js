import Vue from 'vue'

import { AlertPlugin } from 'vux'
import { ToastPlugin } from 'vux'
import { LoadingPlugin } from 'vux'
import { ConfirmPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
class wxSDK {
  static async getConcatReady(type,id,chatName,defaultPeople){
    Vue.$vux.loading.show({
      text: '正在校验..'
    })
    try{ //判断是否创建过讨论组

      let res = await Vue.prototype.$http.post('/api/EnergizaSaleKHInfoController/GetWxChatNum',{
        BusinessID:id,
        BusinessType:type,
      });
      Vue.$vux.loading.hide();
      if(res.Success){
        let _this=this;
        let altText = res.Data<1 ? `确定要创建 "${chatName}" 讨论组？`:`已经创建过 "${chatName}" 讨论组，确定要再次创建吗？`;
        let name = res.Data<1 ? chatName:`${chatName}-${parseInt(res.Data)+1}`; //群聊名称，根据接口判断
        Vue.$vux.confirm.show({
          title: '友情提示',
          content: altText,
          onConfirm () {
            // _this.getConcat(type,id,name,defaultPeople);
            _this.getConcat(type,id,chatName,defaultPeople);
          }
        })
      }else{
        Vue.$vux.alert.show({
          title: '友情提示',
          content: res.Message
        })
      }
    }catch(error){
      Vue.$vux.loading.hide();
      Vue.$vux.alert.show({
        title: '友情提示',
        content: error
      })
    }

  }
  static getConcat(type,id,chatName,defaultPeople){
      let _this=this;
      Vue.prototype.$wx.invoke("selectEnterpriseContact", {
            "fromDepartmentId": 0,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
            "mode": "multi",// 必填，选择模式，single表示单选，multi表示多选
            "type": ["user"],// 必填，选择限制类型，指定department、user中的一个或者多个
            // "selectedDepartmentIds": ["2","3"],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
            "selectedUserIds":defaultPeople// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
      },res=>{
              if (res.err_msg == "selectEnterpriseContact:ok")
              {
                      if(typeof res.result == 'string')
                      {
                        res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
                      }
                      var userId =[];
                      res.result.userList.map(el=>{
                        userId.push(el.id);
                      })

                      // alert(type+' , '+id+' , '+chatName+' , '+userId.join(';'));
                      _this.setChat(type,id,chatName,userId.join(';'));
              }
      }
    );
  }
  static async setChat(type,id,chatName,chatPeople){
    Vue.$vux.loading.show({
      text: '正在发起会话...'
    })

    let finalName=chatName; //群聊名称，根据接口判断;
    try{ //判断是否创建过讨论组

      let res = await Vue.prototype.$http.post('/api/EnergizaSaleKHInfoController/GetWxChatNum',{
        BusinessID:id,
        BusinessType:type,
      });
      if(res.Success){
        finalName=res.Data<1 ? chatName:`${chatName}-${parseInt(res.Data)+1}`; //群聊名称，根据接口判断;
      }else{
        Vue.$vux.alert.show({
          title: '友情提示',
          content: res.Message
        })
      }
    }catch(error){
      Vue.$vux.alert.show({
        title: '友情提示',
        content: error
      })
    }
    // end


    // 发起会话
    try{
      let res = await Vue.prototype.$http.post('/api/EnergizaSaleKHInfoController/CreateWxChat',{
        "BusinessID":id,
        "BusinessType":type,
        "Name":finalName,
        "Userlist":chatPeople
      });
      Vue.$vux.loading.hide();
      if(res.Success){
        Vue.$vux.alert.show({
          title: '友情提示',
          content: "会话创建成功！"
        })
      }else{
        Vue.$vux.alert.show({
          title: '友情提示',
          content: res.Message
        })
      }
    }catch(error){
      Vue.$vux.loading.hide();
      Vue.$vux.alert.show({
        title: '友情提示',
        content: error
      })
    }
    // end

  }
  static getTalk(type,name,ids){  //前端发起会话，暂时不用
    Vue.prototype.$wx.openEnterpriseChat({
      // 注意：userIds和externalUserIds至少选填一个，且userIds+externalUserIds总数不能超过2000。
        userIds: ids,    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        groupName: `${type}'${name}'讨论组`,  // 必填，会话名称。单聊时该参数传入空字符串""即可。
        success: function(res) {
            // 回调
            alert('创建会话成功！');
            // alert(JSON.stringify(res))
        },
        fail: function(res) {
            if(res.errMsg.indexOf('function not exist') > -1){
                alert('版本过低请升级')
            }
        }
    });
  }
}

class Utils{
  static noRepeatArray(arr){
      //方法五 利用空对象来记录新数组中已经存储过的元素
      var o={};
      var new_arr=[];
      // for(var i=0;i<arr.length;i++){
      //     var k=arr[i];
      //     if(!o[k]){
      //         o[k]=true;
      //         new_arr.push(k);
      //     }
      // }
      arr.map(el=>{
          if(!o[el]){
              o[el]=true;
              new_arr.push(el);
          }
      })
      return new_arr;
  }
}
export {Utils}
export default wxSDK
