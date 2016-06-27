//定义 自定义的函数
var Util = {
  setFoucs: function(e){
    $(e).addClass('active').siblings().removeClass('active');
  }
}

//暴露
module.exports = Util;
