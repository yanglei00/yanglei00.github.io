var tplMy = require('../templates/my');

SPA.defineView('my',{
  html:tplMy,
  plugins:['delegated'],
  //实现点击取消按钮隐藏的功能
  //可以直接修改视图的css样式
  styles: {
    background: 'transparent !important'
  },
  bindActions: {
    'close': function () {
      this.hide();
    }
  },

  bindEvents:{
    show: function(){
      //用iscoll实现导航条的水平滚动
          //lifenav-Scroll为自定义的data-scroll-id的值
      // var lifenavScroll = this.widgets['lifenav-scroll'];
      // //实现导航条的水平滚动的条件
      // lifenavScroll.options.scrollX = true;
      // lifenavScroll.options.scrollY = false;
    }
  }
});
