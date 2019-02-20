export const outSystem={
  created(){
    this.getUrlData();
  },
  data(){
    return{
      UserCode:"",
      Password:"",
    }
  },
  methods:{
    getUrlData(){
      let src=window.location.href;

      let userCodeReg = src.match(/UserCode=(\S*)&Password/g)[0];
      let passwordReg = src.match(/Password=(\S*)/g)[0];
      this.UserCode=userCodeReg.replace("UserCode=", "").replace("&Password", "");
      this.Password=passwordReg.replace("Password=", "");
      // console.log(this.UserCode);
      // console.log(this.Password);
    }
  }
}
