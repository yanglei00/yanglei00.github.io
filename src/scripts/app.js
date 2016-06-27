//引入spa类库
require('./lib/spa.min.js');
//引入swiper类库
require('./lib/swiper-3.3.1.min.js');




//引入views试图
require('./views/guide.js');
require('./views/index.js');
require('./views/home.js');
require('./views/search.js');
require('./views/my.js');
require('./views/detail.js');

//设置默认的首个视图
SPA.config({
  indexView: 'guide'
});
// console.log(guide)
