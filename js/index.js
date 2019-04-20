(function () {
  function setBannerHeight(){
    document.querySelector('.jd-banner').style.height=document.querySelector('.jd-banner ul img').offsetHeight + 'px';
  }
  setBannerHeight();
  window.onresize = function () {
    setBannerHeight(); //设置高度
  }
  downTime();
  news();
  setHeader();
  banner();
  function downTime(){
    var t = 5 * 60 * 60;
    var spans = document.querySelectorAll('.jd-seckill .time span:nth-child(odd)');
    console.log(spans);
    var timer = setInterval(function(){
      var h = Math.floor(t / 3600);
      var m = Math.floor(t % 3600 / 60);
      var s = t % 60;
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      spans[0].innerHTML = h;
      spans[1].innerHTML = m;
      spans[2].innerHTML = s;
      t--;
      if(t<0){
        t = 5 * 60 * 60;
      }
    },1000);
  }
  function news(){
    var ul = document.querySelector('.jd-news ul');
    var lis = ul.querySelectorAll('li');
    var index = 0;
    setInterval(function(){
      index++;
      ul.style.transition = 'transform .3s';
      ul.style.webkitTransition = 'transform .3s';
      ul.style.transform = 'translateY' + (-index * 30) + 'px';
      ul.style.webkitTransform = 'translateY('+ (-index * 30) +'px)';
    },2000);
    ul.addEventListener('transitionend',function(){
      if(index >= lis.length -1){
        index = 0;
        ul.style.transition ='none';
        ul.style.webkitTransition = 'none';
        ul.style.transform = 'translateY(0)';
        ul.style.webkitTransform = 'translateY(0)';
      }
    })
  }
  function setHeader(){
    var banner = document.querySelector('.jd-banner');
    var header = document.querySelector('.jd-header'); 
    window.addEventListener('scroll',function(){
      var top = window.pageYOffset;
      var height = banner.offsetHeight;
      var value = top/height;
      if(value>1){
        value = 1;
      }
      header.style.backgroundColor = 'rgba(222, 24, 27, ' + value +')';
    })

  }

function banner () {
  var banner = document.querySelector('.jd-banner');
  var ul = banner.querySelector('ul');
  var width = banner.offsetWidth; //获取banner宽度
  var points = banner.querySelectorAll('ol li');
  var index = 1; //当前显示的第二张图片（第一张是替补）

  console.log(points);
  var timer = setInterval(turn,4000);
  ul.addEventListener('transitionend',function(){
    if(index>=9){
      index = 1;
      removeTransition();
      setTranslateX(-index * width);
    }
    if (index <= 0) {
      index = 8;
      //去掉过渡
      removeTransition();
      //ul瞬移到真正的第一张图片,进行重合实现无缝
      setTranslateX(-index * width); //ul位移 
  }
 
  setPoints(index -1);
})
  function setPoints(index){
    points.forEach(function(v,i){
      v.classList.remove('current');

    })
    points[index].classList.add('current');
  }
  
  function turn(){
    index++;
    addTransition();
    setTranslateX(-index * width);
  }
  function addTransition(){
    ul.style.transition = 'transform 0.3s';
    ul.style.webkitTransition = 'transform 0.3s';
  }
  function removeTransition(){
    ul.style.transition = 'none';
    ul.style.webkitTransition = 'none';
  }
  function setTranslateX(x){
    ul.style.transform = 'translateX(' + x + 'px)';
    ul.style.webkitTransform = 'translateX('+ x +'px)';
  }
  var startX = 0; 
  var moveX = 0; 
  var distanceX = 0;
  banner.addEventListener('touchstart',function(e){
    console.log('start');
    clearInterval(timer); 
    startX = e.targetTouches[0].clientX;
  })
  banner.addEventListener('touchmove',function(e){
    moveX = e.targetTouches[0].clientX;
    distanceX = moveX - startX;
    removeTransition();
    setTranslateX(-index * width + distanceX);
  })
  banner.addEventListener('touchend',function(e){
    if (Math.abs(distanceX) > width / 3) {
      //切换 上一张 下一张？ 
      if (distanceX > 0 ) {
          index--;
      }
      if(distanceX < 0) {
          index++;
      }
  }
  addTransition();
  setTranslateX(-index * width);

    startX = 0; 
    moveX = 0; 
    distanceX = 0;
    timer = setInterval(turn , 4000);
  })

  window.addEventListener('resize',function(){
    width = banner.offsetWidth;
    removeTransition();
    setTranslateX(-index * width);
  })

}
})();
