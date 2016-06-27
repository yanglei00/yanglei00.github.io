var tplSearch = require('../templates/search');

SPA.defineView('search',{
  html:tplSearch,
  bindEvents: {
    'show':function(){
                        // 获得自定一个的iscroll的id属性值
      var fixScroll = this.widgets.fixScroll;
      fixScroll.on('scroll',function(){
        //当向上拉到一定的高度时 克隆导航条
        if(this.y <= -200){
            //防止克隆多个导航条
            if( $('.m-search').siblings().length>0 ){
              ;
            }else{
              // 只克隆一个导航条
              $('.m-search').after($('.m-search-menu').clone(true).addClass('fixed'));
            }
        }else{
          // 即使得清楚导航条
          $('.m-search-menu.fixed').remove();
        };
      });
    }
  }

});
