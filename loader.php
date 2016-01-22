<style>#global p,.mask,.plane{position:absolute}body{background:#282828}#global{width:70px;margin:50px auto auto;position:relative;cursor:pointer;height:60px}.mask{border-radius:2px;overflow:hidden;-webkit-perspective:1000;perspective:1000;-webkit-backface-visibility:hidden;backface-visibility:hidden}.plane{background:#fff;width:400%;height:100%;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:100;-webkit-perspective:1000;perspective:1000;-webkit-backface-visibility:hidden;backface-visibility:hidden}#bottom,#middle,#top{height:20px}.animation{-webkit-transition:all .3s ease;transition:all .3s ease}#top .plane{z-index:2000;-webkit-animation:trans1 1.3s ease-in infinite 0s backwards;animation:trans1 1.3s ease-in infinite 0s backwards}#middle .plane{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);background:#bbb;-webkit-animation:trans2 1.3s linear infinite .3s backwards;animation:trans2 1.3s linear infinite .3s backwards}#bottom .plane{z-index:2000;-webkit-animation:trans3 1.3s ease-out infinite .7s backwards;animation:trans3 1.3s ease-out infinite .7s backwards}#top{width:53px;left:20px;-webkit-transform:skew(-15deg,0);transform:skew(-15deg,0);z-index:100}#middle{width:33px;left:20px;top:15px;-webkit-transform:skew(-15deg,40deg);transform:skew(-15deg,40deg)}#bottom{width:53px;top:30px;-webkit-transform:skew(-15deg,0);transform:skew(-15deg,0)}#global p{color:#fff;left:-3px;top:45px;font-family:Arial;text-align:center;font-size:10px}@-webkit-keyframes trans1{from{-webkit-transform:translate3d(53px,0,0);transform:translate3d(53px,0,0)}to{-webkit-transform:translate3d(-250px,0,0);transform:translate3d(-250px,0,0)}}@keyframes trans1{from{-webkit-transform:translate3d(53px,0,0);transform:translate3d(53px,0,0)}to{-webkit-transform:translate3d(-250px,0,0);transform:translate3d(-250px,0,0)}}@-webkit-keyframes trans2{from{-webkit-transform:translate3d(-160px,0,0);transform:translate3d(-160px,0,0)}to{-webkit-transform:translate3d(53px,0,0);transform:translate3d(53px,0,0)}}@keyframes trans2{from{-webkit-transform:translate3d(-160px,0,0);transform:translate3d(-160px,0,0)}to{-webkit-transform:translate3d(53px,0,0);transform:translate3d(53px,0,0)}}@-webkit-keyframes trans3{from{-webkit-transform:translate3d(53px,0,0);transform:translate3d(53px,0,0)}to{-webkit-transform:translate3d(-220px,0,0);transform:translate3d(-220px,0,0)}}@keyframes trans3{from{-webkit-transform:translate3d(53px,0,0);transform:translate3d(53px,0,0)}to{-webkit-transform:translate3d(-220px,0,0);transform:translate3d(-220px,0,0)}}@-webkit-keyframes animColor{from{background:red}25%{background:#ff0}50%{background:green}75%{background:brown}to{background:#00f}}@keyframes animColor{from{background:red}25%{background:#ff0}50%{background:green}75%{background:brown}to{background:#00f}}</style>
<section id="global">

    <div id="top" class="mask">
      <div class="plane"></div>
    </div>
    <div id="middle" class="mask">
      <div class="plane"></div>
    </div>

    <div id="bottom" class="mask">
      <div class="plane"></div>
    </div>
    
  <p><i>CARICAMENTO...</i></p>
    
</section>