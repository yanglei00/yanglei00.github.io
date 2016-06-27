var tplHome = require('../templates/home');
//载入home视图
var util = require('../utils/fn.js');

SPA.defineView('home',{
  html:tplHome,

  //引入插件
  plugins:['delegated',{
    name:'avalon',
    options:function(vm){
      //将[]赋值给vm的livelist属性
      vm.livelist = [];
    }
  }],
  //定义全局变量
  init:{
    vm:null,
    livelistArray:null,
    homeSwiper: null,
    homeHotSwiper : null,
    //自定义一个将一维数组转化为二维数组的方法
    formatData: function(arr){
      //定义一个一维数组
      var tempArr = [];
      for(var i = 0; i < Math.ceil(arr.length/2); i++){
        //将定义好的一维数组转化为二维数组
        tempArr[i] = [];
        tempArr[i].push(arr[2*i]);
        tempArr[i].push(arr[2*i+1]);
      }
      return tempArr;
    }
  },

  bindActions:{
    //实现swiper 点击导航时的切换效果
    'tap.slide':function (e, data){
      this.homeHotSwiper.slideTo($(e.el).index());
    },
    //用swiper 实现点击 主导航时的切换的效果
    'tap.home.slide':function(e,data){
      this.homeSwiper.slideTo($(e.el).index());
    },
    //跳转到商品详情页
    'goto.detail':function(e,data){
      SPA.open('detail',{
        //将自定义的id属性传入商品详情页中
        param:{
          data: data
        }
      });
    }
  },

  bindEvents:{
    'beforeShow':function(){
      var that = this;
      //获取到vm
      that.vm = that.getVM();
      //加载初始的数据
      $.ajax({
        //这里是映射的地址
        url:'/api/getLivelist.php',
        // url:'/football/mock/livelist.json',
        type:'get',
        data:{
          rtype:'origin'
        },
        success:function(rs){
          //将ajax获取到的属性赋值给 vm的livelist属性
          that.vm.livelist = that.formatData(rs.data);
          //将初始的加载的数据赋值给变量livelistArray
          that.livelistArray = rs.data;
        }
      });
    },
    'show':function(){
      var that = this;
      that.homeSwiper = new Swiper('#home-swiper',{
        loop:false,
        //当swiper开始左右滑动时

        // 有什么作用???????????????????
        onSlideChangeStart:function(swiper){
          //获得当前滑动元素的下标
          var index = swiper.activeIndex;
          var $lis = $('#home-nav li');
          //实现活动改变当行样式
          util.setFoucs($lis.eq(index));
        }

      });
      that.homeHotSwiper = new Swiper('#home-hot-swiper',{
        loop:false,
        //当swiper开始左右滑动时
        onSlideChangeStart:function(swiper){
          //获得当前滑动元素的下标
          var index = swiper.activeIndex;
          var $lis = $('.m-home nav li');
          //实现活动改变当行样式
          util.setFoucs($lis.eq(index));
        }

      });
      // 下拉刷新，上拉加载更多
      var scrollSize = 30;
      var myScroll = this.widgets.homeHotScroll;
      myScroll.scrollBy(0, -scrollSize);

      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              return '';
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });

      myScroll.on('scrollEnd', function () {
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/football/images/ajax-loader.gif');
              // ajax下拉刷新数据
              $.ajax({
               url: '/api/getLivelist.php',
               data: {
                 rtype: 'refresh'
               },
               success: function (rs) {
                 var newArray = rs.data.concat(that.livelistArray);
                 that.vm.livelist = that.formatData(newArray);
                 that.livelistArray = newArray;

                 myScroll.scrollTo(0, -scrollSize);
                 head.removeClass('up');
                 head.attr('src', '/football/images/arrow.png');
               }
             })

          }

          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', '/football/images/ajax-loader.gif');
              // ajax上拉加载数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
                  //每获得一次请求就重新定义一个变量来接受拼接好的一维数组
                  var newArray = that.livelistArray.concat(rs.data);
                  //将拼接好的一维数组再抓换为二维数组
                  that.vm.livelist = that.formatData(newArray);
                  //然后再将存有之前一维数组的变量赋值给 全局的livelistArray变量
                  that.livelistArray = newArray;
                  //改变加载后的窗口显示图片的位置
                  myScroll.scrollTo(0, self.y - scrollSize);
                  foot.removeClass('down');
                  foot.attr('src', '/football/images/arrow.png');
                }
              });
              // setTimeout(function () {
              //     $('.foot').before(
              //         '<div class="item">add 1</div>'+
              //         '<div class="item">add 2</div>'+
              //         '<div class="item">add 3</div>'+
              //         '<div class="item">add 4</div>'+
              //         '<div class="item">add 5</div>'
              //     );
              //     myScroll.refresh();
              //
              //     myScroll.scrollTo(0, self.y + scrollSize);
              //     foot.removeClass('down');
              //     foot.attr('src', '/course-footballSNS/images/arrow.png');
              // }, 1000);
          }
      })
      //上拉刷新下拉加载结束
    }
  }

});
