$(document).on("pageshow","#perfilzafiro",function(event, ui){

    localStorage.setItem("tipoUsuario","5");
    localStorage.setItem("FotoCambiar","ZAFIRO");
    $("#zafiroaprospect").click(function(){
        $.mobile.changePage("prospect.html",{ transition : "fade" });
    });
    $("#diamond").click(function(){
        $.mobile.changePage("prospect.html",{ transition : "fade" });
    });
    $("#liPortada").click(function(){
        $.mobile.changePage("portadazafiro.html",{ transition : "fade" });
    });
    $("#liCatalogo").click(function(){
        $.mobile.changePage("catalogozafiro.html",{ transition : "fade" });
    });
    
    $("#rubi").click(function(){
        $.mobile.changePage("perfilrubi.html",{ transition : "fade" });
    });
    $("#btPerfil").click(function(){
        localStorage.setItem("FotoCambiar","ZAFIRO");
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });
    $("#btBio").click(function(){
        $.mobile.changePage("bio.html",{ transition : "fade" });
    });
    $("#liCerrar").click(function(){
        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });

    var sIdentificador = localStorage.getItem("idUsuario");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'PerfilZafiro'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.wait please').fadeIn();
        },success:function(respuesta){
            var imagen = new Image();
            imagen.src = respuesta;
            imagen.height=250;
            localStorage.setItem("FotoPerfil",imagen.src);
            $('#espacioFoto').html(imagen);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

   
});

