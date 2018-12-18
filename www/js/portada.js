$(document).on("pageshow","#portada",function(event, ui){

    $("#liCerrar").click(function(){
        $.mobile.changePage("menuprospect.html",{ transition : "fade" });
    });
    
    var sIdentificador = localStorage.getItem("idUsuario");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Portada'
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
                var aPerfil = JSON.parse(respuesta);
                var imagen = new Image();
                $.each( aPerfil, function( i, value ) {
                    imagen.src = value["vcBackground"];
                    imagen.width=250;
                    localStorage.setItem("Portada",imagen.src);
                });
                $('#foto').html(imagen);
                $("#hdHeadPanel").text("User Portrait");
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    

    $("#grabarportada").click(function(){

        localStorage.setItem("FotoCambiar","PORTADA");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
        
    });

});

