<template>
  <div style="padding:10px 0">
    <template v-if="!loading">
    <el-tree :data="treeList" :props="defaultProps" :default-expanded-keys="expandedArr"  node-key="id" :accordion="true" :indent="5" :render-content="renderContent" ></el-tree>
  </template>
            <div v-else class="text_center" style="height:132px;line-height:132px">
              <inline-loading></inline-loading>
              <span style="color:#9d9d9d">数据加载中</span>
            </div>
  </div>
      
</template>

<script>
import {InlineLoading  } from 'vux'
export default {
    components:{
      InlineLoading
    },
    beforeCreate () {
      document.querySelector('html').setAttribute('style', 'background:#fff')
    },
    beforeDestroy () {
      document.querySelector('html').setAttribute('style', 'background:#F6F6F6')
    },
    created(){
      this.getData();
    },
    data() {
      return {
        loading:false,
        treeList:[],
        expandedArr:[this.$route.params.id.toLowerCase()],
        dataList: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        }
      };
    },
    methods: {
      getData(){
        this.loading=true;
        this.$http.post("/api/EnergizaSaleKHInfoController/GetRefCustomer",{
            KHGUID:this.$route.params.id
          }
        )
        .then((res)=>{
          // console.log(res)
          this.loading=false;
          this.sortData(res.Data);
        })
      },
      sortData(list){
          var temp=[];
          list.map((el)=>{
            temp.push({
              name:el.FullName,
              id:el.KHGUID,
              parentId:el.ParentKHGUID||"",
              type:el.CompanyLevelName
            })  
          })

          this.treeList=this.setTree(temp,"");
          // console.log(this.treeList)
          // this.expandedArr.push(this.$route.params.id)
          
      },
      setTree(data,parentId){
        var itemArr=[];
        
          data.map((node)=>{
            let type=node.type?node.type.substring(0,2):"暂无";
              if(node.parentId==parentId){
                    var newNode={id:node.id,parentId:node.parentId,label:type+","+node.name,children:this.setTree(data,node.id)};
                    itemArr.push(newNode);              
                 }
          })
          return itemArr;
      },

      renderContent(h, { node, data, store }) {
        if(data.id==this.$route.params.id.toLowerCase()){
          return (
          <span style="line-height:40px;height:40px">

            <span class="text-over inline_block tree-content" style="">
              <span class="tree-item-banner" >{node.label.split(',')[0]}</span>
              <span class="tree-item-content"  style="color:#409eff">{node.label.split(',')[1]}</span>
            </span>
            <span class="tree-detail" style="" on-click={ () => this.openDetail(node, data) }>
              详情
            </span>
          </span>);
        }else{
          return (
          <span style="line-height:40px;height:40px">

            <span class="text-over inline_block tree-content" style="">
              <span class="tree-item-banner">{node.label.split(',')[0]}</span>
              <span class="tree-item-content">{node.label.split(',')[1]}</span>
            </span>
            <span class="tree-detail" style="" on-click={ () => this.openDetail(node, data) }>
              详情
            </span>
          </span>);
        }
        
      },
      openDetail(node,data){
        var id=data.id;
         this.$router.push({
            name:"kehudetail",
            params:{
              id:id
            }
        })
      }
    }
  };
</script>

<style lang="less">
@import '../../../../../assets/less/exports.less';
.el-tree-node__content{
  display: block !important;
  height: 40px;
  position: relative;
}
.el-tree-node__content>.el-tree-node__expand-icon{
  position: relative;
  top:-12px;
}
.tree-item-banner{
  font-size: 13px;
  padding: 2px 5px;
  margin-right: 5px;
  border: 1px solid #666;
  border-radius: 4px;
}
.tree-content{
  width:77%;vertical-align:text-bottom;font-size:13px;
  .tree-item-content{
    font-size: 1rem;
  }
}
.tree-detail{
  position: absolute;
  top:10px;
  right: 5px;
  border: 1px solid #3079D5;
  padding: 0px 6px;
  font-size:0.9rem;
  border-radius: 10px;
  color:#409eff;
  height: 20px;
  line-height: 20px;
  box-sizing: border-box;
}
</style>
