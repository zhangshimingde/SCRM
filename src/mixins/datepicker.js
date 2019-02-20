export default {
  data () {
    return {
      dateRange:this.setDefaultDate()
    }
  },
  methods:{
    changeDates(item){
      if(item[1]=='全年'){

        this.dateRange=[item[0]+'-01-01',(parseInt(item[0])+1)+'-01-01'];

      }else{

        let mon,year;
        let tempYear=parseInt(item[0]),tempMonth=parseInt(item[1]);
        if(tempMonth==12){
          mon='01';
          year=tempYear+1;
        }else{
          mon=(tempMonth+1)>9?(tempMonth+1):'0'+(tempMonth+1);
          year=tempYear;
        }
        this.dateRange=[`${tempYear}-${tempMonth>9?tempMonth:'0'+tempMonth}-01`,`${year}-${mon}-01`];

      }

      // console.log(this.dateRange)

      this.getData();
    },
    setDefaultDate(){//默认取本年度
      let start = (new Date()).getFullYear()+'-01-01';
      let end = ((new Date()).getFullYear()+1)+'-01-01';
      return [start,end];
    }
  }
}
