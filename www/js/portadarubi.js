$(document).on("pageshow","#portadarubi",function(event, ui){

    $("#liCerrar").click(function(){
        $.mobile.changePage("perfilrubi.html",{ transition : "fade" });
    });
    
    var sIdentificador = localStorage.getItem("idUsuario");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'PortadaRubi'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $.mobile.loading( "show", {
                  text: "wait please",
                  textVisible: true,
                  theme: "a",
                  html: ""
                });
        },success:function(respuesta){
            $.mobile.loading( "hide" );
            if(respuesta=="Undefined Portrait"){
                $("#hdHeadPanel").text(respuesta);
            }else{
                var imagen = new Image();
                imagen.src = respuesta;
                imagen.width=250;
                localStorage.setItem("Portada",imagen.src);
                $('#foto').html(imagen);
                $("#hdHeadPanel").text("Rubi Portrait");
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    

    $("#grabarportada").click(function(){

        localStorage.setItem("FotoCambiar","PORTADARUBI");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
        
    });

});

