$(document).on("pageshow","#index",function(event,ui){
    $('#irinicio').click(function(){
        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });


});