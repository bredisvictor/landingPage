$(function(){
    
    $("#cloesNote").click(function(){
        $("#noteMainCover").fadeOut(300);
        
        
    });
    
});

function mediumPriority(x){
       $("#newCustumers table tr").eq($(x).parent().parent().index()).
       find(".lowButton").css("background","#b2b2b2");
        $("#newCustumers table tr").eq($(x).parent().parent().index()).
        find(".mediumButton").css("background","linear-gradient(to top right , #eb1116, rgba(235, 17, 22, 0.46))");
    }
    function lowPriority(x){
       $("#newCustumers table tr").eq($(x).parent().parent().index()).
       find(".mediumButton").css("background","#b2b2b2");
        $("#newCustumers table tr").eq($(x).parent().parent().index()).
        find(".lowButton").css("background","linear-gradient(to top right , #93b74f, rgba(166, 235, 32, 0.57))");
    }

    function openNote(){
        $("#noteMainCover").fadeIn(300);
        $("#textAreaC").attr("disabled","disabled");
    }