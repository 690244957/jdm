(function(){
  function left(){
    var left = document.querySelector('.c-left');
    var ul = left.querySelector('ul');
    var minTop = left.offsetHeight - ul.offsetHeight;
    var  startY = 0;
    var  moveY = 0;
    var distanceY = 0;
    var currentY = 0;
    left.addEventListener('touchstart',function(e){
      startY = e.targetTouches[0].clientY;
    })
    left.addEventListener('touchmove',function(e){
      moveY = e.targetTouches[0].clientY;
      distanceY = moveY - startY;
      ul.style.transition = 'none';
      ul.style.transform = 'translateY('+ (currentY + distanceY) +'px)';
    })
    left.addEventListener('touchend',function(e){
      currentY += distanceY;
      if (currentY > 0) {
        currentY = 0;
    }

      if (currentY < minTop ) {
          currentY = minTop;
      }
      ul.style.transition = 'transform 0.3s';
      ul.style.transform = 'translateY(' + currentY + 'px)';
      startY = 0;
      moveY = 0;
      distanceY = 0;
    })
  }
  left();
  new IScroll('.c-right',{
    scrollX:true,
    scrollY:true
  });
})()