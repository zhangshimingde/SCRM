<template>
  <div>
    <template v-if="!loading">
      <p class="cm-padding dw" v-if="rankType!='员工'">单位：万元
        <span class="right date" v-if="dates=='month'">
          <popup-picker :data="choseMonth" class="inline_block" @on-change="changeDateType" :display-format="formatMonth" v-model="month">
            <i class="iconfont icon-rili" slot="title" style="margin-right:4px"></i>
          </popup-picker>
        </span>
      </p>
      <div class="cm-padding data-show" style="padding-top:0;background:white" v-if="rankType!='员工'">
        <div class="text_center">
          <span class="digital">{{mbys | fix}}</span> <br>
          <span class="content">目标应收</span>
        </div>
        <div class="text_center">
          <span class="digital">{{mbhk | fix}}</span> <br>
          <span class="content">目标回款</span>
        </div>
        <div class="text_center">
          <span class="digital">{{sjhk | fix}}</span> <br>
          <span class="content">实际回款</span>
        </div>
        <div class="text_center">
          <span class="digital">{{mbys!=0?(mbhk/mbys*100).toFixed(2):0.00}}%</span> <br>
          <span class="content">完成比例</span>
        </div>
      </div>
      <x-table :cell-bordered="false" style="background-color:#fff;" v-if="rankType!='员工'">
        <thead>
          <tr>
            <th>{{rankType}}</th>

            <th>目标应收</th>
            <th>目标回款</th>
            <th>实际回款</th>
            <th>完成比例</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData" @click="getDetail(item)" :key="index">
            <td>
              {{item.NodeName}}
            </td>
            <td>{{item.YSMB | fix}}</td>
            <td>{{item.MBQK | fix}}</td>
            <td>{{item.SJHK | fix}}</td>
            <td>{{item.YSMB!=0?(item.MBQK/item.YSMB*100).toFixed(2):0.00}}%</td>
          </tr>
        </tbody>
      </x-table>

      <div class="personal-kx" style="padding-top:92px" v-if="rankType=='员工'">
        <div class="fixed" style="width:100%;top:44px;left:0;background:white;z-index:10;border-bottom:1px solid #F6F6F6">
          <p class="cm-padding dw">单位：万元
          </p>
          <div class="cm-padding data-show" style="padding-top:0;background:white">

            <div class="text_center">
              <span class="digital">{{BYYS | fix}}</span> <br>
              <span class="content">本月应收</span>
            </div>
            <div class="text_center">
              <span class="digital">{{SYYS | fix}}</span> <br>
              <span class="content">剩余应收</span>
            </div>
            <div class="text_center">
              <span class="digital">{{WCBL}}%</span> <br>
              <span class="content">完成比例</span>
            </div>
          </div>
        </div>

        <template v-if="ygList.length>0">
          <ul class="_ydkx-list">
            <li  v-for="(item,index) in ygList" :key="index">
              <p class="header clearfix relative">
                <span class="left title">{{item.FeeName}}</span>
                <span class="right cb" @click="forcePush(item)"  v-if="(item.YSJE-item.HKJE)!=0">催办</span>
                <span class="right cb" v-else style="color:#21D47F;border-color:#21D47F">已回款</span>
              </p>
              <div class="content">
                <div class="relative check-icon"><check-icon :value.sync="item.checked" ></check-icon></div>
                <div>
                  <span class="digital" style="color:#F4333C">{{item.YSJE | fix}}万</span><br>
                  <span class="title">应收金额</span>
                </div>
                <div>
                  <span class="digital" style="color:#F4333C">{{item.BYYSJE | fix}}万</span><br>
                  <span class="title">本月应收</span>
                </div>
                <div>
                  <span class="digital">{{item.GetDate | formateDate}}</span><br>
                  <span class="title">应收日期</span>
                </div>
                <div>
                  <span class="digital">{{item.FzrName}}</span><br>
                  <span class="title">责任人</span>
                </div>
                <!-- <div>
                  <span class="digital">{{item.BUName}}</span><br>
                  <span class="title">区域</span>
                </div> -->
              </div>
            </li>
          </ul>

          <div class="footer fixed">
            <!-- <div class="total-cash">本月合计：<span style="color:#F4333C">{{BYYS | fix}}万</span></div> -->
            <div class="change-time" @click="changeData('time')">应收时间变更</div>
            <div class="change-people" @click="changeData('people')">责任人变更</div>
          </div>
        </template>
        <template v-else>
          <div class="text_center" style="padding:40px 0">暂无数据....</div>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="text_center" style="padding:40px 0;">
        <inline-loading></inline-loading>
        <span style="color:#9d9d9d">数据加载中</span>
      </div>
    </template>


    <popup v-model="show7" height="270px" is-transparent>
      <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
       <group>
         <p class="text_center" style="padding:1rem 0;font-size:1.2rem">确认要催办吗？</p>
       </group>
       <div style="padding:20px 15px;">
        <x-button type="primary" @click.native="postForce">确定</x-button>
        <x-button @click.native="show7 = false">取消</x-button>
       </div>
      </div>
    </popup>

    <changetime v-if="changetime" @closeMask="closeTimeMask"></changetime>
    <changepeople v-if="changepeople" @closeMask="changePeopleMask"></changepeople>




  </div>

</template>

<script>
import { XTable,numberComma,PopupPicker,Group,XButton,Popup,InlineLoading,CheckIcon    } from 'vux'
import changetime from './changetime'
import changepeople from './changepeople'
export default {
  name: '',
  created(){
    this.getData();

    window.addEventListener("popstate", ()=> {
        // console.log("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        if(this.rankType=="公司") return;
        if(this.rankType=="员工"){
          this.rankType="部门";
          this.id=this.tempId;
        }else if(this.rankType=="部门"){
          this.rankType="公司";
          this.id="";
        }
        this.getData();
      }, false);
  },
  beforeDestroy () {
    // document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
  },
  components:{
    XTable,numberComma,PopupPicker ,Group,Popup,InlineLoading,CheckIcon,XButton ,changetime,changepeople
  },
  props:['dateType'],
  data(){
    return{
      tempId:"",
      show7:false,
      loading:false,
      changetime:false,
      changepeople:false,
      firstTime:true,
      idList:[],
      year:[(new Date()).getFullYear().toString()],
      month:[(new Date()).getFullYear().toString(),(new Date().getMonth()+1).toString()],
      choseYear:[['2015', '2016','2017', '2018','2019', '2020']],
      choseMonth:[['2015', '2016','2017', '2018','2019', '2020'],['1', '2','3', '4','5', '6','7', '8','9', '10','11','12']],
      dates:this.dateType,
      datePrama:"", //取数参数,查询日期（年，月）
      rankType:"", //取数参数,查询层级
      id:"",//取数参数，当前点击的数据行id
      tableData:[],
      ygList:[],
      BYYS:0,
      SYYS:0,
      WCBL:0
    }
  },
  filters:{
    fix(val){
        return numberComma(val.toFixed(2))
    },
    fix2(val){
        return numberComma(val.toFixed(0))
    },
    formateDate(val){
      if(val){
        var str=(val.substring(0,10)).split('-');
      str=str.join('/');

      return str;
      }

    }
  },
  methods:{
    pushState(){
      window.history.pushState(null, null, "");
    },
    getData(){ //查询数据
      this.loading=true;
      this.dates=="year"?this.datePrama=this.year[0]:this.datePrama=this.formatMonth(this.month);
      console.log(this.datePrama)
      // ajax
      this.tableData=[];
       this.$http.post('/api/EnergizeSaleBulletin/GetYSDataList',{
          BuGUID:this.id,
          Level:this.rankType,
          DateString:this.datePrama
       })
       .then((res)=>{
        this.loading=false;
        // console.log(res);
          if(this.firstTime){
            this.firstTime=false;
            this.rankType=res.RankType   //层级赋值
          }
          if(this.rankType=='员工'){
            // document.querySelector('html').setAttribute('style', 'background:#F6F6F6');
            // this.BYYS=0;
            res.Data.map((el)=>{
              el.checked=false;
              // this.BYYS+=el.BYYSJE;
            })
            this.BYYS=res.ByysAmount?res.ByysAmount:0;
            this.SYYS=res.SyysAmount?res.SyysAmount:0;
            this.WCBL=res.Wcbl?(res.Wcbl*100).toFixed(2):0.00;
            this.ygList=res.Data;
            // console.log(this.ygList)
          }else{
            // document.querySelector('html').setAttribute('style', 'background:#fff');
            this.tableData=res.Data;
          }
       })
    },
    getDetail(item){
      this.id=item.NodeGUID;
      if(this.rankType=="公司"){
        this.tempId=item.NodeGUID;
        this.rankType="部门";
        this.pushState();
      }else if(this.rankType=="部门"){
        this.rankType="员工";
        this.pushState();
        // this.month=[(new Date()).getFullYear().toString(),(new Date().getMonth()+1).toString()];
      }else if(this.rankType=="员工"){
        return ;
      }
      this.getData();
    },
    changeDateType(){ //切换日期之后
      this.getData();
    },
    forcePush(item){ //催办确认
        this.show7=true;
        this.postForce(item);
    },
    postForce(item){//催办提交
      this.show7=false;

      // this.$store.commit('updateLoadingStatus', {isLoading: true});
      this.$vux.loading.show({
             text: '正在提交..'
            });
      this.$http.post('/api/EnergizeAction/RushMoney',{
          fzrCode:item.FzrCode,
          title:item.FeeName,
          gatheringGUID:item.ShouldGetGUID,
          recMoney:item.YSJE,
          recDate:item.GetDate
       })
      .then((res)=>{
        // console.log(res)
        // this.$store.commit('updateLoadingStatus', {isLoading: false});
        // this.$vux.toast.show({
        //  text: '催办成功！',
        //  time:500
        // })
        this.$vux.loading.hide();
        if(res.Success){
            this.$vux.toast.show({
              text: '催办成功！',
              time:"200"
             })

            setTimeout(()=>{
              this.$router.go(-1)
            }, 200)

        }else{
          this.$vux.alert.show({
              title: '操作失败!',
              content: res.Message
            })
        }
      })
    },
    changeData(type){  //变更时间/负责人选择
      this.idList=[];
      this.ygList.map((el,index)=>{
         if(el.checked){
          this.idList.push(el.ShouldGetGUID)
         }
      });
      if(this.idList.length==0){
        this.$vux.alert.show({
            title: '友情提示',
            content: '请至少勾选一项！'
          })
        return;
      }
      type=="time"?this.changetime=true:this.changepeople=true;
      // console.log(this.idList.join(','));
    },
    closeTimeMask(params){ //变更时间提交
      this.changetime=false;
      if (!params) {return ;};
      this.$vux.loading.show({
             text: '正在提交..'
            });
      this.$http.post('/api/EnergizeAction/ChangeReceivableSp',{
          type:"应收时间",
          ReceivablesGUIDs:this.idList.join(','),
          newZrr:"",
          newZrrGUID:"",
          newDate:params.date,
          Remark:params.reason
       })
      .then((res)=>{
        // console.log(res)
        this.$vux.loading.hide();
        if(res.Success){
            this.$vux.toast.show({
              text: '变更应收时间成功！',
              time:"500"
             })

        }else{
          this.$vux.alert.show({
              title: '操作失败!',
              content: res.Message
            })
        }

      })

    },
    changePeopleMask(params){ //变更负责人
      this.changepeople=false;
      if (!params) {return ;};
      // console.log(params)
      this.$vux.loading.show({
             text: '正在提交..'
            });
      this.$http.post('/api/EnergizeAction/ChangeReceivableSp',{
          type:"应收责任人",
          ReceivablesGUIDs:this.idList.join(','),
          newZrr:params.people.name,
          newZrrGUID:params.people.id,
          newDate:"",
          Remark:params.reason
       })
      .then((res)=>{
        // console.log(res)
        this.$vux.loading.hide();
        if(res.Success){
            this.$vux.toast.show({
              text: '变更责任人成功！',
              time:"500"
             })

        }else{
          this.$vux.alert.show({
              title: '操作失败!',
              content: res.Message
            })
        }
      })
    },
    formatMonth(value) {
        return `${value[0]}-${value[1]}`
    }
  },
  computed:{
    mbys(){
      var sum=0;
      this.tableData.map((el,index)=>{
        sum+=el.YSMB;
      })
      return sum
    },
    mbhk(){
      var sum=0;
      this.tableData.map((el,index)=>{
        sum+=el.MBQK;
      })
      return sum
    },
    sjhk(){
      var sum=0;
      this.tableData.map((el,index)=>{
        sum+=el.SJHK;
      })
      return sum
    }
  },
  watch:{
    rankType:{
        handler:function(val,oldval){
            // console.log(val)  ;
            // val=='员工'?document.querySelector('html').setAttribute('style', 'background:#F6F6F6'):document.querySelector('html').setAttribute('style', 'background:#fff')
        },
        deep:true//对象内部的属性监听，也叫深度监听
    }
     // document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
  }
}
</script>

<style lang="less">
@import "../../assets/less/exports.less";
.analy-link-wrap{
  height:40px;
  line-height: 40px;
  padding-left: 0.5rem;
  font-size: 0.9rem;
  span{
    &.active{
      color: #0992FF
    }
  }
}
.personal-kx{
  .footer{
    width: 100%;
    background-color: white;
    bottom: 0;
    left: 0;
    @h:3rem;
    line-height: @h;
    font-size: 0.8rem;
    display: flex;
    text-align: center;
    border-top: 1px solid #d9d9d9;
    &>div{
      flex-grow:1;
    }
    .total-cash{
      color: #999;
    }
    .change-time{
      color: #fff;
      background-color: #5195F9;
    }
    .change-people{
      color: #fff;
      background-color: #2D75D8;
    }
  }
}
._ydkx-list{
  background-color: #f6f6f6;
  padding-bottom: 42px;
  li{
    background-color: white;
    margin-bottom: 0.6rem;
    .header{
      padding: 10px 10px 10px 15px;
      overflow: hidden;
      font-size: 0.9rem;
      .border-box;
      @h:1.5rem;
      line-height: @h;
      .title{
        max-width: 80%;
        .text-overflow;
      }
      .cb{
        border:1px solid #3079D5;
        border-radius: 3px;
        padding:0px 8px;
        .border-box;
        height: @h;
        color: #3079D5;
      }
      &:before{
        content: '';
        position: absolute;
        height: 1px;
        background-color: #f6f6f6;
        left: 15px;
        width: 100%;
        bottom: 0;
        right:0
      }
    }
    .content{
      padding: 10px 0;
      display: flex;
      // .check-icon{
      //   // background-color: red;
      // }
      &>div{
        flex-grow:1;
        padding: 0 0.5rem;
        font-size: 0.8rem;
        position: relative;
        text-align: center;
        border-right: 1px solid #ccc;
        .vux-check-icon{

          height: 1.3rem;
          i{
            font-size: 1.3rem;
            margin: 0;
          }
          [class^="weui-icon-"]:before, [class*=" weui-icon-"]:before{
            margin:0;
          }
          position: relative;
          // top: 50%;
          // bottom: 0;
          // top:50%;
          transform:translateY(35%)
        }
        .border-box;
        &:last-child{
          border: none;
        }
        .digital{
          color: black
        }
        .title{
          color: #999;
        }
      }
    }
  }
}
</style>
