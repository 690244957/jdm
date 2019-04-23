window.onload = function(){
  var  dels = document.querySelectorAll('.del');
  var winBox = document.querySelector('.win-box');
  var delBox = document.querySelector('.del-box');
  var cancel = document.querySelector('.cancel');
  dels.forEach(function(v,i){
    v.addEventListener('click',function(){
      winBox.style.display = 'block';
      this.classList.add('open');
      delBox.classList.add('animated');
      delBox.classList.add('bounceInDown');
    })
  })
  cancel.addEventListener('click',function(){
    winBox.style.display='none';
    document.querySelector('.open').classList.remove('open')
  })
}