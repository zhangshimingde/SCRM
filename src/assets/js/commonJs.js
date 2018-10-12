import route from '../../router/index'

var getToken=function(_this,fn){
    _this.$http.get("/api/AppUser/getToken?code="+_this.$code).then(function(data){
      // if(!data.Success&&data.Message.indexOf("无权限")>-1){//跳转到无用户权限页面(非企业用户)
        // alert(JSON.stringify(data));
      if(!data.Success){
      	alert(data.Message);
        route.push({name:'noRight'});
      }else{
      	localStorage.setItem("token",data.Token);
      	if(fn) fn();
      }
      
    })
}


export {getToken};