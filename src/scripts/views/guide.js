var tplGuide = require('../templates/guide');

SPA.defineView('guide',{
  html:tplGuide,
  //引入插件
  plugins: ['delegated'],
  //点击引导页跳转到首页
  bindActions:{
    'goto.index':function(){
      //视图切换
      SPA.open('index2');
    }
  },
  bindEvents:{
    show: function(){
      //构建一个swiper对象
      var mySwiper = new Swiper('#guide-swiper',function(){
        loop:false
      });
    }
  }

});

// SPA.defineView('guide', {
//   bindActions: {
//     'goto.index': function () {
//       // 视图切换
//       SPA.open('index');
//     }
//   },
//
//   bindEvents: {
//     show: function () {
//       var mySwiper = new Swiper('#guide-swiper', {
//         loop: false
//       });
//     }
//   }
// });
