//引入templates首页的结构
var tplIndex = require('../templates/index');

//引用公共的方法
var util = require('../utils/fn.js');

//用spa类库将页面载入
SPA.defineView('index2',{
  html:tplIndex,

  //载入插件列表
  //delegated插件 实现tab事件的绑定
  plugins: ['delegated'],

  //定义子视图
  modules:[{
    name:'content', //定义子视图的名字  作为后面应用的语抦
    views:['home','search','my'],   //定义子视图的列表容器
    defaultTag:'home',    //定义默认的子视图
    container:'.l-container'      //定义子视图的容器
  }],
  bindActions:{
    'switch.tabs':function(e,data){
      //  e.el表示被点击的元素对象
        // $(e.el).addClass('active').siblings().removeClass('active');
      //设置点击当前高亮
        util.setFoucs(e.el);

      //切换子视图
        //this 指的是当前的视图 这里指的是index视图
          //console.log(data.tag)  指的是被点击元素所跳转的子视图
        this.modules.content.launch(data.tag);
    },
    'exit': function (e, data){
      //设置点击当前高亮
        util.setFoucs(e.el);
      //关闭退出视图
      this.hide();
    },
    //点击我时弹框dialog的效果
    'tap.my': function () {
      SPA.open('my', {
        //实现弹出框dialog的效果
        ani:{
          name: 'dialog',
          width:300,
          height:200
        }
        //实现actionsheet划出层的效果
          // ani:{
          //   name: 'actionsheet',
          //   distance: 300
          //
          // }
      });
    }


  }



});
