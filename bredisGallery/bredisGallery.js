
var bredisGallery = {

    nextSlide: function(){

        if(bredisGallery.imageAction){
            var image = $("#galeryMain img");
            $(image).each(function(){
                if($(this).css("display") == "inline" || $(this).css("display") == "block" || $(this).css("display") == "inline-block" ){
                     $(this).hide().next().show().css({"left":"70%",
                                                 "opacity":"0"}).animate({"left":"0",
                                                                         "opacity":"1"},500);
                    $("#download").attr("href",$(this).next().attr("src"));
                    $(this).next().css("margin","auto");
                    bredisGallery.imageIndex = $(this).next().index() + 1;
                 if(!$(this).next().length){
                            image.first().show().css({"left":"70%",
                                                 "opacity":"0"}).animate({"left":"0",
                                                        "opacity":"1"},500).siblings().hide();
                            $("#download").attr("href",image.first().attr("src"));
                                image.first().css("margin","auto");
                     bredisGallery.imageIndex = image.first().index() + 1;
                    }   
                    bredisGallery.imageAction = false;
                    setTimeout(bredisGallery.imageActionF, 500);
                    return false;
                }
                });
            $("#countImg").text(bredisGallery.imageIndex+"/"+bredisGallery.ImageQuantity);
            bredisGallery.glassResize();
            $("#glassDiv").css("margin","auto"); 
            };
        },
    
    prevSlide: function(){

        if(bredisGallery.imageAction){
            var image = $("#galeryMain img");
            $(image).each(function(){
                if($(this).css("display") == "inline" || $(this).css("display") == "block" || $(this).css("display") == "inline-block" ){
                    $(this).hide().prev().show().css({"left":"-150%",
                                                 "opacity":"0"}).animate({"left":"0",
                                                                         "opacity":"1"},500);
                
                 $("#download").attr("href",$(this).prev().attr("src"));
                    $(this).prev().css("margin","auto");
                    bredisGallery.imageIndex = $(this).prev().index() + 1;
                
                    if(!$(this).prev().length){
                         image.last().show().css({"left":"-150%",
                                                 "opacity":"0"}).animate({"left":"0",
                                                        "opacity":"1"},500).siblings().hide();
                        $("#download").attr("href",image.last().attr("src"));
                        image.last().css("margin","auto");
                        bredisGallery.imageIndex = image.last().index() + 1;
                    }   
                 bredisGallery.imageAction = false;
                    setTimeout(bredisGallery.imageActionF, 500);
                    return false;
                }
             });
            $("#countImg").text(bredisGallery.imageIndex+"/"+bredisGallery.ImageQuantity);
            bredisGallery.glassResize();
            $("#glassDiv").css("margin","auto");
            };
        },
    
    imageIndex:0,
    
    ImageQuantity:0,
    
    clickPositionNext:0,
    
    grabImg: 0,
    
    imgML:0,
    
    clickPositionPrev:0,
    
    grabPosition:0,
    
    imageDefault:0,
    
    glassWidth:0,
    
    glassHeight:0,
    
    mouseDown:false,
    
    imageAction: true,
    
    glassPosition: function(){
        
        var image = $("#galeryMain img");
            $(image).each(function(){
            if($(this).css("display") == "inline" || $(this).css("display") == "block" || $(this).css("display") == "inline-block" ){
       
                
                bredisGallery.glassWidth = $(this).width();
                bredisGallery.glassHeight = $(this).height();
            }
       });
        
        
    },
    
    imageActionF: function(){
        bredisGallery.imageAction = true;  
    },
    
    glassResize: function(){
            bredisGallery.glassPosition();
            $("#glassDiv").css("width",bredisGallery.glassWidth+"px");
            $("#glassDiv").css("height",bredisGallery.glassHeight+"px");  
    },
    
    setClickPosition: function(e){
        bredisGallery.clickPositionNext = e + 100;
        bredisGallery.clickPositionPrev = e - 100;
        bredisGallery.grabImg = e;
        
    },
    
    setGrabPosition:function(e){
        bredisGallery.grabPosition = e;
    },
    
    setImageDefault: function(){
        var imgP = 0;
        var image = $("#galeryMain img");
            $(image).each(function(){
            if($(this).css("display") == "inline" || $(this).css("display") == "block" || $(this).css("display") == "inline-block" ){
       
                
               imgP = $(this).css("margin-left");
       }
            });
        
        var img = imgP.split("p");
        var imagePosition = Number(img[0]);
        bredisGallery.imageDefault = imagePosition;
        
    },
    
    imageMovePosition: function(){
        if(bredisGallery.imageAction)
            bredisGallery.imgML = bredisGallery.grabPosition-bredisGallery.grabImg+bredisGallery.imageDefault;
    },
    
    mouseSlide: function(){
        if(bredisGallery.grabPosition>bredisGallery.clickPositionNext){
            bredisGallery.prevSlide();
            
        }
        else if(bredisGallery.grabPosition<bredisGallery.clickPositionPrev){
            bredisGallery.nextSlide();
            
        }
        $("#glassDiv").css("cursor","grab");
    },
    
    glassDiv: $("<div id='glassDiv'></div>").on("mousemove",function(e){
            bredisGallery.setGrabPosition(e.pageX); 
            
    }).mouseup(function(){
           
        
            if(bredisGallery.mouseDown){
                bredisGallery.mouseSlide();
            }    
            $("#glassDiv").on("mousemove",function(e){
            bredisGallery.setGrabPosition(e.pageX); 
            });
        
        bredisGallery.mouseDown = false;
            
    ;}).mousedown(function(e){
        
        bredisGallery.mouseDown = true;
        
        bredisGallery.setImageDefault();
        bredisGallery.setClickPosition(e.pageX);
        $("#glassDiv").css("cursor","grabbing");
        if(bredisGallery.imageAction){
            $("#glassDiv").on("mousemove",function(){
                
                bredisGallery.imageMovePosition();
                
                var image = $("#galeryMain img");
                $(image).each(function(){
                if($(this).css("display") == "inline" || $(this).css("display") == "block" ||            $(this).css("display") == "inline-block" ){
       
                
               $(this).css("margin-left",bredisGallery.imgML+"px");
                }
            });
                
            $("#glassDiv").css("margin-left",bredisGallery.imgML+"px");  
        
                
            });
        };
    }),
    
    documentMouseDownReset: $(document).mouseup(function(){
         $("#glassDiv").off("mousemove");
        
            
        var image = $("#galeryMain img");
            $(image).each(function(){
            if($(this).css("display") == "inline" || $(this).css("display") == "block" || $(this).css("display") == "inline-block" ){
       
                
               $(this).css("margin","auto");
               
       }
            });
            
            $("#glassDiv").css("margin","auto"); 
        
        $("#glassDiv").on("mousemove",function(e){
            bredisGallery.setGrabPosition(e.pageX); 
            });
    }),
    
    mobileTouch: function(){
        var initialPoint;
		var finalPoint;
		document.getElementById("glassDiv").addEventListener('touchstart', function(e){
			e.preventDefault();
			e.stopPropagation();
			initialPoint=e.changedTouches[0];
		}, false);
		document.getElementById("glassDiv").addEventListener('touchend', function(e){
			e.preventDefault();
			e.stopPropagation();
			finalPoint=e.changedTouches[0];
			var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
			var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
			if (xAbs > 20 || yAbs > 20){
				if (xAbs > yAbs) {
					if(finalPoint.pageX < initialPoint.pageX){
						bredisGallery.nextSlide();
					}	
					else{
						bredisGallery.prevSlide();
					}
				}
            }
		}, false);
    },
    
    f11Key: $(document).keydown(function(e){
        if(e.which == 122){
            bredisGallery.fullScreenModeInOut();
            return false;
            
        }
    }),
    
    fullScreenModeInOut: function(){
        if(!document.fullscreenElement&&!document.mozFullScreenElement&&!document.webkitFullscreenElement){ 
            if(document.documentElement.requestFullscreen){
                document.documentElement.requestFullscreen();
            } 
            else if(document.documentElement.mozRequestFullScreen){
                document.documentElement.mozRequestFullScreen();
            } 
            else if(document.documentElement.webkitRequestFullscreen){
        document.documentElement.webkitRequestFullscreen();
            }
            $("#galeryMain img").css("height","100%");
            $("#fullScreenB").css("background-image","url(bredisGallery/img/fullscreenexit2.svg)");
            
        } 
        else{
            if(document.cancelFullScreen){
                document.cancelFullScreen();
                
            } 
            else if(document.mozCancelFullScreen){
                document.mozCancelFullScreen();
                
            } 
            else if(document.webkitCancelFullScreen){
                document.webkitCancelFullScreen();
                
            }
            $("#galeryMain img").css("height","auto");
            $("#fullScreenB").css("background-image","url(bredisGallery/img/fullscreen2.svg)");
            
        }
    },
    
    fullScreenModeOut: function(){
        if(document.cancelFullScreen){
                document.cancelFullScreen();
        } 
        else if(document.mozCancelFullScreen){
                document.mozCancelFullScreen();
        } 
        else if(document.webkitCancelFullScreen){
                document.webkitCancelFullScreen();
        }
        $("#galeryMain img").css("height","auto");
        $("#fullScreenB").css("background-image","url(bredisGallery/img/fullscreen2.svg)");
        
    },
    
    galleryBredis: $("<div id='bredisGallery'></div>"),
    
    main: $("<div id='galeryMain'></div>"),

    next: $("<div id='nextbutton'></div>").click(function(){bredisGallery.nextSlide();}),
    
    back: $("<div id='backbutton'></div>").click(function(){bredisGallery.prevSlide();}),
    
    wrapperNav: $("<div id='wrappernav'></div>"),
    
    wrapperNavTop: $("<div id='wrappernavTop'></div>"),
    
    download: $("<a id='download' href='' download></a>"),
    
    counter: $("<sapn id='countImg'></span>"),
    
    fullScreenB: $("<div id='fullScreenB'></div>").click(function(){bredisGallery.fullScreenModeInOut()}),
    
    close:  $("<div id='closebutton'></div>").click(function(){
        $("#galeryMain").empty();
        $("#galeryMain").fadeOut();
        $("#wrappernav").hide();
        $("#nextbutton").hide();
        $("#backbutton").hide();
        $("#glassDiv").hide();
        $("#download").hide();
        $("#wrappernavTop").hide();
        $("#download").hide();
        $("#fullScreenB").hide();
        $("#bredisGallery").fadeOut();
        $(this).hide();
        bredisGallery.fullScreenModeOut();
        $("html").css("overflow-y","auto");
        $("html").css("overflow-x","auto");
        
    }),
    
    
    imageDettection: function(x){
    
        var index = $(x);
        var size = index.size();
        var arr = []

        for( i = 0; i < size; i++){

            arr.push(index.eq(i).html());
        }
        
        arr = arr.join(",");
        arr = arr.replace(/,/g,"");
        return arr;
    },

    indexDetect: function(index){
        index.trim();
        var first = index.indexOf(" ");
        var second = index.indexOf(">");
        if(first != -1 || second != -1){
            index = index;
        }
        else{
            index = index+" img";
        }
        return index;
    },
    
    start: function(index){
       $(bredisGallery.indexDetect(index)).click(this,function(e){
            $(e.data.galleryBredis).prependTo("body");
            $(e.data.main).prependTo("#bredisGallery");
            $(e.data.imageDettection(index)).appendTo("#galeryMain");
            $(e.data.glassDiv).prependTo("#bredisGallery");
            $(e.data.wrapperNav).prependTo("#bredisGallery");
            $(e.data.back).prependTo("#wrappernav");
            $(e.data.next).prependTo("#wrappernav");
            $(e.data.counter).prependTo("#wrappernav");
            var clientW = (document.body.clientWidth || document.documentElement.clientWidth);
            if(clientW>480){
                $(e.data.wrapperNavTop).prependTo("#bredisGallery");
                $(e.data.close).prependTo("#wrappernavTop");
                $(e.data.download).prependTo("#wrappernavTop");
                $(e.data.fullScreenB).prependTo("#wrappernavTop");
                $("#closebutton").css({"right":"0", 
                                       "top":"0",
                                      "position":"absolute",
                                      "z-index":"1100000"});
            }
            else{
                 $(e.data.close).prependTo("#bredisGallery");
                $("#closebutton").css({"right":"10px", 
                                       "top":"10px",
                                      "position":"fixed",
                                      "z-index":"1100001"});
                $("#wrappernavTop").remove();
                
            }
            $("#bredisGallery").show();
            $("#galeryMain").show();
            $("#glassDiv").show();
            $("#wrappernav").show();
            $("#nextbutton").show();
            $("#backbutton").show();
            $("#wrappernavTop").show();
            $("#closebutton").show();
            $("#download").show();
            $("#fullScreenB").show();
            e.data.imageIndex = $(this).index() + 1;
            e.data.ImageQuantity = $("#galeryMain img").size();
            $("#countImg").text(bredisGallery.imageIndex+"/"+bredisGallery.ImageQuantity);
            $("#galeryMain img").eq($(this).index()).fadeIn().siblings().hide();
            var imageSrc = $("#galeryMain img");
           $("#galeryMain>img").eq(4).css("left","0");
            $(imageSrc).each(function(){
                if($(this).css("display") == "inline" || $(this).css("display") == "block" || $(this).css("display") == "inline-block"){
                    imageSrc = $(this).attr("src");
                }
            });
            $("#download").attr("href",imageSrc);
            bredisGallery.glassResize();
            bredisGallery.mobileTouch();
            $("html").css("overflow-y","hidden");
            $("html").css("overflow-x","hidden");
        });
        $(window).resize(function(){
                bredisGallery.glassResize();
                if(!document.fullscreenElement&&!document.mozFullScreenElement&&!document.webkitFullscreenElement){                   $("#galeryMain img").css("height","auto");
                    $("#fullScreenB").css("background-image","url(bredisGallery/img/fullscreen2.svg)");
                }  
        });
    }
}


