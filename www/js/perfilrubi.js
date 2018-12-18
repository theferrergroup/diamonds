$(document).on("pageshow","#perfilrubi",function(event, ui){

    localStorage.setItem("tipoUsuario","4");
    localStorage.setItem("FotoCambiar","RUBI");
    $("#rubiaprospect").click(function(){
        $.mobile.changePage("prospect.html",{ transition : "fade" });
    });
    $("#diamond").click(function(){
        $.mobile.changePage("prospect.html",{ transition : "fade" });
    });
    $("#liPortada").click(function(){
        $.mobile.changePage("portadarubi.html",{ transition : "fade" });
    });
    $("#liCatalogo").click(function(){
        $.mobile.changePage("catalogorubi.html",{ transition : "fade" });
    });
    $("#zafiro").click(function(){
        $.mobile.changePage("perfilzafiro.html",{ transition : "fade" });
    });
    $("#btPerfil").click(function(){
        localStorage.setItem("FotoCambiar","RUBI");
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
            sCodigoWebPhp:sIdentificador,Mandato:'PerfilRubi'
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

