import Vue from 'vue'
class wxSDK {
  static getConcat(type,name){
    Vue.prototype.$wx.invoke("selectEnterpriseContact", {
                  "fromDepartmentId": -1,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
                  "mode": "multi",// 必填，选择模式，single表示单选，multi表示多选
                  "type": ["user"],// 必填，选择限制类型，指定department、user中的一个或者多个
                  // "selectedDepartmentIds": ["2","3"],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                  //     "selectedUserIds": ["lisi","lisi2"]// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
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

                            // alert(userId.join(';'))
                            this.getTalk(type,name,userId.join(';'));
                            // for (var i = 0; i < selectedUserList.length; i++)
                            // {
                            //         var user = selectedUserList[i];
                            //         var userId = user.id; // 已选的单个成员ID
                            //         var userName = user.name;// 已选的单个成员名称
                            //         var userAvatar= user.avatar;// 已选的单个成员头像
                            // }
                    }
            }
    );
  }
  static getTalk(type,name,ids){
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

export default wxSDK
