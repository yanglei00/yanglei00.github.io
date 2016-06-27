var tplDetail = require('../templates/detail');

SPA.defineView('detail',{
  html: tplDetail,
  plugins: ['delegated',{
    name: 'avalon',
    options: function(vm){
      vm.imgsrc = "";
      vm.title = "";
      vm.detail = "";
      //定义一个loading 中的显示与隐藏的变量
      vm.isShowLoading = true;
    }
  }],
  bindActions: {
    //实现点击隐藏当前视图
    'back': function (){
      this.hide();
    }
  },

  bindEvents: {
    'show': function(){
      var vm = this.getVM();
      //接受图片标签中传入的id值
      var d = this.param.data;

      $.ajax({
        url: '/api/getLiveDetail.php',
        data:{
          id:d.id
        },
        success: function(rs){

           setTimeout(function(){

             // 用avalon自定义的属性来接受ajax请求获得来的数据
              vm.title = rs.data.title;
              vm.imgsrc = rs.data.imgsrc;
              vm.detail = rs.data.detail;
              //当页面数据请求成功的话 改变变量的值
               vm.isShowLoading = false;

           },3000);
        }
      });
    }
  }
});
