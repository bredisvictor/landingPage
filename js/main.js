$(function(){
    var sliderMargin = 0;
    setInterval(function(){
        if(sliderMargin == -1200){
            sliderMargin = 0;
            $("#slider").css("margin-left","300px");
            $("#slider>img").eq(4).css({"position":"absolute",
                                        "left":"-300px"});
            $(".zoom").css("margin-left","300px");
             $("#slider>img").eq(4).animate({"position":"absolute",
                                        "left":"-300px"},500);
            $("#slider").animate({"margin-left":sliderMargin+"px"},500);
            $(".zoom").eq(0).animate({"margin-left":sliderMargin+"px"},500);
            $(".zoom").eq(1).animate({"margin-left":sliderMargin+"px"},500);
            $(".zoom").eq(2).animate({"margin-left":sliderMargin+"px"},500);
            $(".zoom").eq(3).animate({"margin-left":sliderMargin+"px"},500);
            $(".zoom").eq(4).animate({"margin-left":sliderMargin+"px"},500);
        }
        else{
            sliderMargin -=300;
            $("#slider>img").eq(4).css({"position":"absolute",
                                       "left":"1200px"});
            $("#slider").animate({"margin-left":sliderMargin+"px"},500);
            $(".zoom").eq(0).animate({"margin-left":sliderMargin+"px"},500);
            $(".zoom").eq(1).animate({"margin-left":sliderMargin+"px"},500);
            $(".zoom").eq(2).animate({"margin-left":sliderMargin+"px"},500);
            $(".zoom").eq(3).animate({"margin-left":sliderMargin+"px"},500);
            $(".zoom").eq(4).animate({"margin-left":sliderMargin+"px"},500);
            
        }
    },2500);
    bredisGallery.start("#slider");
    
});
